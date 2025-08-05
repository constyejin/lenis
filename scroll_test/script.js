gsap.registerPlugin(Observer, ScrollTrigger);

const sections = gsap.utils.toArray("section:not(.row_slide)");
const rowSlides = gsap.utils.toArray(".row_slide .slide");

console.log(sections)

let currentIndex = 0;     // 현재 세로 섹션 인덱스
let animating = false;    // 애니메이션 중 여부
let rowIndex = 0;         // row_slide 내부 인덱스
let inRowList = false;    // row_slide 활성 상태

// 초기 설정
gsap.set(sections, { autoAlpha: 0 });
gsap.set(sections[0], { autoAlpha: 1, zIndex: 1 });

// --- 세로 섹션 이동 ---
function gotoSection(index) {
  if (animating || index === currentIndex || index < 0 || index >= sections.length) return;
  animating = true;

  gsap.timeline({
    defaults: { duration: 1, ease: "power1.inOut" },
    onComplete: () => (animating = false)
  })
    .to(sections[currentIndex], { autoAlpha: 0, zIndex: 0 })
    .fromTo(sections[index], { autoAlpha: 0, zIndex: 1 }, { autoAlpha: 1 }, 0);

  currentIndex = index;
}

// --- row_slide 내부 이동 ---
function gotoRowSlide(index) {
  if (animating || index < 0 || index >= rowSlides.length) return;
  animating = true;

  gsap.to(rowSlides, {
    xPercent: (i) => 100 * (i - index),
    duration: 1,
    // ease: "power2.inOut",
    onComplete: () => (animating = false),
  });

  rowIndex = index;
}

// --- 스크롤 이벤트 처리 ---
Observer.create({
  type: "wheel,touch",
  preventDefault: true,
  // ↓ 아래로 스크롤
  onDown: () => {
    if (inRowList) {
      if (rowIndex < rowSlides.length - 1) {
        gotoRowSlide(rowIndex + 1);
      } else {
        inRowList = false;
        gotoSection(currentIndex + 1);
      }
    } else {
      if (sections[currentIndex].classList.contains("first")) {
        inRowList = true;
        gotoSection(currentIndex + 1);
        gotoRowSlide(0);
      } else {
        gotoSection(currentIndex + 1);
      }
    }
  },
  // ↑ 위로 스크롤
  onUp: () => {
    if (inRowList) {
      if (rowIndex > 0) {
        gotoRowSlide(rowIndex - 1);
      } else {
        inRowList = false;
        gotoSection(currentIndex - 1);
      }
    } else {
      gotoSection(currentIndex - 1);
    }
  },
});
