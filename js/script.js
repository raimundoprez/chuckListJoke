//Hacer una función para eliminar un chiste del LocalStorage
//Hacer una función para eliminar un chiste del DOM
//Enlazar botón eliminar chiste con las funciones anteriores
//Cargar los chistes guardados del LocalStorage al recargar la página
//Hacer botón de eliminar todos los chistes
//Tirar los poderes de CSS

const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');

const endpoint = 'https://api.chucknorris.io/jokes/random';

//Hacer una función para obtener un chiste de la API TERMINADO
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

//Hacer una función para obtener los chistes del LocalStorage TERMINADO
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

//Hacer una función para guardar un chiste en el LocalStorage TERMINADO
//Almacena un chiste en el localStorage
function almacenarChiste(chiste) {
    const chistesModificados = [...obtenerChistesAlmacenados(), chiste];
    localStorage.setItem('chistes', JSON.stringify(chistesModificados));
}


//Hacer una función para añadir un chiste al DOM
function renderChistes() {
    jokeList.innerHTML = ''; // limpiar lista
    
    const chistes = obtenerChistesAlmacenados();
    
    chistes.forEach((chiste, index) => {
        const li = document.createElement('li');
        li.textContent = chiste;
        jokeList.appendChild(li);

        //Añade un boton de eliminar a cada chiste.
        const btn = document.createElement('button');
        btn.textContent = 'Eliminar';
        btn.addEventListener('click', () => eliminarChiste(index));

        li.appendChild(btn);
        jokeList.appendChild(li);
    });
    }
    //Funcion para eliminar del localStorage un chiste en concreto.
    function eliminarChiste(index) {
    const chistes = obtenerChistesAlmacenados();
    chistes.splice(index, 1); // eliminar 1
    localStorage.setItem('chistes', JSON.stringify(chistes));
    renderChistes();
}
//Cargamos los chistes guardados en el localStorage.
document.addEventListener("DOMContentLoaded", renderChistes)

//Enlazar botón obtener chiste con las funciones anteriores
fetchJoke.addEventListener('click', async () => {
    const chiste = await obtenerChisteAPI();
    if (!chiste) return;
    
    almacenarChiste(chiste);
    renderChistes();
});




/*
obtenerChisteAPI().then(chiste => {
    almacenarChiste(chiste);
    
    const string = localStorage.getItem("chistes");
    const json = JSON.parse(string);
    
    console.log("Lista de chistes", json);
    });
    */