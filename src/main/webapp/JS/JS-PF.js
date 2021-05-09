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
var fecha = new Date();



/* Funciones */

function AgregarDatos() {

    var name = document.getElementById("name").value;
    var cedula = document.getElementById("cc").value;
    var plan = document.getElementById("oplanes").value;
    var horario = document.getElementById("hora").value;
    var fecha = document.getElementById("date").value;
    
    var disponible = probarFecha(fecha);


    if (disponible !== true) {
        console.log("Error");
        alert("Mi loco esta muy mal");
    } else {
        console.log("Mi loco, ya se ha guardado");
        db.collection('cita').doc(cedula).set({
            name: name,
            cedula: cedula,
            plan : {
                plan: plan,
                horario: horario,
                fecha: fecha,
            }
        })
                .then(res => (console.log("guardado")))
                .catch()
    
    
        LimpiarForm();
    }
}

function LimpiarForm() {
    document.getElementById("registrar").reset();
}




window.onload = function () {

console.log(fecha);
var lafecha = "2021-04-03".split("-");
var mydate = new Date(lafecha[0], lafecha[1]-1, lafecha[2]);
console.log(mydate.toDateString());

}

function probarFecha(fecha){
    var hoy = new Date();
    var mes = hoy.getMonth()+1;
    var dia = hoy.getDate();
    var year = hoy.getFullYear();
    if (mes <= 10) {
        mes = `0${mes}`;
    } 
    if (dia <= 10){
        dia = `0${dia}`;
    }
    lafecha = `${year}-${mes}-${dia}`;
    var vale;
    if(fecha >= lafecha){
        vale =  true;
    } else {
        vale = false;
    }

    return vale;
}







    