import config from "./config";
import Imagelist from "./imageList";
import imageService from "./image-service";
import img from "./image";

const imgContainer = document.querySelector(".image-container");

function getData() {
  return fetch(config.getData).then(r => r.json());
}

function getImageByAuthor(e) {
  const searchText = e.target.value;
  let list = new Imagelist();

  imageService
    .getData()
    .then(data => {
      let arr = data;
      let newarr;
      newarr = arr.filter(img => {
        return img.author === searchText;
      });
      return newarr;
    })
    .then(data => {
      console.log("app data = " + data);
      list.renderImage(data);
      list.drawToDom(imgContainer);
    });
}

function getBigImage(e) {
  if (e.target.className !== "bigImage") {
    let current = e.srcElement.src;
    let newEl;
    let oldval = "/225/225",
        newval = "/1200/800";
    newEl = current.replace(oldval, newval);

    let bigImage = document.createElement("div");
    bigImage.classList.add("bigImage");
    bigImage.style.backgroundImage = `url(${newEl})`;
    imgContainer.appendChild(bigImage);
    console.log(bigImage);
  } else {
    e.target.classList.remove("bigImage");
  }
}

export default {
  getData,
  getImageByAuthor,
  getBigImage
};
