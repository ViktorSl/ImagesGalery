import config from "./config";
import Imagelist from "./ImageList";
import img from "./image";

let imgContainer = document.querySelector(".image-container");
let wrapper = document.querySelector(".wrapper");
let pagContainer = document.querySelector(".pagination");
let pag = document.querySelector(".pagination");
let list = new Imagelist();

let dataLength;

function getData() {
  return fetch(config.getData).then(r => r.json());
}

function getAllImages() {
  getData()
    .then(data => {
      createPagBlock(data);
      let temp = data;
      let startPage = temp.slice(0, 20);
      
      list.renderImage(startPage);
      list.drawToDom(imgContainer);
      createImagesList(data);
    })
}

function createPagBlock(data) {
  if (pagContainer.innerHTML !== "") {
    pagContainer.innerHTML = "";
  }
  let numOfIteration = Math.floor(data.length / 20 + 2);
  for (let i = 1; i < numOfIteration; i++) {
    pagContainer.appendChild(createPagElement(i));
  }
}

function createPagElement(num) {
  let pagBlock = document.createElement("div");
  pagBlock.classList.add("pagElement");
  pagBlock.innerHTML = num;
  return pagBlock;
}

function getImageByAuthor(e) {
  let searchText = e.target.value;
  getData()
    .then(data => {
      let arr;
      arr = data.filter(img => {
        return img.author === searchText;
      });
      return arr;
    })
    .then(data => {
      createImagesList(data);
      list.renderImage(data);
      list.drawToDom(imgContainer);
    });
}

function createImagesList(data) {
  createPagBlock(data);
  let temp = data;
  let curPage = temp.slice(0, 20);

  pagContainer.addEventListener("click", function (e) {
    let curElValue = e.target.innerHTML;
    let end = curElValue * 20;
    let start = end - 20;
    curPage = temp.slice(start, end);
    list.renderImage(curPage);
    list.drawToDom(imgContainer);
  });
  return curPage;
}

function getBigImage(e) {
  let curTarget = e.target;

  if (
    curTarget.classList[0] !== "bigImage" &&
    curTarget.classList[1] !== "hidden" &&
    pag.classList[0] !== "hidePag" 
  ) {
    let currentSrc = e.srcElement.src;
    let newEl;
    let oldval = "/175/175",
        newval = "/1200/800";
    newEl = currentSrc.replace(oldval, newval);

    pag.classList.add("hidePag");

    let bigImage = document.createElement("div");
    bigImage.classList.add("bigImage");
    bigImage.style.backgroundImage = `url(${newEl})`;
    wrapper.classList.add("hidden");
    imgContainer.appendChild(bigImage);

  } else {
    curTarget.classList.remove("bigImage");
    wrapper.classList.remove("hidden");
    pag.classList.remove("hidePag");
  }
}

function getImageBySize() {
  let rad = document.getElementsByName("size");
  for (var i = 0; i < rad.length; i++) {
    rad[i].onchange = function () {
      sortImg(this.value);

    }
  }

function sortImg(value) {
    getData()
      .then(data => {
        let arr = data.filter(img => {
          if (value == 1500) {
            return img.width > 1500;
          }
          if (value == 800) {
            return img.width > 800 && img.width < 1500;
          }
          if (value == 799) {
            return img.width < 800;
          }
        });
        return arr;
      })
      .then(data => {
        createPagBlock(data);
        let temp = data;
        let startPage = temp.slice(0, 20);
        list.renderImage(startPage);
        list.drawToDom(imgContainer);

       createImagesList(data);
      })
  }
}

export default {
  getData,
  getImageByAuthor,
  getBigImage,
  getAllImages,
  getImageBySize
};