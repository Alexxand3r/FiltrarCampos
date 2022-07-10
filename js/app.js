'use strict';

//Variables
const resultado = document.querySelector('#resultado');

// eventos
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos();
});

//Funciones
function mostrarAutos() {
  autos.forEach(auto => {
    const autoHTML = document.createElement('p');

    autoHTML.textContent = `
    ${auto.marca}
    `;
    //Insertar en el HTML
    resultado.appendChild(autoHTML);
  });
}
