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
                horario:horario,
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

function ladisponibilidad(){
    var dispo = document.getElementById("disponibilidad");
    var today = document.getElementById("today");
    var canti = 0;
    var hoy = new Date();
    var mes = hoy.getMonth()+1;
    var dia = hoy.getDate();
    var year = hoy.getFullYear();
    if (mes < 10) {
        mes = `0${mes}`;
    } 
    if (dia < 10){
        dia = `0${dia}`;
    }
    lafecha = `${year}-${mes}-${dia}`;


    for (data of datos) {
        var fecha = data.plan.fecha;
        if(fecha === lafecha){
            canti += 1;
            
        }

    }

    // Aquí hay un problema con el Date, al dia toca sumarle una para que muestre el día del hoy
    
    dia += 1;
    lafecha = `${year}-${mes}-${dia}`;
    f = new Date(lafecha);

    //Hasta aquí se soluciona
    
    today.innerText = f.toDateString();;
    dispo.innerText = `${canti}/200`;
}

window.onload = function() {
    obtenerDatos();
    setTimeout(function(){ladisponibilidad()},3000);

}

