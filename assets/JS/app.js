var registrar = document.getElementById("registrar");

let pass = document.getElementById("pass");
let correo = document.getElementById("correo");

registrar.onclick = async () => {
    let nombre = document.getElementById("nombre").value;
    let ap = document.getElementById("ap").value;
    let am = document.getElementById("am").value;
    let correo = document.getElementById("correo").value;
    let pass = document.getElementById("pass").value;
    let recaptcha = grecaptcha.getResponse();

    if (nombre.trim() === "" || ap.trim() === "" || am.trim() === "" || correo.trim() === "" || pass.trim() === "") {
        Swal.fire({title: "ERROR", text: "Campos vacíos :(", icon: "error"});
        return;
    }

    if (!validarCorreo(correo)) {
        Swal.fire("ERROR", "Correo no valido", "error");
        return;
    }
    if (!validarPassword(pass)) {
        Swal.fire("ERROR", "Password no valido", "error");
        return;
    }

    if (recaptcha === "") {
        Swal.fire({title: "ERROR", text: "Por favor, complete el CAPTCHA", icon: "error"});
        return;
    }

    let datos = new FormData();
    datos.append("nombre", nombre);
    datos.append("ap", ap);
    datos.append("am", am);
    datos.append("correo", correo);
    datos.append("pass", pass);
    datos.append("g-recaptcha-response", recaptcha);
    datos.append("action", "insert");

    let respuesta = await fetch("php/insertar.php", { method: 'POST', body: datos });
    let json = await respuesta.json();

    if (json.success === true) {
        Swal.fire({title: "¡REGISTRADO CON EXITO!", text: json.mensaje, icon: "success"});
        notify();
    } else {
        Swal.fire({title: "ALGO SALIO MAL", text: json.mensaje, icon: "error"});
    }
    limpiar();
};

const limpiar = () => {
    document.getElementById("nombre").value = "";
    document.getElementById("ap").value = "";
    document.getElementById("am").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("pass").value = "";
    grecaptcha.reset();
    pass.style.backgroundColor = "white";
    correo.style.backgroundColor = "white";
};


function notify(){
    let nombre = document.getElementById("nombre").value;
    //verificar que el navegador soporta notificaciones 
    if (!("Notification" in window)) {
        Swal.fire({title: "ALGO SALIO MAL", text: "Tu navegador no soporta notificaciones", icon: "error"});

    }else if(Notification.permission === "granted"){
        //Lanzar notificacion si ya fue autorizado el servicio
        const notification = new Notification(`Hola un Gusto saludarte`, {
            icon: 'assets/IMG/LOGO.jpeg',
            body: `Bienvenid@ ${nombre} a este tu nuevo hogar, puede proceder al Login`,
        });

        notification.onclick= function(){
            window.open('http://google.com');
        }

    }else if(Notification.permission !== "denied"){
        Notification.requestPermission(function(permission){

            if(Notification.permission === "granted"){
                var notification = new Notification("Usuario Registrado con exito!");
            }
        });
    }
}

function validarCorreo(correo) {
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    return regex.test(correo.trim());
  }
  
  function validarPassword(password) {
    var regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return regex.test(password.trim());
  }

  pass.onkeydown = () =>{
    let pa = pass.value;
    pass.style.backgroundColor = "none";
    if(validarPassword(pa)){
        pass.style.backgroundColor = "green";
    }else{
        pass.style.backgroundColor = "red";
    }
}

correo.onkeydown = () =>{
    let co = correo.value;
    correo.style.backgroundColor = "none";
    if(validarCorreo(co)){
        correo.style.backgroundColor = "green";
    }else{
        correo.style.backgroundColor = "red";
    }
}
