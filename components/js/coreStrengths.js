import { renderFromJson } from './render.js';

function accordionItemTemplate(el) {
  return `
    <div class="accordion_item ${el.active ? 'is-active' : ''}">
      <div>
        <div class="lg-only number">${el.number}</div>
        <div class="info">
          <p class="subtitle">${el.subtitle}</p>
          <p class="desc">${el.desc}</p>
        </div>
        <div class="thumb">
          <img src="${el.img}" alt="${el.subtitle}">
        </div>
      </div>
    </div>
  `;
}

function bindAccordionEvents() {
  const accordionItems = document.querySelectorAll('.accordion_item');
  accordionItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      accordionItems.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
    });

    item.addEventListener('touchstart', () => {
      accordionItems.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
    }, { passive: true });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // 렌더링 완료 후 바인딩
  renderFromJson('./data/coreStrengths.json', '.accordion_list', accordionItemTemplate)
    .then(() => {
      bindAccordionEvents();
    });
});
