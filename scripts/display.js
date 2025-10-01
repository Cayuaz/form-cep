const errorContainer = document.querySelector(".error-container");
const errorBtn = errorContainer.querySelector("button");

//Função que exibe os endereços nos inputs
function displayCep(obj){
    //Cria uma nodeList com todos os inputs que tem o atributo data-input
    const inputs = document.querySelectorAll("[data-input]");
    //Transforma a lista criada em um array e a percorre
    Array.from(inputs).forEach(input => {
        //Pega o atributo de cada input e com base nele exibe o valor correspondente
        const attribute = input.getAttribute("data-input");

        switch(attribute){
            case "street": 
                input.value = obj.logradouro;
                break;
            case "district":
                input.value = obj.bairro;
                break;
            case "city":
                input.value = obj.localidade;
                break;
            case "uf":
                input.value = obj.uf;
                break;
            default: 
                break;
        }
    })
}

//Função que fecha o container com a mensagem de erro
const removeErrorContainer = () => {
        errorContainer.classList.remove("display-error-container");
        errorBtn.removeEventListener("click", removeErrorContainer);
}

//Função que limpa os valores de cada input
function cleanInputs(){
    const inputs = document.querySelectorAll("[data-input]");
    Array.from(inputs).forEach(input => {;
        input.value = "";
    })
}

//Função que exibe o container de erro com a mensagem recebida
function displayError(error){
    //Limpa todos os inputs assim que é chamada
    cleanInputs()
    const paragraphError = errorContainer.querySelector("p");
    paragraphError.textContent = error;
    errorContainer.classList.add("display-error-container");

    errorBtn.focus();

    errorBtn.addEventListener("click", () => {
        removeErrorContainer();
        const cepInput = document.getElementById("cep");
        cepInput.focus();
    });
}

export {displayError, displayCep, removeErrorContainer};