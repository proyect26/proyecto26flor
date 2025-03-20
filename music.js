
// Función para reproducir música
document.addEventListener('DOMContentLoaded', function() {
    // Si estamos en la página de flores (flower.html)
    const isFlowerPage = document.querySelector('#flowerMusic') !== null;
    const audio = isFlowerPage ? document.querySelector('#flowerMusic') : document.querySelector('#backgroundMusic');
    const musicButton = document.querySelector('#musicButton');
    
    // Función para actualizar el estado del botón de música
    function updateMusicButtonState() {
        if (audio.paused) {
            musicButton.classList.remove('active');
        } else {
            musicButton.classList.add('active');
        }
    }
    
    // Evento para el botón de música
    if (musicButton) {
        musicButton.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            updateMusicButtonState();
        });
    }
    
    // Eliminar la reproducción automática
    // audio.play().catch(function(error) {
    //     console.log('La reproducción automática falló:', error);
    //     musicButton.classList.remove('active');
    // });

    // Actualizar el estado del botón de música cuando cambia el estado del audio
    audio.addEventListener('play', updateMusicButtonState);
    audio.addEventListener('pause', updateMusicButtonState);
    
    // Actualizar el estado inicial del botón
    updateMusicButtonState();
});
