import config from "./config";
import Imagelist from "./ImageList";
import img from "./image";
import Pagination from './Pagination';

let imgContainer = document.querySelector(".image-container");
let wrapper = document.querySelector(".wrapper");
let pagContainer = document.querySelector('.pagination');
let pagination = new Pagination();
let list = new Imagelist();

let dataLength;

function getData() {
  return fetch(config.getData).then(r => r.json());
}

function getAllImages() {
  getData()
  .then(data => {
    dataLength = data.length;
    createPagBlock();
    let temp = data;
    let onePage = temp.slice(40, 60);

    pagContainer.addEventListener('click', function(e) {
      let curElValue = e.target.innerHTML;
      console.log(curElValue);
      let end = curElValue * 20;
      let start = end - 20;
      onePage = temp.slice(start, end);
      console.log(onePage);
      list.renderImage(onePage);
      list.drawToDom(imgContainer);
    }); 
    return onePage;
  })
  .then(data => {
    list.renderImage(data);
    list.drawToDom(imgContainer);
  });
}

function createPagBlock() {
  let numOfIteration = Math.floor(dataLength / 20 + 2);
  for(let i = 1; i < numOfIteration; i++) {
    pagContainer.appendChild(createPagElement(i));
  }
}

function createPagElement(num) {
  let pagBlock = document.createElement('div');
  pagBlock.classList.add("pagElement");
  pagBlock.innerHTML = num;
  return pagBlock;
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
