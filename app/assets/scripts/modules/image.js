import conf from './config';

export default function image(id, width=225, height=225) {
  
  const html = `
    <div>
      <img src="${conf.path1}${width}/${height}?image=${id}">
    </div>
  `;

  return html;
}