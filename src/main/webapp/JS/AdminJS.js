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

function tablaAdmin() {
    let body = document.getElementById("data");
    let foot = document.getElementById("cantidadatos");
    let nuevoTr = "";
    let cantidad = 0;

    

    body.innerHTML = "";
    
    
    for (citas of datos) {
        cantidad +=1;
        nuevoTr += `<tr>
                        <td class="lostd">${citas.name}</td>
                        <td class="lostd">${citas.cc}</td>
                        <td class="lostd">${citas.plan.plan}</td>
                        <td class="lostd">${citas.plan.horario}</td>
                        <td class="lostd">${citas.plan.fecha}</td>
                    </tr>`;

    }
    foot.innerHTML = `<tr>
    <td class="lostd">//</td>
    <td class="lostd">//</td>
    <td class="lostd">//</td>
    <td class="lostd">//</td>
    <td class="lostd">${cantidad}</td>
    </tr>`;
    body.innerHTML = nuevoTr;
    
}

window.onload = function () {
    obtenerDatos();
    setTimeout(function(){tablaAdmin()},4000);
}

function probarFecha() { 
    var data = document.getElementById("dat").value;
    let body = document.getElementById("data");
    let foot = document.getElementById("cantidadatos");
    let cantidad = 0;
    let nuevoTr = "";

    for(dat of datos){
        console.log(dat.plan.fecha);
        var fech = dat.plan.fecha;

        if(data === fech){
            body.innerHTML = "";
            cantidad +=1;
            console.log(dat);
            nuevoTr += `<tr>
                        <td class="lostd">${dat.name}</td>
                        <td class="lostd">${dat.cc}</td>
                        <td class="lostd">${dat.plan.plan}</td>
                        <td class="lostd">${dat.plan.horario}</td>
                        <td class="lostd">${dat.plan.fecha}</td>
                    </tr>`;
            foot.innerHTML = `<tr>
                    <td class="lostd">//</td>
                    <td class="lostd">//</td>
                    <td class="lostd">//</td>
                    <td class="lostd">//</td>
                    <td class="lostd">${cantidad}</td>
                </tr>`;
            body.innerHTML = nuevoTr;
        } 
    }

}
