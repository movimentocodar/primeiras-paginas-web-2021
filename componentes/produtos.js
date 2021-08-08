const listaProdutos = `[{"img":"assets/imagens/alface.png","nome":"Alface", "preco":2.99},
{"img":"assets/imagens/rucula.png","nome":"Rucula", "preco":2.99},
{"img":"assets/imagens/espinafre.png","nome":"Espinafre", "preco":2.99},
{"img":"assets/imagens/cenoura.png","nome":"Cenoura", "preco":2.99}]`



const produtos = JSON.parse(listaProdutos)

const carregaProdutos = (evento)=>{
    const divProdutos = document.querySelector('[data-lista-produtos]')
    produtos.forEach(element => {
        const tempProduto = document.createElement('div')
        tempProduto.classList.add('prod-card')
        

        const conteudo = `
            <img src="${element.img}" alt="Imagem do produto">
            <h3>${element.nome}</h3>
            <h2>R$:${element.preco}</h2>
            <div>
            <label for="quantidade-prod">Quantidade:</label>
            <form>
                <input type="number" data-quantidade-prod>
                <button type="button" data-comprar-prod >Comprar</button>
            </form>
            </div>
        `
        tempProduto.innerHTML = conteudo

        divProdutos.appendChild(tempProduto)


    });
}

export default carregaProdutos
