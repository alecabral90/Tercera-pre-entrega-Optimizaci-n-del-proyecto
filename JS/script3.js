/* Se declara la lista de tortas con precio e imagen arrays */
const listaDeTortas = [
    {
        id: 1,
        nombre: "Chocotorta",
        precio: 2000,
        img: "../img/chocot.jpg"
       
    },
    {
        id: 2,
        nombre: "Lemon pie",
        precio: 1800,
        img: "../img/lemon.jpg"
    },
    {
        id: 3,
        nombre: "Rogel",
        precio: 1500,
        img: "../img/rogel.jpg"
    },
    {
        id: 4,
        nombre: "Chessecake",
        precio: 2000,
        img: "../img/chess.jpg"
    },
    {
        id: 5,
        nombre: "MilkaCake",
        precio: 2500,
        img: "../img/milka.jpg"
    },
    {

        id: 6,
        nombre: "OreoCookies",
        precio: 1700,
        img: "../img/oreo.jpg"
    }
]




let catalogo = document.getElementById('productos')

let carritoLista = document.getElementById('carrito')

let botonVaciar = document.getElementById('boton-vaciar')

let totalValor = document.getElementById('total')

let carrito = []

botonVaciar.addEventListener('click', vaciarcarro)


cargarCarrito()
renderCarrito()


listaDeTortas.forEach((prod) => {
    let contenedor = document.createElement('div')
    contenedor.classList.add('card', 'col-sm-4', 'col-md-3')
    
    ////Body

    let cardBody = document.createElement("div")
    cardBody.classList.add('card-img-top')

     //imagen
     let imagenp = document.createElement("img")
     imagenp.classList.add('img-fluid')
     imagenp.setAttribute('src',prod.img)
     
    
    ////Titulo

    let cardTitulo = document.createElement("h2")
    cardTitulo.classList.add('card-title')
    cardTitulo.innerText = prod.nombre
    
    ////Precio

    let cardPrecio = document.createElement("p")
    cardPrecio.classList.add('card-text')
    cardPrecio.innerText = `$${prod.precio}-`
    
    
   
    //Button
    let cardBoton = document.createElement("button")
    cardBoton.classList.add('btn', 'btn-dark')
    cardBoton.innerText = `Agregar`
    cardBoton.setAttribute('elecprod', prod.id) //se diferencia con atributo los productos
    cardBoton.addEventListener('click', agregarproducto)

    cardBody.append(imagenp) //agrego
    cardBody.append(cardTitulo)
    cardBody.append(cardPrecio)
    cardBody.append(cardBoton)
    contenedor.append(cardBody)
    catalogo.append(contenedor)
    
})

function agregarproducto(evento){
    carrito.push(evento.target.getAttribute('elecprod')) // me devuelve el ID cuando ocurra el evento 'click'
    renderCarrito()
}



function renderCarrito(){

    guardarCarrito()

    carritoLista.innerHTML = ''   /// vaciar carrito al comenzar

    let carritoSinRepetidos = [...new Set(carrito)]  // array que no admite elementos repetidos para que el carrito no lo muestre mas de una vez, se usa 3 puntos para convertir objeto en array

    carritoSinRepetidos.forEach((producID) => {         
        let item = listaDeTortas.filter((producto) => { 
            return producto.id === parseInt(producID)  // Con mi primer ID, filtro el producto especifico que coincida, guardo en item el objeto para tener toda la informacion
        })
        let cantidad = carrito.reduce((total, id) => {
            return id === producID ? total += 1 : total // if // reduce empieza en cero
        }, 0)
    


    let linea = document.createElement('li') // agrego lista en html
    linea.classList.add('list-group-horizontal', 'text-right')  // add clase
    linea.innerText = `${cantidad}u  x  ${item[0].nombre} - $${item[0].precio}`  // muestro unidad e informacion de arrays


    let botonBorrarProducto = document.createElement('button')
    botonBorrarProducto.classList.add('btn', 'btn-danger', 'mx-1')
    botonBorrarProducto.innerText = '-X-'
    botonBorrarProducto.dataset.item = producID
    botonBorrarProducto.addEventListener('click', borrarProducto) // por cada evento ejecuto la funcion borrarProducto


    linea.append(botonBorrarProducto)  // agrego
    carritoLista.append(linea) // agrego
    })


    totalValor.innerText = calcularPrecioTotal()
}

function borrarProducto(event){
 let id = event.target.dataset.item  // me traigo el dataset por cada evento
 carrito = carrito.filter((carritoId) => {
    return carritoId != id
 })

 renderCarrito() // me vuelve a renderizar con menos productos
 
}

function vaciarcarro(){
    carrito = [] // carrito vacio
    carritoLista.innerHTML = '' // lo renderizo para q se vea en el front
    totalValor.innerText = 0 // cuando vaciamos vuelve a cero
}

function calcularPrecioTotal(){
    return carrito.reduce((total, producID) => {
        let item = listaDeTortas.filter((producto) => {    /// busco el producto entero para poder usar el precio
            return producto.id === parseInt(producID)  // me devuelve el id que coincide
        })
        return total + item[0].precio    
    }, 0)
}

function guardarCarrito(){   // lo guardo en storage
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


function cargarCarrito(){ // vuelvo a traer si existe algo guardado
    if(localStorage.getItem('carrito') !== null){
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
}