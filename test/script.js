gsap.registerPlugin(Observer, ScrollTrigger);

const cards = gsap.utils.toArray(".card");
let currentIndex = 0;
let animating = false;

// ---- arrow 요소 및 스케일 계산 ----
const arrow = document.querySelector(".arrow");
const arrowNext = document.querySelector(".arrow-next");
const arrowOriginalHeight = arrow.offsetHeight;
const arrowTargetScale = window.innerHeight / arrowOriginalHeight;

// 초기 카드 위치
gsap.set(cards, { xPercent: (i) => 100 * i });

// 카드 전환 함수
function gotoCard(index) {
  if (index < 0 || index >= cards.length || animating) return;

  animating = true;

  gsap.to(cards, {
    xPercent: (i) => 100 * (i - index),
    duration: 1.3,
    // ease: "power2.out",

    // ---- arrow 확대 & 위치 변경 ----
    onUpdate: function () {
      if (currentIndex === 0 && index === 1) {
        const progress = this.progress();
        const fastProgress = Math.min(progress * 2, 1);
        const scaleValue = gsap.utils.interpolate(1, arrowTargetScale, fastProgress);

        arrow.classList.add("active"); 
        gsap.set(arrow, { scale: scaleValue, transformOrigin: "center center" });

        gsap.set(arrowNext, { opacity: progress });
      }

      // 두 번째(1) → 첫 번째(0)로 이동
      if (currentIndex === 1 && index === 0) {
        const progress = 1 - this.progress();
        const fastProgress = Math.min(progress * 2, 1);
        const scaleValue = gsap.utils.interpolate(1, arrowTargetScale, fastProgress);

        // progress가 끝까지 가면 active 클래스 제거 → 원래 위치
        if (progress === 1) arrow.classList.remove("active");

        gsap.set(arrow, { scale: scaleValue, transformOrigin: "center center" });
        gsap.set(arrowNext, { opacity: 1 - progress });
      }
    },

    onComplete: () => {
      animating = false;
      currentIndex = index;

      // 첫 페이지 도착 시 active 제거 + 원래 상태 복귀
      if (currentIndex === 0) {
        arrow.classList.remove("active");
        // transform 속성 모두 제거해서 CSS 기본 transform 적용
        gsap.set(arrow, { clearProps: "transform" });
      }
    }

  });
}

// 첫 카드 고정
ScrollTrigger.create({
  trigger: ".pin-wrapper",
  start: "top top",
  end: "+=" + (cards.length - 1) * window.innerHeight,
  pin: true,
  scrub: false
});

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

gotoCard(0);
