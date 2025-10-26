import { displayError, displayCep } from './display.js';

//Type alias para tipar objetos que representam dados de um endereço, como os retornos da API viaCEP
//Define somente as propriedades que serão necessárias na aplicação, visto que existem outras propriedades no retorno da API mencionada
type Address = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

//Função com type predicate que verifica se o parâmetro é um objeto do tipo Address
function isAddress(address: any): address is Address {
  return (
    typeof address === 'object' &&
    address !== null &&
    'cep' in address &&
    typeof address.cep === 'string' &&
    'logradouro' in address &&
    typeof address.logradouro === 'string' &&
    'bairro' in address &&
    typeof address.bairro === 'string' &&
    'localidade' in address &&
    typeof address.localidade === 'string' &&
    'uf' in address &&
    typeof address.uf === 'string'
  );
}

//Funçaõ que faz a requisição dos endereços com base no CEP
//Recebe um tipo genérico para tipar o retorno de fetch e utiliza o type predicate para fazer a verificação
//Assim a função fica mais flexível, sendo necessário apenas a criação de um novo type alias e uma nova função de verificação
async function findCep(cep: string): Promise<Address> {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  //Se os dados estiverem corretos chama response.json e converte os dados
  if (response.ok) {
    const data = await response.json();

    //Se o retorno do fetch não for do Address retorna um erro
    if (!isAddress(data)) {
      throw new Error('CEP não encontrado');
    }

    return data;
  } else {
    throw new Error('Erro na requisição. Verifique sua conexão ou o CEP.');
  }
}

//Função primcipal, que controla a execução com base nos resultados de findCep
async function execute(cep: string): Promise<void> {
  setTimeout(async () => {
    try {
      const addressObj = await findCep(cep);
      //Se findCep não disparar nenhum erro, ele chama a função exibe os endereços
      displayCep(addressObj);
    } catch (error: any) {
      //Caso findCep tenha algum erro, ela intercepta ele e chama a função que exibe o container de erro
      displayError(error.message);
    }
  }, 2000);
}

//Remove quaisquer caracteres que não sejam números do valor digitado no input
const getValidInput = (input: HTMLInputElement) => input.value.replace(/\D/g, '');

//Verifica se a quantidade de caracteres do valor digitado no input é maior que 8
function checkInput(input: HTMLInputElement): boolean {
  const validInput = getValidInput(input);
  return validInput.length === 8;
}

export { checkInput, getValidInput, execute };
export type { Address };
