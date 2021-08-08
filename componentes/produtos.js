import listaProdutos from "./listaProdutos.js"

const produtos = JSON.parse(listaProdutos)

const carregaProdutos = (evento)=>{
    const divProdutos = document.querySelector('[data-lista-produtos]')
    produtos.forEach(element => {
        const tempProduto = document.createElement('div')
        tempProduto.classList.add('prod-card')
        

        const conteudo = `
            <img src="${element.img}" alt="Imagem do produto">
            <h3>${element.nome}</h3>
            <h2>R$: ${element.preco}</h2>
            <div>
                <label for="quantidade-prod">Quantidade:</label>
                <form>
                    <input type="number" data-quantidade-prod value="0">
                    <button type="button" data-comprar-prod>Comprar</button>
                </form>
            </div>
        `
        tempProduto.innerHTML = conteudo

        divProdutos.appendChild(tempProduto)


    });
}

export default carregaProdutos 
