// 1. CONFIGURACIÓN DE GOOGLE DRIVE API
const API_KEY = 'AIzaSyAsXNpv4zvr0Hd-gsT7lCJ_0vGG_htr28Q'; 
const FOLDER_ID = '1f6Cm5deWFhtenPF-JGeqH1EQZ6FL6Bwm';

const captions = [
    "La chica mas Rara del mundo 🤪✨", 
    "La chica que no se baña 🧼🙈", 
    "Te amo Bambia 📸💖",
    "La chica que ronca mucho 😴💤", 
    "La mujer mas linda del mundo 👑🌹", 
    "Te amo Rarita 🪐🤪",
    "La mujer mas interasante del mundo 🔍✨", 
    "La mujer mas Bonita 💕✨", 
    "Una persona Especial ☀️🪽",
    "La mujer mas feliz 😸🌈", 
    "La mejor mujer del mundo 🥇❤️", 
    "La mejor novia 👩‍❤️‍👨✨",
    "A la chica que odia el agua 🐈💦", 
    "Te amo Cristina 👩‍❤️‍💋‍👨💋", 
    "Por muchos años más 🥂🍾"
];
let todosLosArchivos = [];

// 2. OBTENER ARCHIVOS DE LA CARPETA DE DRIVE
async function obtenerArchivosDeCarpeta() {
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+trashed=false&fields=files(id,name,mimeType)&key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.files && data.files.length > 0) {
            todosLosArchivos = data.files.filter(f => 
                f.mimeType.includes('image/') || f.mimeType.includes('video/')
            );
            rotarYMostrarArchivos();
        } else {
            console.error('No se encontraron archivos.', data);
        }
    } catch (error) {
        console.error('Error al conectar con la API de Google Drive:', error);
    }
}

// 3. SELECCIONAR 9 ELEMENTOS ALEATORIOS
function rotarYMostrarArchivos() {
    if (todosLosArchivos.length === 0) return;

    const archivosMezclados = [...todosLosArchivos].sort(() => Math.random() - 0.5);
    const seleccion9 = archivosMezclados.slice(0, 9);
    
    cargarGaleriaDinamica(seleccion9);
}

// 4. GENERAR TARJETAS DINÁMICAS EN LA GALERÍA
function cargarGaleriaDinamica(archivos) {
    const galeriaContainer = document.querySelector('.galeria');
    if (!galeriaContainer) return;
    
    galeriaContainer.innerHTML = '';

    archivos.forEach((file, index) => {
        const captionText = captions[index % captions.length];
        const esVideo = file.mimeType.includes('video');

        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta', 'reveal', 'active');

        const imageUrl = `https://lh3.googleusercontent.com/d/${file.id}`;
        const embedVideoUrl = `https://drive.google.com/file/d/${file.id}/preview`;

        const mediaHTML = esVideo
            ? `<iframe src="${embedVideoUrl}" style="pointer-events:none;"></iframe>`
            : `<img src="${imageUrl}" alt="Foto ${index + 1}" loading="lazy">`;

        tarjeta.innerHTML = `
            <div class="tarjeta-imagen">
                ${mediaHTML}
                <div class="overlay"><i class="fa-solid fa-expand"></i></div>
            </div>
            <div class="pie-foto"><p>${captionText}</p></div>
        `;

        // Abrir en Modal al hacer clic o tocar pantalla
        tarjeta.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            const mediaContainer = document.getElementById('modal-media-container');
            const captionTextModal = document.getElementById('caption');
            
            if (modal && mediaContainer && captionTextModal) {
                mediaContainer.innerHTML = '';

                let elementoModal;
                if (esVideo) {
                    elementoModal = document.createElement('iframe');
                    elementoModal.src = embedVideoUrl;
                } else {
                    elementoModal = document.createElement('img');
                    elementoModal.src = imageUrl;
                }

                elementoModal.classList.add('modal-media-item');
                mediaContainer.appendChild(elementoModal);

                modal.style.display = 'flex';
                captionTextModal.innerHTML = captionText;
            }
        });

        galeriaContainer.appendChild(tarjeta);
    });

    checkScroll();
}

// 5. INICIALIZACIÓN Y TEMPORIZADOR DE 5 MINUTOS
window.addEventListener('DOMContentLoaded', () => {
    obtenerArchivosDeCarpeta();

    setInterval(() => {
        rotarYMostrarArchivos();
    }, 300000);

    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.visibility = 'hidden';
            }, 800);
        }, 1000);
    }
});

// 6. CORAZONES FLOTANTES DE FONDO
const heartsContainer = document.getElementById('hearts-container');
if (heartsContainer) {
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
}

// 7. REPRODUCTOR DE MÚSICA
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

if (musicBtn && bgMusic) {
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
}

// 8. SCROLL ANIMATION
function checkScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const triggerBottom = window.innerHeight * 0.85;
    reveals.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            card.classList.add('active');
        }
    });
}
window.addEventListener('scroll', checkScroll);

// 9. CERRAR MODAL
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-modal');

if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        const mediaContainer = document.getElementById('modal-media-container');
        if (mediaContainer) mediaContainer.innerHTML = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            const mediaContainer = document.getElementById('modal-media-container');
            if (mediaContainer) mediaContainer.innerHTML = '';
        }
    });
}