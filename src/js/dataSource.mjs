const apiURL = "https://api.thecatapi.com/v1/breeds";
const imageBase = "../public/json/images.json";
export default class Datasource {
  constructor() {}

  async getData() {
    const response = await fetch(apiURL);
    const data = await convertToJson(response);
    console.log(data);
    return data;
  }

  async getImageList() {
    const response = await fetch(imageBase);
    const data = await convertToJson(response);
    return data;
  }

  async findImagebyId(id) {
    const response = await fetch(imageBase);
    const data = await convertToJson(response);
    const url = data[id][0].url;
    return url;
  }

  async findCatbyId(id) {
    const response = await fetch(apiURL);
    const data = await convertToJson(response);
    const cat = data.filter((item) => item.id == id);
    return cat[0];
  }

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

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
