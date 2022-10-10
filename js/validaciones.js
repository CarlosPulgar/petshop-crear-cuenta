
//const inputNacimiento=document.querySelector("#birth");//aqui seleccionamos el input de fecha con el id birth

/*inputNacimiento.addEventListener("blur", (evento)=>{
    validarNacimiento(evento.target);
})
*/
//otra forma de hacer 
 function validar(input){
    const tipoDeInput= input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid){//el validity y valid son caracteristicas que podemos ver en la consola usando el %0 pero antes debemos seleccionar el codigo en elements para asociar el $0 con el elemento seleccionado
        input.parentElement.classList.remove("input-container--invalid");//estamos selleccionando a todos los input ya que estamos sellecionando al contenedor padre de los input que seria el div con clase input-container
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tiposDeError=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajeError={
    nombre:{
        valueMissing:"El campo nombre no debe estar vacio"
    },
    email:{
        valueMissing: "El campo e-mail no debe estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "El campo contraseña no debe estar vacio",
        patternMismatch :"debe contener entre 6 y 12 caracteres, un numero, al menos una letra en mayuscula, una en minuscula y un caracter especial, ejemplo @,#,%"
},
    nacimiento:{
        valueMissing: "Este campo no debe estar vacio",
        customError:"debes tener a lo menos 18 años de edad"
},
    telefono:{
        valueMissing: "Ingrese su numero telefonico",
        patternMismatch:"El formato requerido es de numeros"
},
    direccion:{
        valueMissing: "Ingrese su  direccion",
        patternMismatch:"La direccion debe tener entre 10 y 40 caracteres"
},
    ciudad:{
        valueMissing: "Ingrese su ciudad",
        patternMismatch:"La ciudad debe tener entre 10 y 40 caracteres"
},
    region:{
        valueMissing: "Ingrese su region",
        patternMismatch:"La region debe tener entre 10 y 40 caracteres"
}
}


const validadores={
    nacimiento: input => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje="";
    tiposDeError.forEach((error) => {
        if(input.validity[error]){
            
            mensaje= mensajeError[tipoDeInput][error];
        }
    });
    return mensaje;
}


function validarNacimiento(input){
    const fechaCliente= new Date (input.value);
    let mensaje=""
   if(!mayorDeEdad(fechaCliente)){//la function esta tomando la fecha ingresada por el cliente
        mensaje="debes tener al menos 18 años de edad"//este mensaje aparecera solo si es menor de 18 .si es mayor no aparecera 

}

input.setCustomValidity(mensaje)//este funcion es para que aparezca el mensaje cuando es menor de edad en este caso

}

function mayorDeEdad(fecha){//para comparar la fecha actual con la indicada por el usuario para ver si es mayor de edad
    const fechaActual=new Date();
    
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear()+18,// aca fecha pasa a hacer fechaCliente ya que al llamrla en la function     
        fecha.getUTCMonth(),//validarNacimiento le estamos dando el parametro fechaCliente entonces la fecha indicada
        fecha.getUTCMonth(),//por el cliente se le suman los 18 que indicamos en .getFullYear y asi podemos comparar  
        fecha.getUTCDate()//la fecha del cliente con la actual y poder determinar si es mayor de edad :)
        
    );
    return diferenciaFechas <= fechaActual;
    
}