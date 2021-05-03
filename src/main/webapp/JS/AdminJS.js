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
            console.log(`${doc.id} => ${doc.data().name},${doc.data().cedula},${doc.data().plan}`);

            var nombre = doc.data().name;
            var cedula = doc.data().cedula;
            
            console.log(doc.data().plan)
            
            var horario = "";//doc.data().plan['horario'];
            var planes = "";//doc.data().plan['plan'];
            
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
    console.log(datos)
}

function tablaAdmin() {
    let body = document.getElementById("data");
    let nuevoTr = "";

    body.innerHTML = "";
    
    
    
    console.log(datos.length);

    for (let i = 0; i < datos.length; i++) {
        const citas = datos[i];
        console.log(datos);
        nuevoTr += `<tr>
                        <td>${citas.name}</td>
                        <td>${citas.cc}</td>
                        <td></td>
                    </tr>`;
    }

    body.innerHTML = nuevoTr;
    
}

window.onload = function () {
    obtenerDatos();
}


