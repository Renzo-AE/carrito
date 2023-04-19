const box = document.getElementById('box');
const btnCambiar =  document.getElementById('btn-cambiar');
let cont = 1 ;

btnCambiar.addEventListener('click', () => {
    box.classList.toggle('box-blue');
    /*if(cont == 1){
        box.classList.add('box-blue');
        console.log('holaaaaaaaaaaa')
        cont = 0;
    }else{
        box.classList.remove('box-blue');
        console.log('holaaaaaaaaaaa');
        cont = 1;
    }*/
})


// Programa de calculadora

const operation = (operador, num1, num2) => {
    if(operador == 'suma'){
        return num1 + num2;
    }else if(operador == 'resta'){
        return num1 - num2;
    }else if(operador == 'multiplicar'){
        return num1 * num2;
    }else if(operador == 'dividir'){
        return num1 / num2;
    }
}

const containerResponse = document.getElementById('response')

const btnOption = document.querySelectorAll('#operador');
console.log(btnOption);

btnOption.forEach((option) => {
    option.addEventListener('click', () => {
        const operador = option.value;
        const num1 = parseFloat(document.getElementById('date-1').value); 
        const num2 = parseFloat(document.getElementById('date-2').value); 

        const resultado = operation(operador, num1, num2)
        containerResponse.innerHTML= resultado;
    })
})


