
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
var datos = [];

/* Funciones */

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

function tablaCostumer(recti) {

    let body = document.getElementById("data");
    let nuevoTr = "";

    body.innerHTML = "";

    nuevoTr +=
        `<tr>
        <td class="lostd">${recti.name}</td>
        <td class="lostd">${recti.cc}</td>
        <td class="lostd">${recti.plan.plan}</td>
        <td class="lostd">${recti.plan.horario}</td>
        <td class="lostd">${recti.plan.fecha}</td>
        </tr> `;

    body.innerHTML = nuevoTr;

}

function VerificarDatos() {
    let check = document.getElementById("veri").value;
    var cador = datos.find(Elem => Elem.cc === check);

    if (cador !== undefined) {
        tablaCostumer(cador);
        document.getElementById("form").reset();
    }
    else {
        document.getElementById("form").reset();
        alert("Se ha generado un error al digitar su documento, por favor vuelvalo a digitar");
        document.getElementById("data").innerHTML = "";
    }

}

window.onload = function () {
    obtenerDatos();
}
