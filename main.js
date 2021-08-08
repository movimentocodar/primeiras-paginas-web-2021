import carregaProdutos from "./componentes/produtos.js"
import { adicionar } from "./componentes/carrinho.js"

function addCarrinho(event, elemento){
    event.preventDefault()

    //consulta grande para coletar o nome do produto em que o botão está
    const imgProduto = elemento.parentElement.parentElement.parentElement.children.item(0)
    const nomeProduto = elemento.parentElement.parentElement.parentElement.children.item(1).textContent
    const precoProduto = elemento.parentElement.parentElement.parentElement.children.item(2).textContent
    const qtda = elemento.previousElementSibling.value

    adicionar(imgProduto, nomeProduto, precoProduto, qtda)
}

carregaProdutos()

const itens = document.querySelectorAll('[data-comprar-prod]');

itens.forEach(element => {
    element.addEventListener('click', (event)=>addCarrinho(event,element))
});

const inputs = document.querySelectorAll('[data-quantidade-prod]')

inputs.forEach(element => {
    element.addEventListener('keydown',(event)=>{
        if(event.keyCode == 13){
            event.preventDefault()
        }
    })
})

