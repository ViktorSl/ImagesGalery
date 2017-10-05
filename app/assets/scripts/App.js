import Imagelist from "./modules/ImageList";
import img from "./modules/image";
import imageService from "./modules/image-service";

const author = document.querySelector(".sidebar__content__author");
const imgContainer = document.querySelector(".image-container");
let rad = document.getElementsByName("size");

window.addEventListener('load', function() {
  imageService.getAllImages();
  imageService.getImageBySize();
})


author.addEventListener("input", imageService.getImageByAuthor);
imgContainer.addEventListener("click",imageService.getBigImage);

