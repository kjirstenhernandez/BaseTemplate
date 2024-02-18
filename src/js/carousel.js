const element = document.querySelector(".hero");
const apiUrl =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_vYBougwwbfP7f8jXBY8yn9ZffrNnOREGScRBlKkw9QTQOX9ZtYv6C1dNceQuRbAZ";
const init = await fetch(apiUrl);
const data = await init.json();

let div = buildGrid(data);

//https://www.w3schools.com/howto/howto_js_slideshow.asp
document.querySelector("#carousel").innerHTML = div;

function buildGrid(data) {
  let grid = `
  <div class="slideshow-container">
        <div class="mySlides fade">
            <div class="numbertext">1 / 3</div>
            <img src="${data[0].url}">
            <div class="text">Caption Text</div>
        </div>

        <div class="mySlides fade">
            <div class="numbertext">2 / 3</div>
            <img src="${data[1].url}">
            <div class="text">Caption Two</div>
        </div>

        <div class="mySlides fade">
            <div class="numbertext">3 / 3</div>
            <img src="${data[2].url}">
            <div class="text">Caption Three</div>
        </div>
    
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>
    
    </div>
    <br>
    
    <div style="text-align:center">
        <span class="dot" onclick="currentSlide(1)"></span>
        <span class="dot" onclick="currentSlide(2)"></span>
        <span class="dot" onclick="currentSlide(3)"></span>
    </div>`;

  //   data.forEach((image) => {
  //     grid = '<div class="myslides fade">';
  //     grid += `<img src=${image.url} style="width:100%">`;
  //     if (image.breed) {
  //       grid += `<div class="text">${image.breed[0].name}</div>`;
  //     }
  //     grid += "</div>";
  //   };
  return grid;
}

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
