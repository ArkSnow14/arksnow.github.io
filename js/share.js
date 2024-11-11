const shareBtn = document.querySelector('.share-btn');
const shareOptions = document.querySelector('.share-options');

shareBtn.addEventListener('click', () => {
    shareOptions.classList.toggle('active');
})

function copiarTexto() {
    // Selecciona el elemento de texto
    const texto = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    // Usa la API del portapapeles para copiar el texto
    navigator.clipboard.writeText(texto);
}

//const link = encodeURI(window.location.href);
const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const msg = encodeURIComponent('mira estos ricos alimentos');

function sharewpp() {
    const mensaje = "Disfruta un rico burrito o una torta en Delicias Chuy";
    const urlPagina = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Cambia esta URL por la de tu página
    const textoFinal = `${mensaje}\n\n${urlPagina}`; // Combina el mensaje con el enlace
    
    const urlWhatsApp = `https://wa.me/?text=${encodeURIComponent(textoFinal)}`;
    
    window.open(urlWhatsApp, "_blank"); // Abre el enlace en una nueva pestaña
}

function sharefb() {
    const mensaje = "Disfruta un rico burrito o una torta en Delicias Chuy";
    const urlPagina = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Cambia esta URL por la de tu página
    
    const urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlPagina)}&quote=${encodeURIComponent(mensaje)}`;
    
    window.open(urlFacebook, "_blank"); // Abre el enlace en una nueva pestaña
}

function sharetwt() {
    const mensaje = "Disfruta un rico burrito o una torta en Delicias Chuy";
    const urlPagina = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Cambia esta URL por la de tu página
    
    const urlTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(mensaje)}%20${encodeURIComponent(urlPagina)}`;
    
    window.open(urlTwitter, "_blank"); // Abre el enlace en una nueva pestaña
}

function sharetl() {
    const mensaje = "Disfruta un rico burrito o una torta en Delicias Chuy";
    const urlPagina = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Enlace de tu página
    const urlTelegram = `https://t.me/share/url?url=${encodeURIComponent(urlPagina)}&text=${encodeURIComponent(mensaje)}`;
    
    window.open(urlTelegram, "_blank"); // Abre el enlace en una nueva pestaña
}



