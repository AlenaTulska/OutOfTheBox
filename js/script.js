import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.js';

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


const container = document.getElementById('star-bg');

// === Сцена ===
const scene = new THREE.Scene();

// === Камера ===
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// === Рендерер ===
const renderer = new THREE.WebGLRenderer({ alpha: true }); // 🔹 прозорий фон
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// === Зірки ===
const starGeometry = new THREE.BufferGeometry();
const starCount = 1500;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 100;
}

starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
  transparent: true,
  opacity: 0.8,
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// === Анімація ===
function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0008;
  renderer.render(scene, camera);
}

animate();

// === Адаптація під зміну розміру ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
