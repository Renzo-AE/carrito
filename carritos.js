import {productos} from './productos.js'


// Lista de productos para el carrito
let listProductsCar = [{id : 0,
    name : '',
    precio : 0,
    img : '',
    cantidad: 0}];

//Mostrar la tabla de productos
const table = document.getElementById('table-productos');

//Ventana Añadir
const ventanaCompra = document.querySelector('#ventanaCompra');

// Producto escogido
let producto = {
    id : 0,
    name : '',
    precio : 0,
    img : '',
    cantidad: 0
}

// Pintar los productos en pantalla
const pintarProductos = () => {
    let lista = '';
    let numeroPos = 1;

    productos.forEach(producto => {
        lista += `
            <tr>
                <th>
                    <div class="id" hidden>${producto.id}</div>
                    <p>${numeroPos}. <span id="nameProduct">${producto.name[0].toUpperCase() + producto.name.slice(1)}</span></p>
                    <p>S/ <span class="price">${producto.precio}<span></p>
                    <button class="btnComprar" id="comprar-producto">comprar</button>
                </th>
            </tr>
        `
        numeroPos++
    })
    table.innerHTML = lista;
}

pintarProductos()

// Cuando hacemos click en el boton 'comprar'
table.addEventListener('click', e => {
    if(e.target.classList.contains('btnComprar')){
        const dateProduct = e.target.parentElement;
        const id = parseInt(dateProduct.querySelector('.id').textContent);
        producto.id = id;
        producto.name = dateProduct.querySelector('#nameProduct').textContent.toLowerCase()
        producto.precio = dateProduct.querySelector('.price').innerText;
        producto.img = productos[id-1].img
        producto.cantidad = 0;
        ventanaCompra.classList.toggle('habilitar')
    }
    inputCantidad.value = '';
    console.log(producto)
})

// Cerrar ventana de compra
const cerrar = document.getElementById('cerrar');
cerrar.addEventListener('click', () => {
    ventanaCompra.classList.toggle('habilitar')
})


// Validacion del campo cantidad
const inputCantidad = document.getElementById('cantidad')
const expresionNumerica = /^[0-9]/;

inputCantidad.addEventListener('keyup', () => {
    if (expresionNumerica.test(inputCantidad.value)){
        producto.cantidad = parseInt(inputCantidad.value) 
    }else {
        if(inputCantidad.value == ''){
            inputCantidad.value == ''
        }else{
            alert('Solo debe ingresar números');
            inputCantidad.value = '';
        }
    }
})

// Boton menos
const btnMenos = document.getElementById('menos')
btnMenos.addEventListener('click', () => {
    if(inputCantidad.value <= 1){
        inputCantidad.value = '';
    }else{
        inputCantidad.value = parseInt(inputCantidad.value) - 1;
    }
})

//Boton mas
const btnMas = document.getElementById('mas')
btnMas.addEventListener('click', () => {
    if(inputCantidad.value === ''){
        inputCantidad.value = 1;
    }else{
        inputCantidad.value = parseInt(inputCantidad.value) + 1;
    }
})

//Boton Añadir al carrito
const btn = document.getElementById('agregarCarrito')

btn.addEventListener('click', () => {
    if(inputCantidad.value === ''){
        alert('Debe tener una cantidad')
    }else{
        producto.cantidad = parseInt(inputCantidad.value);

        const siExiste = listProductsCar.some(productoLista => productoLista.id === producto.id);
        if(siExiste){
            const newListProducts = listProductsCar.map(productList => {
                if(productList.id === producto.id){
                    productList.cantidad += producto.cantidad
                    return productList
                }else{
                    return productList
                }
            })

            listProductsCar = newListProducts;
        }else{
            listProductsCar.push(producto)
        }
        ventanaCompra.classList.toggle('habilitar')
    }
    console.log(listProductsCar)
    console.log(inputCantidad.value)
    console.log(producto)
})