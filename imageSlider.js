// Manejador del slider de imágenes con efecto de parpadeo
document.addEventListener('DOMContentLoaded', function() {
    // Contenedor de imágenes
    const imageWrapper = document.querySelector('.image-wrapper');
    
    // Array con las imágenes (al principio vacío, se llenará con imágenes seleccionadas)
    let images = [];
    
    // Imágenes predeterminadas desde la carpeta img/
    const sampleImages = [
        'img/Imagen de WhatsApp 2025-03-19 a las 21.09.36_94359338.jpg',
        'img/Imagen de WhatsApp 2025-03-19 a las 21.08.50_b9d267c5.jpg',
        'img/Imagen de WhatsApp 2025-03-19 a las 21.08.50_140ccda4.jpg',
        'img/Imagen de WhatsApp 2025-03-19 a las 21.08.50_8f789649.jpg',
        'img/Imagen de WhatsApp 2025-03-19 a las 21.08.49_8f4e556e.jpg',
        'img/Imagen de WhatsApp 2025-03-19 a las 21.08.49_3155df25.jpg',
        'img/Imagen de WhatsApp 2025-03-19 a las 21.08.48_4840a42e.jpg',
        'img/2.jpeg',
        'img/3.jpeg',
        'img/WhatsApp Image 2025-02-03 at 21.58.47.jpeg'
    ];
    
    // Video para mostrar
    const video = 'img/Video de WhatsApp 2025-03-19 a las 21.06.56_8c315364.mp4';
    
    // Función para cargar las imágenes iniciales
    function loadInitialImages() {
        // Primero cargar las imágenes
        sampleImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'slide-image';
            img.alt = `Imagen ${index + 1}`;
            
            // La primera imagen comienza activa
            if (index === 0) {
                img.classList.add('active');
            }
            
            imageWrapper.appendChild(img);
        });
        
        // Ahora añadir el video
        const videoEl = document.createElement('video');
        videoEl.src = video;
        videoEl.className = 'slide-image';
        videoEl.alt = 'Video';
        videoEl.muted = true;
        videoEl.loop = true;
        videoEl.playsInline = true;
        
        // Evento para reproducir el video cuando sea visible
        videoEl.addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                this.play();
            } else {
                this.pause();
            }
        });
        
        imageWrapper.appendChild(videoEl);
        
        // Almacenar referencias a las imágenes y el video
        images = document.querySelectorAll('.slide-image');
    }
    
    // Función para permitir al usuario seleccionar sus propias imágenes
    function setupImageSelector() {
        // Crear un botón para seleccionar imágenes
        const selectButton = document.createElement('button');
        selectButton.textContent = '+ Añadir fotos';
        selectButton.className = 'image-selector-button';
        
        // Crear un input file oculto
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        
        // Agregar el botón al DOM
        const imageContainer = document.getElementById('imageSlider');
        imageContainer.appendChild(selectButton);
        imageContainer.appendChild(fileInput);
        
        // Evento click en el botón
        selectButton.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Evento change en el input de archivos
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                // Limpiar el contenedor actual
                imageWrapper.innerHTML = '';
                
                // Procesar cada archivo seleccionado
                Array.from(this.files).forEach((file, index) => {
                    const img = document.createElement('img');
                    img.className = 'slide-image';
                    img.alt = `Imagen ${index + 1}`;
                    
                    // Usar FileReader para convertir el archivo a URL
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                    
                    // Primera imagen activa
                    if (index === 0) {
                        img.classList.add('active');
                    }
                    
                    imageWrapper.appendChild(img);
                });
                
                // Actualizar la colección de imágenes
                images = document.querySelectorAll('.slide-image');
                
                // Reiniciar el intervalo
                clearInterval(slideInterval);
                startSlideShow();
            }
        });
    }
    
    // Variable para el intervalo
    let slideInterval;
    let currentIndex = 0;
    
    // Función para iniciar el slideshow con efecto de parpadeo
    function startSlideShow() {
        slideInterval = setInterval(() => {
            // Obtener la imagen actual y la siguiente
            const currentImage = images[currentIndex];
            
            // Calcular el índice de la siguiente imagen
            const nextIndex = (currentIndex + 1) % images.length;
            const nextImage = images[nextIndex];
            
            // Aplicar efecto de parpadeo
            currentImage.classList.add('fade-out');
            
            // Si el elemento actual es un video, detenerlo
            if (currentImage.tagName === 'VIDEO') {
                currentImage.pause();
            }
            
            // Después de un tiempo, cambiar las clases
            setTimeout(() => {
                currentImage.classList.remove('active');
                currentImage.classList.remove('fade-out');
                nextImage.classList.add('active');
                
                // Si el elemento siguiente es un video, reproducirlo
                if (nextImage.tagName === 'VIDEO') {
                    nextImage.currentTime = 0; // Reiniciar el video
                    nextImage.play();
                }
                
                currentIndex = nextIndex;
            }, 1500); // Tiempo de transición de opacidad
            
        }, 5000); // Cambiar cada 5 segundos
    }
    
    // Inicializar el slider
    loadInitialImages();
    setupImageSelector();
    startSlideShow();
}); 