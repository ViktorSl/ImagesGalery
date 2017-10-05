
import imageService from './image-service';

export default function getAuthors() {
  imageService.getData()
  .then(data => {
    let authors = data.map(data => {
      return data.author;
    })
    
    function unique(arr) {
      let obj = {};
      for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        obj[str] = true; 
      }
      return Object.keys(obj);
    }
    let authors1 = unique(authors);
    return authors1;
  })
  .then(data => {
    console.log(data);
  })
}