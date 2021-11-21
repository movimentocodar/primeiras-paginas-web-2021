import BotaoComprar from "./botoes/comprarProduto.js";
const CriarProduto = (imagem, descricao, preco, indice) => {
  const listaProdutos = document.querySelector("[data-lista-produtos]");
  const produto = document.createElement("div");
  produto.classList.add("card");
  produto.innerHTML = `
       <div class="card-body">
            <img src=${imagem}  class="card-img-top" alt="${descricao}" data-produto-imagem>
            <p data-produto-descricao>${descricao}</p>
            <p class="card-price" data-produto-preco> R$ ${preco}</p>
            <input type="number"  min="0" max="999" class="card-quantidade" value="1" data-produto-quantidade>  
       </div>`;
  produto.appendChild(BotaoComprar(indice));
  listaProdutos.appendChild(produto);
};

export default CriarProduto;
