import Imagelist from "./modules/ImageList";
import img from "./modules/image";
import imageService from "./modules/image-service";

const author = document.querySelector(".sidebar__content__author");
const imgContainer = document.querySelector(".image-container");

window.addEventListener('load', function() {
  imageService.getAllImages();
})

author.addEventListener("input", imageService.getImageByAuthor);
imgContainer.addEventListener("click",imageService.getBigImage);

