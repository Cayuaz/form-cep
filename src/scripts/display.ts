import type { Address } from './logic.js';

const errorContainer = document.querySelector('.error-container') as HTMLDivElement;
const errorBtn = errorContainer.querySelector('button') as HTMLButtonElement;
//Cria uma nodeList com todos os inputs que tem o atributo data-input
const inputs = document.querySelectorAll('[data-input]') as NodeListOf<HTMLInputElement>;

//Função que exibe os endereços nos inputs
//Obj precisa ser do tipo Address, afinal displayCep vai acessar as propriedades que existem apenas em objetos desse tipo
function displayCep(obj: Address): void {
  //Transforma a lista criada em um array e a percorre
  Array.from(inputs).forEach((input) => {
    //Pega o atributo de cada input e com base nele exibe o valor correspondente
    const attribute = input.getAttribute('data-input');

    switch (attribute) {
      case 'street':
        input.value = obj.logradouro;
        break;
      case 'district':
        input.value = obj.bairro;
        break;
      case 'city':
        input.value = obj.localidade;
        break;
      case 'uf':
        input.value = obj.uf;
        break;
      default:
        break;
    }
  });
}

//Função que fecha o container com a mensagem de erro
const removeErrorContainer = (): void => {
  errorContainer.classList.remove('display-error-container');
};

//Função que limpa os valores de cada input
function cleanInputs(): void {
  //   const inputs = document.querySelectorAll('[data-input]');
  Array.from(inputs).forEach((input) => {
    input.value = '';
  });
}

//Callback do evento de click do botão de fechar do container de erro
function callbackEventClick(): void {
  removeErrorContainer();
  const cepInput = document.getElementById('cep') as HTMLInputElement;
  cepInput.focus();
  errorBtn.removeEventListener('click', callbackEventClick);
}

//Callback do evento de keyup do botão de fechar do container de erro
function callbackEventKey(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    removeErrorContainer();
    errorBtn.removeEventListener('keyup', callbackEventKey);
  }
}

//Função que exibe o container de erro com a mensagem recebida
function displayError(error: string): void {
  //Limpa todos os inputs assim que é chamada
  cleanInputs();
  const paragraphError = errorContainer.querySelector('p') as HTMLParagraphElement;
  paragraphError.textContent = error;
  errorContainer.classList.add('display-error-container');

  errorBtn.focus();

  errorBtn.addEventListener('click', callbackEventClick);
  errorBtn.addEventListener('keyup', callbackEventKey);
}

export { displayError, displayCep, removeErrorContainer };
