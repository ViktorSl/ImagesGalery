import img from "./image";

export default class ImageList {
  drawToDom(selector) {
    this.clearList(selector);
    selector.appendChild(this.fragment);
  }
  renderImage(arr) {
    this.fragment = document.createDocumentFragment();
    if (arr.length !== 0) {
      arr.forEach(data => {
        let div = document.createElement("div");
        div.classList.add("image");
        div.innerHTML = img(data.id);
        this.fragment.appendChild(div);
      });
    }
  }

  clearList(selector) {
    selector.innerHTML = "";
  }
}
