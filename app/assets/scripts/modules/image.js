import conf from './config';

export default function image(id, width=175, height=175) {
  
  const html = `
    <div>
      <img src="${conf.path1}${width}/${height}?image=${id}">
    </div>
  `;

  return html;
}