//error container function
//input cep event
//check input cep value
//fetch cep
//iteration of result cep
//Iterar os inputs com o atributo data-input, e pegar o atributo de cada um deles para usar no switch e colocar o valor certinho com base no obj retornado pelo fetch

// function checkObj(obj){
//     for(prop in obj){
//         const propValue = obj[prop]
//         if(propValue === "undefined" || propValue === null){
//             return false
//         }  
//     }
//     return true
// }

function displayCep(obj){
    const inputs = document.querySelectorAll("[data-input]")
    Array.from(inputs).forEach(input => {
        const attribute = input.getAttribute("data-input")

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

async function findCep(cep){
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        if(response.ok){
            const result = await response.json()
            console.log(result)
            if(result.erro){
                throw new Error("CEP não encontrado")  
            }

            return result
        } else {
            throw new Error("Erro na requisição. Verifique sua conexão ou o CEP.")    
        }
}

// function getCep(input){
//     const [part1, part2] = input.value.split("-")
//     const cepString = part1 + part2
//     return parseInt(cepString)
// }

const errorContainer = document.querySelector(".error-container");
const errorBtn = errorContainer.querySelector("button");

const removeErrorContainer = () => {
        errorContainer.classList.remove("display-error-container");
        errorBtn.removeEventListener("click", removeErrorContainer)
}

function displayError(error){
    const paragraphError = errorContainer.querySelector("p")
    paragraphError.textContent = error
    errorContainer.classList.add("display-error-container");

    errorBtn.focus();

    errorBtn.addEventListener("click", () => {
        removeErrorContainer()
    });
}

async function execute(input){
    setTimeout( async () => {  
            try {

                const addressObj = await findCep(input)
                console.log(addressObj)
                displayCep(addressObj)
                
                console.log("teste de execute");
            } catch (error) {
                displayError(error.message);
            }

    }, 2000)
}

const getValidInput = input => input.value.replace("-", "").trim() 

function checkInput(input){

    const validInput = getValidInput(input)
    if(validInput.length === 8){
        return true
    } else {
        false
    }

}
   
const cepInput = document.getElementById("cep")



cepInput.addEventListener("input", () => {

    if(checkInput(cepInput)){
        //Remove o traço para não passar um input com um valor estranho mesmo que ele passe na verficação
        const validInput = getValidInput(cepInput)
        execute(validInput);
    }

    removeErrorContainer()
})

const form = document.getElementById("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
})