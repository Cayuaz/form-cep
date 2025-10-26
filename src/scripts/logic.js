import {displayError, displayCep} from "./display.js";

//Funçaõ que faz a requisição dos endereços com base no CEP
async function findCep(cep){
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        //Se os dados estiverem corretos chama response.json e converte os dados
        if(response.ok){
            const result = await response.json();
            //Verifica se existe alguma propriedade chamada "erro"
            if(result.erro){
                throw new Error("CEP não encontrado");
            }

            return result
        } else {
            throw new Error("Erro na requisição. Verifique sua conexão ou o CEP.");
        }
}

//Função primcipal, que controla a execução com base nos resultados de findCep
async function execute(input){
    setTimeout( async () => {  
            try {
                const addressObj = await findCep(input);
                //Se findCep não disparar nenhum erro, ele chama a função exibe os endereços 
                displayCep(addressObj);
            } catch (error) {
                //Caso findCep tenha algum erro, ela intercepta ele e chama a função que exibe o container de erro 
                displayError(error.message);
            }

    }, 2000)
}

//Remove quaisquer caracteres que não sejam números do valor digitado no input
const getValidInput = input => input.value.replace(/\D/g, "");

//Verifica se a quantidade de caracteres do valor digitado no input é maior que 8
function checkInput(input){

    const validInput = getValidInput(input);
    return validInput.length === 8
}

export {checkInput, getValidInput, execute};