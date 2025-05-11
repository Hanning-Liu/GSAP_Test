import { gsap } from "gsap";

const menuBtn = document.querySelector(".menu_icon");
const closeBtn = document.querySelector(".close_menu");


let t1 = gsap.timeline({paused: true});
t1.to(".menu", {opacity: 1, duration: 1, top: 0});
t1.to(".nav", {opacity: 1, duration: 1, stagger: 0.2, marginTop: 0}, ">-0.5");

menuBtn.addEventListener("click", handleMenuClick);
menuBtn.addEventListener("touchstart", handleMenuClick, {passive: true});

closeBtn.addEventListener("click", handleCloseClick);
closeBtn.addEventListener("touchstart", handleCloseClick, {passive: true});

function handleMenuClick(e) {
  e.preventDefault();
  t1.timeScale(1);
  t1.play();
}

function handleCloseClick(e) {
  e.preventDefault();
  t1.timeScale(2);
  t1.reverse();
}