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

let db = firebase.firestore();

function obtenerDatos() {
    var name = document.getElementById("name").value;
    var cedula = document.getElementById("cc").value;

    console.log(name + ", " + cedula);

//    db.collection('cita').doc().set({
//        name: name,
//        cedula: cedula,
//    });

    console.log(db.collection('cita').get());
}

    