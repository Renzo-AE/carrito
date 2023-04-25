import { productos } from './productos.js'


// Lista de productos para el carrito
let listProductsCar = [];

//Mostrar la tabla de productos
const table = document.getElementById('table-productos');

//Ventana Añadir
const ventanaCompra = document.querySelector('#ventanaCompra');

// Pintar los productos en pantalla
const pintarProductos = () => {
    let lista = '';
    let numeroPos = 1;

    productos.forEach(producto => {
        lista += `
            <div class="row">
                <div class="id" hidden>${producto.id}</div>
                <p>${numeroPos}. <span id="nameProduct">${producto.name[0].toUpperCase() + producto.name.slice(1)}</span></p>
                <p>S/ <span class="price">${producto.precio}<span></p>
                <button class="btnComprar" id="comprar-producto">comprar</button>
            </div>
        `
        numeroPos++
    })
    table.innerHTML = lista;
}

pintarProductos()

// Mostrat Productos en el Carrito
const carritoShow = () => {
    const contenedor = document.getElementById('carrito');
    let contenido = '';
    let totalPrecio = 0;
    let totalProductos = listProductsCar.length

    if(!listProductsCar.length){
        contenedor.innerHTML = '<p>No hay productos</p>'
    }else{
        listProductsCar.forEach(product => {
            contenido += `
                    <div class="row">
                        <div class="id" hidden>${product.id}</div>
                        <p class="precio">${product.cantidad} Kg</p>
                        <p class="nombre">${product.name}</p>
                        <p class="precio">S/ ${product.precio}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 eliminar" viewBox="0 0 16 16">
                            <path class="eliminar" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </div>
            `

            totalPrecio += product.precio * product.cantidad;
        })

        contenedor.innerHTML = contenido;
        document.getElementById('monto').innerHTML = 'S/ ' + totalPrecio 
    }
    
}

// Cuando hacemos click en el boton 'comprar'
table.addEventListener('click', e => {
    if (e.target.classList.contains('btnComprar')) {
        const dateProduct = e.target.parentElement;
        const id = parseInt(dateProduct.querySelector('.id').innerText);
        /*  
        producto.id = id;
        producto.name = productos[id-1].name;
        producto.precio = productos[id-1].precio;
        producto.img = productos[id-1].img
        producto.cantidad = 0;
        ventanaCompra.classList.toggle('habilitar')
        */

        campoImg.innerHTML = `<img src="${productos[id - 1].img}" alt="" width="300">`;
        campoProducto.innerHTML = productos[id - 1].name;
        campoPrecio.innerHTML = 'S/ ' + productos[id - 1].precio;
        campoId.innerHTML = id;
        ventanaCompra.classList.toggle('habilitar')
        inputCantidad.value = '';
    }
})

// Cerrar ventana de compra
const campoProducto = document.getElementById('name');
const campoPrecio = document.getElementById('precio');
const campoImg = document.getElementById('img');
const campoId = document.getElementById('identificador');

const cerrar = document.getElementById('cerrar');
cerrar.addEventListener('click', () => {
    ventanaCompra.classList.toggle('habilitar')
})


// Validacion del campo cantidad
const inputCantidad = document.getElementById('cantidad')
const expresionNumerica = /^[0-9]/;

inputCantidad.addEventListener('keyup', () => {
    if (!expresionNumerica.test(inputCantidad.value)) {
        if (inputCantidad.value == '') {
            inputCantidad.value == ''
        } else {
            alert('Solo debe ingresar números');
            inputCantidad.value = '';
        }
    }
})

// Boton menos
const btnMenos = document.getElementById('menos')
btnMenos.addEventListener('click', () => {
    if (inputCantidad.value <= 1) {
        inputCantidad.value = '';
    } else {
        inputCantidad.value = parseInt(inputCantidad.value) - 1;
    }
})

//Boton mas
const btnMas = document.getElementById('mas')
btnMas.addEventListener('click', () => {
    if (inputCantidad.value === '') {
        inputCantidad.value = 1;
    } else {
        inputCantidad.value = parseInt(inputCantidad.value) + 1;
    }
})

//Boton Añadir al carrito
const btn = document.getElementById('agregarCarrito')

btn.addEventListener('click', () => {
    
    if (inputCantidad.value === '') {
        alert('Debe tener una cantidad')
    } else {

        const id = document.getElementById('identificador').innerText;
        console.log(id)

        const producto = {
            id: id,
            name: productos[id-1].name,
            precio: productos[id-1].precio,
            cantidad: parseFloat(inputCantidad.value)
        }

        const siExiste = listProductsCar.some(productoLista => productoLista.id === producto.id);
        console.log(listProductsCar.some(productoLista => productoLista.id === producto.id))
        if (siExiste) {
            const newListProducts = listProductsCar.map(productList => {
                if (productList.id === producto.id) {
                    productList.cantidad += producto.cantidad
                    return productList
                } else {
                    return productList
                }   
            })
            listProductsCar = newListProducts;
        } else {
            listProductsCar.push(producto)
        }
        ventanaCompra.classList.toggle('habilitar')
        carritoShow()
    }
    console.log(listProductsCar)
    console.log(inputCantidad.value)
})

//Boton eliminar 
const campoCarrito = document.querySelector('.lista');
campoCarrito.addEventListener('click', e => {
    console.log(e)
    if(e.target.classList.contains('eliminar')){
        const productoEliminar = e.target.parentElement
        const getId = productoEliminar.querySelector('.id').innerText
        listProductsCar = listProductsCar.filter(product => product.id !== getId)
    }
    carritoShow()
})