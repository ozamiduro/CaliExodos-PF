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
let datos = [];

/* Funciones */

function obtenerDatos() {

    db.collection("admin").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            let usuario = doc.data().usuario;
            let contraseña = doc.data().contraseña;

            data = {
                usuario: usuario,
                contraseña: contraseña,
            }

            datos.push(data);
        });
    });
}

function verificarUsuario() {

    let usuario = document.getElementById("user").value;
    let constra = document.getElementById("contraseña").value;

    let veriUser = datos.find(ele => ele.usuario == usuario);
    if (veriUser == undefined) {
        alert("Error");
        document.getElementById("form").reset();

    } else {
        if (veriUser.usuario === usuario && veriUser.contraseña === constra) {
            window.location = "./Admin.html";
            document.getElementById("form").reset();
        } else {
            alert("Usted es una robadatos");
            document.getElementById("form").reset();
        }
        
    }

}

window.onload = function () {
    obtenerDatos();
}

