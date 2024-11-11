let iconCart = document.querySelector('.cart_link');
let closeCart = document.querySelector('.cartClose');
let cartCheckOut = document.querySelector('.cartCheckOut');
let body = document.querySelector('body');  
let listCartHTML = document.querySelector('.listCart')
//let iconCartSpan = document.querySelector('')

let listProducts = [];
let carts = [];


iconCart.addEventListener('click', () => {
    body.classList.add('showCart'); // Usamos 'add' para mostrar el carrito
});
closeCart.addEventListener('click', () => {
    body.classList.remove('showCart'); // Usamos 'remove' para ocultar el carrito
});

cartCheckOut.addEventListener('click', function()  {
    window.location.href = 'checkout.html';
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
    updateCartTotal();
    updateCheckoutFields();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts))
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = ''; // Limpia el contenido actual

    if(carts.length > 0) {
        carts.forEach(cart => {
            let newCart = document.createElement('div');
            newCart.classList.add('listCartItem');
            newCart.dataset.id = cart.product_id;
            
            // Encuentra la información del producto
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];

            // Agrega el contenido HTML para cada ítem
            newCart.innerHTML = `
                <div class="itemImage">
                    <img src="${info.image}" alt="${info.name}">
                </div>
                <div class="itemName">
                    ${info.name}
                </div>
                <div class="itemTotalPrice">
                    $${(info.price * cart.quantity).toFixed(2)}
                </div>
                <div class="itemQuantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>`;
            
            listCartHTML.appendChild(newCart); // Añade el ítem al contenedor del carrito
        });
    } else {
        // Mensaje en caso de que el carrito esté vacío
        listCartHTML.innerHTML = '<p>El carrito está vacío.</p>';
    }
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        console.log(product_id);
        changeQuantity(product_id, type);
    }
})

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
    updateCartTotal();
    updateCheckoutFields();
}

const loadCustomsToCart = () => {
    // Recuperar los productos personalizados guardados en localStorage
    const customProducts = JSON.parse(localStorage.getItem('customs2')) || [];
    console.log('Productos personalizados recuperados del localStorage:', customProducts);

    // Verificar si hay productos personalizados para agregar
    if (customProducts.length === 0) {
        console.log('No hay productos personalizados en localStorage.');
        return;
    }

    // Recorrer cada producto personalizado y agregarlo al carrito solo si no está ya en él
    customProducts.forEach(customProduct => {
        const isInCart = carts.some(item => item.product_id === customProduct.id);
        if (!isInCart) {
            console.log(`Agregando producto personalizado al carrito: ID = ${customProduct.id}`);
            addToCart(customProduct.id);  // Agrega solo si no está en el carrito
        } else {
            console.log(`El producto personalizado ID = ${customProduct.id} ya está en el carrito.`);
        }
    });

    console.log('Todos los productos personalizados han sido agregados al carrito.');
    updateCartTotal();
    updateCheckoutFields();
};




//función para calcular el total
const updateCartTotal = () => {
    const total = carts.reduce((acc, item) => {
        let product = listProducts.find(product => product.id === item.product_id);
        return acc + (product.price * item.quantity);
    }, 0);

    document.getElementById('cartTotal').innerText = `$${total.toFixed(2)}`;
}

//añadí la fucnión para obtener item y cantidad del carrito
const getCartDetails = () => {
    let detailsText = '';

    if (carts.length > 0) {
        carts.forEach(cart => {
            let positionProduct = listProducts.find(product => product.id === cart.product_id);
            let productName = positionProduct ? positionProduct.name : 'Producto no encontrado';
                detailsText += `${productName} x ${cart.quantity}\n`;
        });
    } else {
        detailsText = 'El carrito está vacío.';
    }

    // Asignar el texto generado al campo oculto 'detalles'
    document.getElementById('hiddenCartDetails').value = detailsText.trim();
};

//añadí la función para obtener el total del carrito
const getCartTotal = () => {
    const total = carts.reduce((acc, item) => {
        let product = listProducts.find(product => product.id === item.product_id);
        return acc + (product.price * item.quantity);
    }, 0);

    // Asignar el total al campo oculto 'total'
    document.getElementById('hiddenCartTotal').value = total.toFixed(2); 
}

//función para actualizar detalles y total cuando cambie el carrito
const updateCheckoutFields = () => {
    getCartDetails(); 
    getCartTotal();    
};



  
const initApp = () => {
    fetch('js/items.json')  // Cargar productos desde items.json
    .then(response => response.json())
    .then(data => {
        // Inicializamos listProducts con los productos de items.json
        listProducts = data;

        // Recuperamos los productos personalizados desde localStorage
        const customProducts = JSON.parse(localStorage.getItem('customs')) || [];

        // Agregar los productos personalizados a listProducts
        customProducts.forEach(customProduct => {
            // Asumimos que los productos personalizados tienen la estructura adecuada
            // y que no hay conflictos con los IDs. Si el ID ya existe, puedes optar por
            // actualizar o simplemente agregarlos.
            listProducts.push(customProduct);  // Agregar el producto personalizado a listProducts
        });

        // Si hay un carrito guardado, cargarlo desde el localStorage
        if (localStorage.getItem('cart')) {
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
            updateCartTotal();
            // Muestra el carrito cargado

            // Solo mostrar el carrito si tiene productos
            if (carts.length > 0) {
                body.classList.add('showCart');  // Muestra el carrito si tiene productos
            }
        }
        if (localStorage.getItem('customs2')) {
            loadCustomsToCart(); 
            console.log('customs2 existe en localStorage.');
        }
        
        localStorage.removeItem('customs2'); // Cargar productos personalizados al carrito
    });
}

initApp();

