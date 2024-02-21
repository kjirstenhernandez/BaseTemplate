const apiUrl =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_vYBougwwbfP7f8jXBY8yn9ZffrNnOREGScRBlKkw9QTQOX9ZtYv6C1dNceQuRbAZ";
const init = await fetch(apiUrl);
const data = await init.json();

// parentElement to place the carousel
let div = buildGrid(data);

//https://www.w3schools.com/howto/howto_js_slideshow.asp
document.querySelector("#carousel").innerHTML = div;

// Template to render the slideshow with using the random images from the API
function buildGrid(data) {
  let grid = "";
  data.forEach((image) => {
    grid += `<div class="image fade"><img src="${image.url}" alt="Random Cat Image"></div>`;
  });
  return grid;
}

let index = 0;
displayImages();

// Slideshow Javascript
function displayImages() {
  let i;
  const images = document.getElementsByClassName("image");
  for (i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  index++;
  if (index > images.length) {
    index = 1;
  }
  images[index - 1].style.display = "block";
  setTimeout(displayImages, 6000);
}
