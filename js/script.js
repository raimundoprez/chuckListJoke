//Hacer una función para obtener un chiste de la API TERMINADO
//Hacer una función para obtener los chistes del LocalStorage TERMINADO
//Hacer una función para guardar un chiste en el LocalStorage TERMINADO
//Hacer una función para añadir un chiste al DOM TERMINADO
//Enlazar botón obtener chiste con las funciones anteriores TERMINADO
//Hacer una función para eliminar un chiste del LocalStorage TERMINADO
//Hacer una función para eliminar un chiste del DOM TERMINADO
//Enlazar botón eliminar chiste con las funciones anteriores TERMINADO
//Cargar los chistes guardados del LocalStorage al recargar la página TERMINADO
//Hacer botón de eliminar todos los chistes TERMINADO
//Tirar los poderes de CSS

const fetchJoke = document.getElementById('fetchJoke');
const removeJokes = document.getElementById('removeJokes');
const jokeList = document.getElementById('jokeList');

const endpoint = 'https://api.chucknorris.io/jokes/random';

//Llamar así obtenerChisteAPI().then(chiste => TuCodigo)
async function obtenerChisteAPI() {
    return fetch(endpoint)
    .then(response => {
        if (!response.ok)
            throw new Error('Petición de obtención de chiste fallida.');
        
        return response.json();
    })
    .then(data => {
        return data.value;
    })
    .catch(error => {
        console.log(error);
    });
}

//Devuelve un array con la lista de chistes
function obtenerChistesAlmacenados() {
    const string = localStorage.getItem('chistes');
    let json = [];
    
    try {
        json = JSON.parse(string) || [];
    }
    catch (error) {
        console.log(error);
    }
    
    return json;
}

//Almacena un chiste en el localStorage
function almacenarChiste(chiste) {
    const chistesModificados = [...obtenerChistesAlmacenados(), chiste];
    localStorage.setItem('chistes', JSON.stringify(chistesModificados));
}

//Elimina uno o todos los chistes del localStorage (no pasar argumentos para eliminarlos todos)
function eliminarChisteAlmacenado(posicion) {
    if (posicion !== undefined) {
        const chistesModificados = obtenerChistesAlmacenados();
        chistesModificados.splice(posicion, 1);
        localStorage.setItem('chistes', JSON.stringify(chistesModificados));
    }
    else {
        localStorage.removeItem('chistes');
    }
}

//Hacer una función para añadir un chiste al DOM
function renderChistes() {
    jokeList.innerHTML = ''; // limpiar lista
    
    const chistes = obtenerChistesAlmacenados();
    
    chistes.forEach((chiste) => {
        const li = document.createElement('li');
        li.textContent = chiste;

        //Añade un boton de eliminar a cada chiste.
        const btn = document.createElement('button');
        btn.textContent = 'Eliminar';

        btn.addEventListener('click', () => {
            for (let i=0; i<jokeList.children.length; i++) {
                if (jokeList.children[i] === li) {
                    eliminarChisteAlmacenado(i);
                    renderChistes();
                    return;
                }
            }
        });

        li.appendChild(btn);
        jokeList.appendChild(li);
    });
}

//Cargamos los chistes guardados en el localStorage.
document.addEventListener('DOMContentLoaded', renderChistes);

//Enlazar botón obtener chiste con las funciones anteriores
fetchJoke.addEventListener('click', async () => {
    const chiste = await obtenerChisteAPI();
    if (!chiste) return;
    
    almacenarChiste(chiste);
    renderChistes();
});

//Enlazar botón eliminar chiste con las funciones anteriores
removeJokes.addEventListener('click', () => {
    eliminarChisteAlmacenado();
    renderChistes();
});