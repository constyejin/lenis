import { renderFromJson } from './render.js';

function partnerTemplate(item) {
  return `
    <li class="partner_item">
      <img src="${item.img}" alt="${item.alt}" />
    </li>
  `;
}


document.addEventListener('DOMContentLoaded', () => {
  renderFromJson('./data/partnerProviders.json', '.partner_list', partnerTemplate);
});
