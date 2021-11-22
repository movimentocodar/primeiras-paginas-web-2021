import listaDeCompra from "../js/listaDeCompra.js";
import BotaoExcluir from "../componentes/botoes/excluirProduto.js";

let valorTotal = 0;
let quantidadeTotal = 0;
const CREDITO = "credido";
const DEBITO = "debito";

const AreaCarrinho = () => {
  const areaCarrinho = document.querySelector("[data-secao-carrinho]");
  const divCarrinho = document.createElement("div");
  divCarrinho.classList.add("carrinho-lista");

  const h3 = document.createElement("h3");
  h3.textContent = "Carrinho";
  divCarrinho.appendChild(h3);

  const ul = document.createElement("ul");
  ul.setAttribute("data-carrinho-lista", "");
  divCarrinho.appendChild(ul);

  const divFinalizar = document.createElement("div");
  divFinalizar.classList.add("compras-carrinho-finalizar");
  divFinalizar.setAttribute("data-compras-carrinho", "");
  divCarrinho.appendChild(divFinalizar);

  const pVazio = document.createElement("p");
  pVazio.classList.add("compras-carrinho-vazio");
  pVazio.setAttribute("data-carrinho-vazio", "");
  pVazio.textContent = "Carrinho Vazio!";
  divFinalizar.appendChild(pVazio);

  const divValorTotal = document.createElement("div");
  divValorTotal.classList.add("compras-carrinho-total");

  const pTotal = document.createElement("p");
  pTotal.textContent = "Valor Total:";
  divValorTotal.appendChild(pTotal);

  const pDataTotal = document.createElement("p");
  pDataTotal.setAttribute("data-carrinho-total", "");
  pDataTotal.textContent = "R$ 0.00";
  divValorTotal.appendChild(pDataTotal);
  divFinalizar.appendChild(divValorTotal);

  const divQuantidade = document.createElement("div");
  divQuantidade.setAttribute("class", "compras-carrinho-total");

  const pQuantidade = document.createElement("p");
  pQuantidade.textContent = "Quantidade Total:";
  divQuantidade.appendChild(pQuantidade);

  const pDataQuantidade = document.createElement("p");
  pDataQuantidade.setAttribute("data-carrinho-quantidade-total", "");
  pDataQuantidade.textContent = "0 und.";
  divQuantidade.appendChild(pDataQuantidade);
  divFinalizar.appendChild(divQuantidade);

  const botaoFinalizarComprar = document.createElement("button");
  botaoFinalizarComprar.setAttribute("class", "card button");
  botaoFinalizarComprar.setAttribute("data-finalizar-compra", "");
  botaoFinalizarComprar.addEventListener(
    "click",
    listaDeCompra.finalizarListaDeCompra
  );
  botaoFinalizarComprar.textContent = "Finalizar";
  botaoFinalizarComprar.addEventListener(
    "click",
    listaDeCompra.finalizarListaDeCompra
  );
  divFinalizar.appendChild(botaoFinalizarComprar);

  areaCarrinho.appendChild(divCarrinho);

  return areaCarrinho;
};

const carregarCarrinho = (
  codigo,
  imagem,
  descricao,
  quantidade,
  preco,
  indice
) => {
  const carrinho = document.querySelector("[data-carrinho-lista]");
  const lista = document.createElement("li");
  lista.setAttribute("class", "carrinho-compras-lista");
  lista.innerHTML = `
            <img src=${imagem} alt=${descricao} class="carrinho-compras-produto">
        <div class="carrinho-compras-item">
           <p class="carrinho-compras-descricao" data-carrinho-produto>${descricao}</p>
           <p data-carrinho-quantidade=${quantidade} class="carrinho-compras-quantidade">Qtd.: ${quantidade} und.</p>
           <p data-carrinho-valor=${preco.toFixed(
             2
           )} class="carrinho-compras-valor">R$${preco.toFixed(2)}</p>
        </div>`;

  lista.appendChild(BotaoExcluir(codigo, indice));
  carrinho.appendChild(lista);
};

const carregarProdutosNoCarrinho = (listaDeCompras) => {
  limparCarrinho();
  listaDeCompras.forEach(listaDeProdutos);
};

function listaDeProdutos(produto, indice) {
  carregarCarrinho(
    produto.codigo,
    produto.imagem,
    produto.descricao,
    produto.quantidade,
    produto.preco,
    indice
  );
  atualizarDadosDoCarrinho(CREDITO, produto.preco, produto.quantidade);
}

const limparCarrinho = () => {
  const carrinho = document.querySelector("[data-carrinho-lista]");
  const carrinhoVazio = document.querySelector("[data-carrinho-vazio]");
  carrinhoVazio.textContent = "Carrinho Vazio!";
  while (carrinho.firstChild) {
    carrinho.removeChild(carrinho.lastChild);
  }

  valorTotal = 0;
  quantidadeTotal = 0;
  atualizarDadosDoCarrinho("", valorTotal, quantidadeTotal);
};

const atualizarDadosDoCarrinho = (movimento, preco, quantidade) => {
  let carrinhoValorTotal = document.querySelector("[data-carrinho-total]");
  let carrinhoQuantidadeTotal = document.querySelector(
    "[data-carrinho-quantidade-total]"
  );
  let carrinhoQuantidadeitens = document.querySelector(
    "[data-carrinho-quantidade-itens]"
  );

  const carrinhoVazio = document.querySelector("[data-carrinho-vazio]");

  if (movimento === CREDITO) {
    valorTotal += parseFloat(preco);
    quantidadeTotal += parseInt(quantidade);
  } else if (movimento === DEBITO) {
    valorTotal -= parseFloat(preco);
    quantidadeTotal -= parseInt(quantidade);
  }

  if (quantidade > 0) {
    carrinhoVazio.textContent = "";
  }

  carrinhoValorTotal.textContent = `R$ ${valorTotal.toFixed(2)}`;
  carrinhoQuantidadeTotal.textContent = `${quantidadeTotal} und.`;
  carrinhoQuantidadeitens.textContent = `${quantidadeTotal}`;
};

export default {
  AreaCarrinho,
  carregarCarrinho,
  carregarProdutosNoCarrinho,
  limparCarrinho,
  atualizarDadosDoCarrinho,
};
