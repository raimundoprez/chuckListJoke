//Hacer una función para obtener un chiste de la API TERMINADO
//Hacer una función para obtener los chistes del LocalStorage TERMINADO
//Hacer una función para guardar un chiste en el LocalStorage TERMINADO
//Hacer una función para añadir un chiste al DOM
//Enlazar botón obtener chiste con las funciones anteriores
//Hacer una función para eliminar un chiste del LocalStorage
//Hacer una función para eliminar un chiste del DOM
//Enlazar botón eliminar chiste con las funciones anteriores
//Cargar los chistes guardados del LocalStorage al recargar la página
//Hacer botón de eliminar todos los chistes
//Tirar los poderes de CSS

const fetchJoke = document.getElementById('fetchJoke');
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

/*
obtenerChisteAPI().then(chiste => {
    almacenarChiste(chiste);

    const string = localStorage.getItem("chistes");
    const json = JSON.parse(string);

    console.log("Lista de chistes", json);
});
*/