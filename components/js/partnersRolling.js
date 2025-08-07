import { renderFromJson } from './render.js';

function partnerTemplate(item) {
  return `
    <li class="partner_item">
      <img src="${item.img}" alt="${item.alt}" />
    </li>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderFromJson('./data/partnerProviders.json', '.partner_list', partnerTemplate)
    .then(() => {
      startPartnerSlider();
    })
    .catch(err => {
      console.error('파트너 렌더링 실패:', err);
    });
});

function startPartnerSlider() {
  const list = document.querySelector('.partner_list');
  const items = list.querySelectorAll('.partner_item');
  const gap = 70;
  const speed = 1;

  const itemWidth = items[0].offsetWidth;
  const totalItemCount = items.length;
  const totalSetWidth = (itemWidth + gap) * totalItemCount;

  const clones = Array.from(items).map(item => item.cloneNode(true));
  clones.forEach(clone => list.appendChild(clone));

  let position = 0;

  list.style.transition = 'none';

  function animate() {
    position -= speed;
    list.style.transform = `translateX(${position}px)`;

    if (Math.abs(position) >= totalSetWidth) {
      list.style.transition = 'none';
      position = 0;
      list.style.transform = `translateX(0px)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          list.style.transition = 'transform 0.05s linear';
        });
      });
    }

    requestAnimationFrame(animate);
  }

  list.style.transition = 'transform 0.05s linear';
  animate();
}

