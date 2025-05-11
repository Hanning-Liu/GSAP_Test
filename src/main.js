import { gsap } from "gsap";

// 调试代码：检测全局触摸事件
document.addEventListener('touchstart', (e) => {
  console.log('全局触摸触发于:', e.target);
}, { passive: true });

// 更健壮的元素选择（避免 null 错误）
const menuBtn = document.querySelector(".menu_icon");
const closeBtn = document.querySelector(".close_menu");

// 检查元素是否存在（调试用）
if (!menuBtn || !closeBtn) {
  console.error("按钮元素未找到！请检查类名是否正确。");
}

// GSAP 动画时间线
let t1 = gsap.timeline({ 
  paused: true,
  onReverseComplete: () => {
    // 动画反向完成后重置菜单状态（可选）
    gsap.set(".menu", { opacity: 0, top: "-100%" });
  }
});

t1.to(".menu", { 
  opacity: 1, 
  duration: 0.8, 
  top: 0,
  ease: "power3.out"
})
.to(".nav", { 
  opacity: 1, 
  duration: 0.6, 
  stagger: 0.15, 
  marginTop: 0 
}, "-=0.3"); // 与前一动画重叠

// 统一事件处理函数
function toggleMenu(e) {
  if (e) e.preventDefault(); // 阻止默认行为（如链接跳转）
  if (t1.reversed() || t1.paused()) {
    t1.timeScale(1).play();
  } else {
    t1.timeScale(1.5).reverse();
  }
}

// 添加事件监听（支持触摸和点击）
const events = ["click", "touchstart"];
events.forEach(event => {
  menuBtn?.addEventListener(event, toggleMenu, { passive: false });
  closeBtn?.addEventListener(event, toggleMenu, { passive: false });
});
menuBtn.addEventListener('touchstart', () => {
  alert('触摸已触发！'); // 真机会显示弹窗
});
// 可选：禁用滚动当菜单打开
t1.eventCallback("onStart", () => {
  document.body.style.overflow = "hidden";
});
t1.eventCallback("onReverseComplete", () => {
  document.body.style.overflow = "";
});