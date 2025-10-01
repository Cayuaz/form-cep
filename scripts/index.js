import {checkInput, getValidInput, execute} from "./logic.js";
import {removeErrorContainer} from "./display.js";

const cepInput = document.getElementById("cep");
const form = document.getElementById("form");

cepInput.addEventListener("input", () => {

    if(checkInput(cepInput)){;

        //Chama a função getValidInput para formatar o valor do input e evitar caracteres que não sejam números
        const validInput = getValidInput(cepInput);
        execute(validInput);
    }

    removeErrorContainer();
})


form.addEventListener("submit", (e) => {
    e.preventDefault()
})