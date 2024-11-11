function toggleCardForm() {
    const paymentMethod = document.getElementById('metodo_pago').value;
    const cardInfo = document.getElementById('card-info');
    const transInfo = document.getElementById('trans-info');
    
    // Añade o quita la clase 'show' para deslizar
    if (paymentMethod === 'tarjeta') {
        cardInfo.classList.add('show');
        transInfo.classList.remove('show');
    } else if(paymentMethod === 'transferencia') {
        cardInfo.classList.remove('show');
        transInfo.classList.add('show');
    } else {
        transInfo.classList.remove('show');
        cardInfo.classList.remove('show');
    }
}

function copiarTexto() {
    // Selecciona el elemento de texto
    const texto = '4152314130508560';

    // Usa la API del portapapeles para copiar el texto
    navigator.clipboard.writeText(texto);
}