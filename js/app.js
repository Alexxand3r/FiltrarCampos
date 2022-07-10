'use strict';

//Variables

const marca = document.querySelector('#marca');
const year = document.querySelector('#year'); //año tiene ñ,no sirve como variable
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');

// new Date trae el año actual
const max = new Date().getFullYear();
// mínimo de 15 años con el año actual.
const min = max - 15;
//console.log(max);
//console.log(min);

//Generar un objeto con la búsqueda
const datosBusqueda = {
  marca: ' ',
  year: ' ',
  minimo: ' ',
  maximo: ' ',
  puertas: ' ',
  transmision: ' ',
  color: ' ',
};

// eventos
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos); //muestra los elementos disponibles al cargar.
  //llenar opciones "años"
  llenarSelect();
});
//eventListener para los select de búsqueda

marca.addEventListener('change', e => {
  //console.log('probando...');
  //console.log(e.target.value);
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});

year.addEventListener('change', e => {
  datosBusqueda.year = parseInt(e.target.value);
  // console.log(datosBusqueda);

  filtrarAuto();
});

minimo.addEventListener('change', e => {
  datosBusqueda.minimo = e.target.value;

  filtrarAuto();
});

maximo.addEventListener('change', e => {
  datosBusqueda.maximo = e.target.value;

  filtrarAuto();
});

puertas.addEventListener('change', e => {
  datosBusqueda.puertas = parseInt(e.target.value);

  filtrarAuto();
});

transmision.addEventListener('change', e => {
  datosBusqueda.transmision = e.target.value;

  filtrarAuto();
});
color.addEventListener('change', e => {
  datosBusqueda.color = e.target.value;

  filtrarAuto();
});

console.log(datosBusqueda);
//Funciones
function mostrarAutos(autos) {
  limpiarHTML(); //elimina el html previo.

  autos.forEach(auto => {
    //destructuracion

    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement('p');

    autoHTML.textContent = ` ${marca}  ${modelo}   -  ${year} -  ${puertas}  Puertas - Transmision:  ${transmision}  -  Precio:  $ ${precio}  -  Color:  ${color} `;
    //Insertar en el HTML
    resultado.appendChild(autoHTML);
  });
}
//limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
// todos los datos que obtengas de formularios vienen como strings
//Genera los años del select
function llenarSelect() {
  /*   for (let i = min; i < max; i++) {
    console.log(i);
  }
 */

  //muestra del año actual al ultimo.
  //corre hacia atrás,empieza x el año actual
  for (let i = max; i >= min; i--) {
    //console.log(i);
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); //Agrega las opciones de año al select
  }
  //console.log('llenando el select....');
}

//Función q filtra en base a la búsqueda
function filtrarAuto() {
  //console.log('probando');
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  //console.log(resultado);
  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement('div');
  noResultado.classList.add('alerta', 'error');
  noResultado.textContent = 'No Hay Resultados';
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
  //console.log(auto);
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}
function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}
