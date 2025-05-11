import { gsap } from "gsap";

// 获取DOM元素
const menuBtn = document.querySelector(".menu_icon");
const closeBtn = document.querySelector(".close_menu");
const menu = document.querySelector(".menu");
const navItems = document.querySelectorAll(".nav_item");
const background = document.querySelector(".background");

// 初始化菜单状态
gsap.set(menu, { 
  y: "-100%", 
  opacity: 0,
  visibility: "hidden" 
});

// 创建主时间线
const menuTimeline = gsap.timeline({
  paused: true,
  defaults: { ease: "power3.inOut" },
  onReverseComplete: () => {
    menu.style.visibility = "hidden";
    gsap.set(menu, { y: "-100%" }); // 重置位置
  }
});

// 动画序列
menuTimeline
  .to(menu, {
    y: "0%",
    opacity: 1,
    visibility: "visible",
    duration: 0.8
  })
  .fromTo(navItems,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.2)"
    },
    "-=0.4" // 与上一步动画重叠
  )
  .from(background, {
    y: 50,
    opacity: 0,
    duration: 0.8
  }, "-=0.8");

// 菜单切换函数
function toggleMenu(e) {
  if (e) e.preventDefault();
  
  if (menuTimeline.reversed()) {
    menu.style.visibility = "visible";
    menuTimeline.play();
  } else {
    menuTimeline.reverse();
  }
}

// 添加事件监听
[menuBtn, closeBtn].forEach(btn => {
  if (!btn) return;
  
  btn.addEventListener("click", toggleMenu);
  btn.addEventListener("touchstart", toggleMenu, { passive: false });
});

// 响应式处理
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768 && menuTimeline.progress() !== 0) {
    menuTimeline.progress(0).pause();
    menu.style.visibility = "hidden";
    gsap.set(menu, { y: "-100%" });
  }
});