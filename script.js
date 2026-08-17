// 1. Ocultar pantalla de carga
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
        }, 800);
    }, 1000);
});

// 2. Generar corazones flotantes
const heartsContainer = document.getElementById('hearts-container');
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 5 + 's';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}
setInterval(createHeart, 500);

// 3. Reproductor de música
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// 4. Animación Reveal al hacer Scroll
const reveals = document.querySelectorAll('.reveal');
function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    reveals.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            card.classList.add('active');
        }
    });
}
window.addEventListener('scroll', checkScroll);
checkScroll(); // Ejecutar al inicio

// 5. Modal para ver fotos en grande
const modal = document.getElementById('modal');
const modalImg = document.getElementById('img-modal');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.tarjeta').forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = tarjeta.querySelector('img').src;
        captionText.innerHTML = tarjeta.querySelector('.pie-foto p').innerHTML;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});