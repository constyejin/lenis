gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ markers: false });

ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  end: "bottom bottom",
  snap: 1 / 2 
});


const container = document.querySelector(".horizontal-container");
const panels = gsap.utils.toArray(".panel");
const totalPanels = panels.length;

gsap.to(container, {
  xPercent: -100 * (totalPanels - 1), 
  ease: "none",
  scrollTrigger: {
    trigger: ".sec2",
    start: "top top",
    end: () => "+=" + container.offsetWidth, 
    pin: true,
    scrub: 1,
    snap: 1 / (totalPanels - 1), 
  }
});