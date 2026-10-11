// Slider automático
if(document.querySelector("#container-slider")){
    setInterval('fntExecuteSlide("next")', 5000);
}

// Clicks en los puntos del slider
if(document.querySelector(".listslider")){
    let link = document.querySelectorAll(".listslider li a");
    link.forEach(function(link){
        link.addEventListener('click', function(e){
            e.preventDefault();
            let item = this.getAttribute('itlist');
            let arrItem = item.split("_");
            fntExecuteSlide(arrItem[1]);
            return false;
        });
    });
}

function fntExecuteSlide(side){
    let parentTarget = document.getElementById('slider');
    if(!parentTarget) return;

    let elements = parentTarget.getElementsByTagName('li');
    let curElement, nextElement;

    for(var i=0; i<elements.length; i++){
        if(elements[i].style.opacity == 1){
            curElement = i;
            break;
        }
    }

    if(side == 'prev' || side == 'next'){
        if(side == "prev"){
            nextElement = (curElement == 0) ? elements.length - 1 : curElement - 1;
        } else {
            nextElement = (curElement == elements.length - 1) ? 0 : curElement + 1;
        }
    } else {
        nextElement = side;
        side = (curElement > nextElement) ? 'prev' : 'next';
    }

    let elementSel = document.getElementsByClassName("listslider")[0].getElementsByTagName("a");
    elementSel[curElement].classList.remove("item-select-slid");
    elementSel[nextElement].classList.add("item-select-slid");

    elements[curElement].style.opacity = 0;
    elements[curElement].style.zIndex = 0;
    elements[nextElement].style.opacity = 1;
    elements[nextElement].style.zIndex = 1;
}

// Cargar páginas (nosotros, cargos, etc.)
function cargarPagina(pagina){
    fetch(pagina)
    .then(response => {
        if (!response.ok) throw new Error('Error al cargar la pagina');
        return response.text();
    })
    .then(data => {
        document.getElementById('contenido').innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
}

// Volver al inicio (logo)
function mostrarInicio(){
    location.reload();   // recarga la página y vuelve a mostrar el inicio
}

// Menú hamburguesa para pantallas pequeñas
document.addEventListener('DOMContentLoaded', function () {
    const botonMenu = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu-principal');
    if (!botonMenu || !menu) return;
    botonMenu.addEventListener('click', function () {
        const abierto = menu.classList.toggle('menu-abierto');
        botonMenu.classList.toggle('activo', abierto);
        botonMenu.setAttribute('aria-expanded', String(abierto));
        botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });
    menu.querySelectorAll('a').forEach(function (enlace) {
        enlace.addEventListener('click', function () {
            menu.classList.remove('menu-abierto');
            botonMenu.classList.remove('activo');
            botonMenu.setAttribute('aria-expanded', 'false');
            botonMenu.setAttribute('aria-label', 'Abrir menú');
        });
    });
});
