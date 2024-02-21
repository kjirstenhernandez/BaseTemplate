const apiURL = "https://api.thecatapi.com/v1/breeds";
const imageBase = "/json/images.json";
export default class Datasource {
  constructor() {}

  // Retrieve the information for all the breeds
  async getData() {
    const response = await fetch(apiURL);
    const data = await convertToJson(response);
    console.log(data);
    return data;
  }

  // Pull the full list of Images
  async getImageList() {
    const response = await fetch(imageBase);
    const data = await convertToJson(response);
    return data;
  }

  // Retrieve a specific image with a cat ID
  async findImagebyId(id) {
    const response = await fetch(imageBase);
    const data = await convertToJson(response);
    const url = data[id][0].url;
    return url;
  }

  // Find a cat by the unique Cat ID
  async findCatbyId(id) {
    const response = await fetch(apiURL);
    const data = await convertToJson(response);
    const cat = data.filter((item) => item.id == id);
    return cat[0];
  }

  // Find a cat by their official name
  async findCatByName(name) {
    const response = await fetch(apiURL);
    const data = await convertToJson(response);
    const checkName = name;
    let winner = [];
    data.forEach((item) => {
      if (item.name == checkName) {
        winner.push(item);
      }
    });
    return winner;
  }
}

// Convert information to a JSON
export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
