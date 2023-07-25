const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito') 
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []

cargarEventListener()
function cargarEventListener(){
    //cuando agregas un curso presionando 'Agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso)
    //elimina cursos del carrito

    carrito.addEventListener('click',eliminarCurso)

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',() => {
       
        articulosCarrito = []
        limpiarHtml(contenedorCarrito)
    })
}

//funciones
function agregarCurso(e){
    e.preventDefault();
    
  if(e.target.classList.contains('agregar-carrito')){
    let cursoSeleccionado = e.target.parentElement.parentElement
    leerDatosCurso(cursoSeleccionado)
  }
}
//elimina curso
function eliminarCurso(e){
    
  if(e.target.classList.contains('borrar-curso')){
    
     let cursoId = e.target.getAttribute('data-id')
    
    //elimina del arreglo por el data id
    articulosCarrito=articulosCarrito.filter(articulo=>articulo.id!==cursoId)
   
  }
  carritoHtml()

}
//lee el contenido del html al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso){
    console.log(curso)
    //crear un objeto con el objeto con el co tenido del curso
    let infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    //revisamos si el arreglo ya tiene ese elemento
    let existe = articulosCarrito.some(articulo=>articulo.id===infoCurso.id)
    if(existe){
        let cursos = articulosCarrito.map(articulo=>{
            if(articulo.id===infoCurso.id){
                articulo.cantidad ++
                return articulo
            }else{
                return articulo
            }
        })
        articulosCarrito=[...cursos]
    } else{
    //agrega elementos al arreglo de carrito
    articulosCarrito=[...articulosCarrito,infoCurso]
    console.log(articulosCarrito)
    }

    carritoHtml()
} 

//muestra el carrito de compras en el html
function carritoHtml(){
    //limpiar el html
      limpiarHtml(contenedorCarrito)
    //recorre el carrito y genera el html
    articulosCarrito.forEach((curso)=>{
       let {imagen,titulo,precio,cantidad,id}=curso
       let row = document.createElement('tr')
       row.innerHTML=`
       <td>
        <img src=" ${imagen}" width="110" >
       </td>
       <td>${titulo}</td>
       <td>${precio}</td>
       <td>${cantidad}</td> 
       <td>
          <a href="#" class="borrar-curso" data-id="${id}">x</a>
       </td>     
       `
       contenedorCarrito.appendChild(row)
    })

}
function limpiarHtml(datos){
    //forma lenta
   //datos.innerHTML = '';
   while(datos.firstChild){
    datos.removeChild(datos.firstChild)
   }
}