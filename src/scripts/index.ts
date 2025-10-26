import { checkInput, getValidInput, execute } from './logic.js';
import { removeErrorContainer } from './display.js';

const cepInput = document.getElementById('cep') as HTMLInputElement;
const form = document.getElementById('form') as HTMLFormElement;

cepInput.addEventListener('input', () => {
  if (checkInput(cepInput)) {
    //Chama a função getValidInput para formatar o valor do input e evitar caracteres que não sejam números
    const validCep = getValidInput(cepInput);
    execute(validCep);
  }

  //Limpa os containers de error que estão na tela quando o usuário está digitando
  //Evita que ele precise fechar manualmente o container
  //E não atrapalha com as próximas requisições por causa do setTimeout, ou seja o container é primeiro limpo e só depois o resultado do fetch vem
  removeErrorContainer();
});

form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
});
