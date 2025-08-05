gsap.registerPlugin(Observer);

const cards = gsap.utils.toArray(".card");
let currentIndex = 0;
let animating = false;

// 초기 카드 위치
gsap.set(cards, { xPercent: (i) => 100 * i });

function gotoCard(index) {
  if (index < 0 || index >= cards.length || animating) return;

  animating = true;
  gsap.to(cards, {
    xPercent: (i) => 100 * (i - index),
    duration: 1,
    onComplete: () => animating = false
  });

  currentIndex = index;
}

// 첫 카드 고정
ScrollTrigger.create({
  trigger: ".pin-wrapper",
  start: "top top",
  end: "+=" + (cards.length - 1) * window.innerHeight,
  pin: true,
  scrub: false
});


// 휠 이벤트 → 한 장씩
Observer.create({
  type: "wheel,touch",
  preventDefault: true,
  onDown: () => {
    if (currentIndex < cards.length - 1) gotoCard(currentIndex + 1);
  },
  onUp: () => { 
    if (currentIndex > 0) gotoCard(currentIndex - 1);
  }
});

// 첫 화면 설정
gotoCard(0);

