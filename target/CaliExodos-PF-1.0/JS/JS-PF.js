/* Inicializar FireStore*/

/* global firebase */

var firebaseConfig = {
    apiKey: "AIzaSyC6w7C3oA_fWHbC2A_jRdVeb38OZdxa5bc",
    authDomain: "proyectofinal-pnt-7d6a8.firebaseapp.com",
    projectId: "proyectofinal-pnt-7d6a8",
    storageBucket: "proyectofinal-pnt-7d6a8.appspot.com",
    messagingSenderId: "395797690768",
    appId: "1:395797690768:web:849fad08f6193360f81b15",
    measurementId: "G-6L7QTZR07T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

/* Atributos */

let db = firebase.firestore();



/* Funciones */

function AgregarDatos() {

    var name = document.getElementById("name").value;
    var cedula = document.getElementById("cc").value;
    var plan = document.getElementById("oplanes").value;
    var horario = document.getElementById("hora").value;


    db.collection('cita').doc(cedula).set({
        name: name,
        cedula: cedula,
        plan : {
            plan: plan,
            horario: horario,
            
        }
    })
            .then(res => (console.log("guardado")))
            .catch()


    obtenerDatos();
    LimpiarForm();
}

function LimpiarForm() {
    document.getElementById("registrar").reset();
}




window.onload = function () {

}




    