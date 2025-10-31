
let progress = 0;
const loaderBar = document.querySelector('.loader-bar');
const loaderScreen = document.getElementById('loaderScreen');
const loaderFill = document.getElementById('loaderFill');
const mainScreen = document.getElementById('mainScreen');




const interval = setInterval(() => {
  progress += 1;

  if (progress < 100) {
    loaderBar.style.width = progress + '%';
    loaderFill.textContent = progress + '%';
  } else {
    loaderBar.style.width = '100%';
    loaderFill.textContent = '100%';

    loaderScreen.style.transform = 'translateY(-100%)';
    mainScreen.style.transform = 'translateY(0)';

    clearInterval(interval);
  }
}, 20);



const btns = document.querySelectorAll('.button');

btns.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.classList.add('glow-animate');

    gsap.to(btn, {
      scale: 1.1,
      boxShadow: "0 0 25px rgba(0, 255, 255, 0.9)",
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  });

  btn.addEventListener('mouseleave', () => {
    btn.classList.remove('glow-animate');

    gsap.killTweensOf(btn);
    gsap.to(btn, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
      duration: 0.3
    });
  });
});




