const cards = gsap.utils.toArray(".card");
ScrollTrigger.defaults({ markers: false });

gsap.set(cards, {
  x: () => (cards[0].clientWidth + window.innerWidth) / 2
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pin-wrapper",
    start: "top top",
    end: "+=" + cards.length * 70 + "%",
    scrub: true,
    pin: true,
    markers: false
  }
});
cards.forEach((c, i) => {
  tl.to(
    c,
    {
      x: 0
    },
    i ? "+=0.25" : ""
  );
  if (i > 0) {
    tl.to(
      cards[i],
      {
        scale: 0.9,
        opacity: 0,
        transformOrigin: "center center",
        ease: "none",
        duration: 0.25
      },
    );
  }
});
