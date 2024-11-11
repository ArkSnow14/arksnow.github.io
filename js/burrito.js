let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Añadir a la lista</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('ingredientsCart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const addCustomBurritoToItems = () => {
    console.log("Iniciando función addCustomBurritoToItems");

    if (!cart || cart.length === 0) {
        console.log('El carrito está vacío.');
        return;
    }

    let customBurritoName = 'burrito custom: ';
    let totalPrice = 0;

    cart.forEach(item => {
        console.log('Buscando producto con id:', item.product_id);
        console.log('Con ese id hay',products[item.product_id-1]);
        let product = products[item.product_id-1];
        if (!product) {
            console.log('Producto no encontrado:', item.product_id);
            return;
        }
        customBurritoName += `${product.name} x${item.quantity}, `;
        totalPrice += product.price * item.quantity;
    });
    

    console.log('Nombre del burrito:', customBurritoName);
    console.log('Precio total:', totalPrice);

    let newItem = {
        id: Date.now(),
        name: customBurritoName,
        price: totalPrice,
        image: "images/burrito-perso.png"
    };

    let customs = JSON.parse(localStorage.getItem('customs')) || [];
    customs.push(newItem);

    localStorage.setItem('customs', JSON.stringify(customs));
    // Obtener los datos de customs
const customsData = localStorage.getItem('customs');

// Verificar si customs existe y tiene datos
if (customsData) {
    // Guardar los datos en otro localStorage (por ejemplo, "customsCopy")
    localStorage.setItem('customs2', customsData);
    console.log('Datos duplicados en customs2');
} else {
    console.log('No hay datos en customs');
}


    console.log('Burrito custom agregado a localStorage.');
    localStorage.removeItem('ingredientsCart');
};




const initApp = () => {
    // get data product
    fetch('js/ingredients.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('ingredientsCart')){
            cart = JSON.parse(localStorage.getItem('ingredientsCart'));
            addCartToHTML();
        }
    })
}
initApp();