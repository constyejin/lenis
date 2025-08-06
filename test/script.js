document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(Observer, ScrollTrigger, ScrollToPlugin);

  const cards = gsap.utils.toArray(".card");
  let currentIndex = 0;
  let animating = false;
  let inPinWrapper = false;   // pin-wrapper 내부 가로 슬라이드 모드 여부

  // arrow 관련 요소
  const arrow = document.querySelector(".arrow");
  const arrowNext = document.querySelector(".arrow-next");
  const arrowOriginalHeight = arrow.offsetHeight;
  const arrowTargetScale = window.innerHeight / arrowOriginalHeight;

  // 초기 카드 위치 (가로로 배열)
  gsap.set(cards, { xPercent: (i) => 100 * i });

  // 카드 전환
  function gotoCard(index) {
    if (index < 0 || index >= cards.length || animating) return;
    animating = true;

    gsap.to(cards, {
      xPercent: (i) => 100 * (i - index),
      duration: 1.3,
      onUpdate: function () {
        // 첫 번째 → 두 번째 이동 중 arrow 처리
        if (currentIndex === 0 && index === 1) {
          const progress = this.progress();
          const fastProgress = Math.min(progress * 2, 1);
          const scaleValue = gsap.utils.interpolate(1, arrowTargetScale, fastProgress);
          arrow.classList.add("active");
          gsap.set(arrow, { scale: scaleValue, transformOrigin: "center center" });
          gsap.set(arrowNext, { opacity: progress });
        }
        // 두 번째 → 첫 번째 이동 중 arrow 복귀
        if (currentIndex === 1 && index === 0) {
          const progress = 1 - this.progress();
          const fastProgress = Math.min(progress * 2, 1);
          const scaleValue = gsap.utils.interpolate(1, arrowTargetScale, fastProgress);
          if (progress === 1) arrow.classList.remove("active");
          gsap.set(arrow, { scale: scaleValue, transformOrigin: "center center" });
          gsap.set(arrowNext, { opacity: 1 - progress });
        }
      },
      onComplete: () => {
        animating = false;
        currentIndex = index;
        if (currentIndex === 0) {
          arrow.classList.remove("active");
          gsap.set(arrow, { clearProps: "transform" });
        }
      }
    });
  }

  // pin-wrapper 고정 (가로 슬라이드)
  ScrollTrigger.create({
    trigger: ".pin-wrapper",
    start: "top top",
    end: "+=" + (cards.length - 1) * window.innerHeight,
    pin: true,
    scrub: false,
    onEnter: () => { inPinWrapper = true; },
    onLeaveBack: () => { inPinWrapper = false; }
  });

  // 스크롤 감지
  Observer.create({
    type: "wheel,touch",
    preventDefault: true,
    onDown: () => {
      if (!inPinWrapper) {
        // main → pin-wrapper 진입
        if (window.scrollY < window.innerHeight * 0.5) {
          gsap.to(window, {
            scrollTo: { y: ".pin-wrapper", autoKill: false },
            duration: 1,
            onComplete: () => {
              inPinWrapper = true;
              gotoCard(0);
            }
          });
        }
      } else {
        // pin-wrapper 내부 이동
        if (currentIndex < cards.length - 1) {
          gotoCard(currentIndex + 1);
        } else {
          // 마지막 카드 → together 섹션
          gsap.to(window, {
            scrollTo: { y: ".together", autoKill: false },
            duration: 1,
            onComplete: () => (inPinWrapper = false)
          });
        }
      }
    },
    onUp: () => {
      if (!inPinWrapper) {
        // together → pin-wrapper 복귀
        if (window.scrollY >= document.querySelector(".together").offsetTop - 10) {
          inPinWrapper = true;
          gotoCard(cards.length - 1); // 마지막 카드부터 시작
          gsap.to(window, {
            scrollTo: { y: ".pin-wrapper", autoKill: false },
            duration: 1
          });
        }
      } else {
        // pin-wrapper 내부 뒤로 이동
        if (currentIndex > 0) {
          gotoCard(currentIndex - 1);
        } else {
          // 첫 카드 → main 섹션
          gsap.to(window, {
            scrollTo: { y: ".main", autoKill: false },
            duration: 1,
            onComplete: () => (inPinWrapper = false)
          });
        }
      }
    }
  });

  gotoCard(0);
});
