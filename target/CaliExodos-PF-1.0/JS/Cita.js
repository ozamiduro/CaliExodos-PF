
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


function obtenerDatos() {
    
    db.collection("cita").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            var nombre = doc.data().name;
            var cedula = doc.data().cedula;
            
            var losplanes = doc.data().plan;
            
            var horario = losplanes.horario;
            var planes = losplanes.plan;
            
            let plan = {
                horario:horario,
                plan: planes,
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

function tablaCustomer(recti) {
    
    let body = document.getElementById("data");
    let nuevoTr = "";

    body.innerHTML = "";
    
        nuevoTr +=
        `<tr>
        <td>${recti.name}</td>
        <td>${recti.cc}</td>
        <td>${recti.plan.plan}</td>
        <td>${recti.plan.horario}</td>
        </tr> `;
    
    body.innerHTML = nuevoTr;
    
}

function VerificarDatos() {
    let check = document.getElementById("veri").value;
    console.log(check)
    var cador = datos.find(Elem => Elem.cc === check);
    console.log(cador == undefined) 
    
    if(cador !== undefined){
        tablaCustomer(cador);
    }
    else{
        
        alert("Se ha generado un error al digitar su documento, por favor vuelvalo a digitar");
    }
    
}

window.onload = function () {
    obtenerDatos();
}
