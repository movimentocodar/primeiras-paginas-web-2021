import carregaProdutos from "./produtos.js"

function iniciarLista(){
    carregaProdutos()
}

function addCarrinho(event, elemento){
    event.preventDefault()
    
}

iniciarLista()

const itens = document.querySelectorAll('[data-comprar-prod]');

itens.forEach(element => {
    element.addEventListener('click', (event)=>addCarrinho(event,element.parentNode))
});