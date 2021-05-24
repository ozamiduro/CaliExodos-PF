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
var datos = [];

/* Funciones */

function AgregarDatos() {

    var name = document.getElementById("name").value;
    var cedula = document.getElementById("cc").value;
    var plan = document.getElementById("oplanes").value;
    var horario = document.getElementById("hora").value;
    var fecha = document.getElementById("date").value;

    var disponible = probarFecha(fecha);
    var dis = disponibilidad(fecha);

    if (disponible !== true) {
        estilos1();
        // Fecha anterior
    } else {
        if (dis !== true) {
            estilos2();
            // Disponibilidad
        } else {

            // Guardado
            db.collection('cita').doc(cedula).set({
                name: name,
                cedula: cedula,
                plan: {
                    plan: plan,
                    horario: horario,
                    fecha: fecha,
                }
            })
                .then(res => (estilos3()))
                .catch()


            LimpiarForm();
            obtenerDatos();
        }
    }
}

function LimpiarForm() {
    document.getElementById("registrar").reset();
}


function obtenerDatos() {

    db.collection("cita").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var nombre = doc.data().name;
            var cedula = doc.data().cedula;

            var losplanes = doc.data().plan;

            var horario = losplanes.horario;
            var planes = losplanes.plan;
            var fecha = losplanes.fecha;

            let plan = {
                horario: horario,
                plan: planes,
                fecha: fecha,
            };

            let data = {
                name: nombre,
                cc: cedula,
                plan: plan,
            };


            datos.push(data);
        });
    });
}

window.onload = function () {
    obtenerDatos();
}

function probarFecha(fecha) {
    var hoy = new Date();
    var mes = hoy.getMonth() + 1;
    var dia = hoy.getDate();
    var year = hoy.getFullYear();
    if (mes < 10) {
        mes = `0${mes}`;
    }
    if (dia < 10) {
        dia = `0${dia}`;
    }
    lafecha = `${year}-${mes}-${dia}`;
    var vale;
    if (fecha >= lafecha) {
        vale = true;
    } else {
        vale = false;
    }
    return vale;

}

function disponibilidad(fecha) {

    var cantidad = 0;
    var disponi = false;

    for (data of datos) {

        if (fecha === data.plan.fecha) {
            cantidad += 1;
        }
    }

    if (cantidad <= 200) {
        disponi = true;
    } else if (cantidad > 200) {
        disponi = false;
    }

    return disponi;
}

/*Notificaciones*/

function estilos1 (){
    document.getElementById("notificacion1").style.display= "block";
     $("#notificacion1").delay(6500).fadeOut(1500,"swing");
}

function estilos2 (){
    document.getElementById("notificacion2").style.display= "block";
     $("#notificacion2").delay(6500).fadeOut(1500,"swing");
}

function estilos3 (){
    document.getElementById("notificacion3").style.display= "block";
     $("#notificacion3").delay(6500).fadeOut(1500,"swing");
}





