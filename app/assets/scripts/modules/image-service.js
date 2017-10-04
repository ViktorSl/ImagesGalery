import config from "./config";
import Imagelist from "./ImageList";
import img from "./image";
import Pagination from './Pagination'

let pagContainer = document.querySelector('.pagination');
let imgContainer = document.querySelector(".image-container");
let wrapper = document.querySelector(".wrapper");
let pagination = new Pagination();
let list = new Imagelist();

function getData() {
  return fetch(config.getData).then(r => r.json());
}

function getAllImages() {
  getData()
  .then(data => {
    console.log("data.length = "+data.length);
    let dvad = data.slice(0,20);
    return dvad;
  })
  .then(data => {
    list.renderImage(data);
    list.drawToDom(imgContainer);
  });
}

function getImageByAuthor(e) {
  let searchText = e.target.value;

  getData()
    .then(data => {
      let arr = data;
      let newarr;
      newarr = arr.filter(img => {
        return img.author === searchText;
      });
      return newarr;
    })
    .then(data => {
      list.renderImage(data);
      list.drawToDom(imgContainer);
    });
}

function getBigImage(e) {
  if (e.target.classList[0] !== "bigImage" &&
      e.target.classList[1] !== "hidden") {
    let current = e.srcElement.src;
    let newEl;
    let oldval = "/225/225",
      newval = "/1200/800";
    newEl = current.replace(oldval, newval);

    let bigImage = document.createElement("div");
    bigImage.classList.add("bigImage");
    bigImage.style.backgroundImage = `url(${newEl})`;
    wrapper.classList.add("hidden");
    imgContainer.appendChild(bigImage);
  }
  else {
    e.target.classList.remove("bigImage");
    wrapper.classList.remove("hidden");
  }
}

export default {
  getData,
  getImageByAuthor,
  getBigImage,
  getAllImages
};
