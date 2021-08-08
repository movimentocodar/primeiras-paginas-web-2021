import carregaProdutos from "./componentes/produtos.js"
import { adicionar } from "./componentes/carrinho.js"
import exibeProdutoPesquisado from "./componentes/barraPesquisa.js"

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

const barra = document.querySelector('[data-form-produto]')

barra.addEventListener('input', function (evt) {
    let pesquisa = this.value
    exibeProdutoPesquisado(pesquisa)
});

barra.addEventListener('keydown',(event)=>{
    if(event.keyCode == 13){
        event.preventDefault()
    }
})

export default addCarrinho