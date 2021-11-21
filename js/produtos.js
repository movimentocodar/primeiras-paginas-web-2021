import banco from "./banco.js";
import pesquisarProduto from "../componentes/input/produto.js";
import Mensagem from "../componentes/mensagem.js";
import CriarCard from "../componentes/criarCard.js";

let listaDeCompras = [];
let valorTotal = 0;
let quantidadeTotal = 0;
let carrinhoQuantidadeitens = document.querySelector(
  "[data-carrinho-quantidade-itens]"
);
let navegacao = document.querySelector("[data-navegacao]");

const carregarProdutos = () => {
  banco.forEach((produto, indice) =>
    CriarCard(produto.imagem, produto.descricao, produto.preco, indice)
  );
};

function calcularListaDeCompra(produto, indice) {
  carregarCarrinho(
    produto.codigo,
    produto.imagem,
    produto.descricao,
    produto.quantidade,
    produto.preco,
    indice
  );

  valorTotal += parseFloat(produto.preco);
  quantidadeTotal += parseInt(produto.quantidade);
}

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

const limparCarrinho = () => {
  const carrinho = document.querySelector("[data-carrinho-lista]");
  const carrinhoVazio = document.querySelector("[data-carrinho-vazio]");
  carrinhoVazio.textContent = "Carrinho Vazio!";
  while (carrinho.firstChild) {
    carrinho.removeChild(carrinho.lastChild);
  }
  valorTotal = 0;
  quantidadeTotal = 0;
};

const excluirItem = (evento) => {
  const botaoExcluir = evento.target;

  const produto = botaoExcluir.parentElement;
  const produtoQuantidade = produto.querySelector("[data-carrinho-quantidade]");
  const quantidade = produtoQuantidade.getAttribute("data-carrinho-quantidade");
  const produtoPreco = produto.querySelector("[data-carrinho-valor]");
  const preco = produtoPreco.getAttribute("data-carrinho-valor");
  const itemList = produto.querySelector("[data-carrinho-excluir]");
  const item = itemList.getAttribute("data-produto-comprar");
  valorTotal -= preco;
  quantidadeTotal -= parseInt(quantidade);

  produto.remove();
  removeProdutoDaLista(listaDeCompras, item);
  carrinhoValorTotal.textContent = `R$ ${valorTotal.toFixed(2)}`;
  carrinhoQuantidadeTotal.textContent = `${quantidadeTotal} und.`;
  carrinhoQuantidadeitens.textContent = `${quantidadeTotal}`;
  if (listaDeCompras.length === 0) {
    const carrinhoVazio = document.querySelector("[data-carrinho-vazio]");
    carrinhoVazio.textContent = "Carrinho Vazio!";
  }
};

function removeProdutoDaLista(array, item) {
  let elemento;
  array.forEach((element) => {
    if (element.codigo === item) {
      elemento = element;
    }
  });

  const index = array.indexOf(elemento);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

const filtrarDepartamento = (evento) => {
  const elemento = evento.target;
  const elementoPai = elemento.parentElement;
  const elementoFilho = elementoPai.querySelector("[data-departamento]");
  const departamento = elementoFilho.getAttribute("data-departamento");
  listaPorDeparmento(departamento);
};

function listaPorDeparmento(departamento) {
  let item = [];
  navegacao.textContent = departamento;
  pesquisarProduto.limparProdutos();

  if (departamento === "todos") {
    carregarProdutos();
    return;
  }

  for (let p of banco) {
    if (p.departamento.indexOf(departamento) > -1) {
      item.push(p);
    }
  }

  if (item.length === 0) {
    Mensagem("Produto(s) não encontrado!", "[data-lista-produtos]");
  } else {
    item.forEach((itens, indice) =>
      CriarCard(itens.imagem, itens.descricao, itens.preco, indice)
    );
  }
}

const fecharPedido = (evento) => {
  listaDeCompras.splice(0, listaDeCompras.length);
  limparCarrinho();
  carrinhoValorTotal.textContent = "R$ 0.00";
  carrinhoQuantidadeTotal.textContent = "0 und.";
  carrinhoQuantidadeitens.textContent = 0;
};

const BotaoExcluir = (codigo, indice) => {
  const botaoExcluir = document.createElement("button");
  botaoExcluir.classList.add("carrinho-compras-excluir");
  botaoExcluir.setAttribute("data-produto-comprar", codigo);
  botaoExcluir.setAttribute("data-carrinho-excluir", indice);
  botaoExcluir.addEventListener("click", excluirItem);
  return botaoExcluir;
};

const FiltroDepartamentos = () => {
  const filtroDepartamentos = document.createElement("div");
  const menuDepartamento = document.querySelector("[data-menu-departamento]");

  filtroDepartamentos.innerHTML = `
<ul class="menu__list r-list" data-departamento>
<li class="menu__group"><a href="#0" class="menu__link r-link text-underlined"
        data-departamento="todos">Todos os
        departamentos</a></li>
<li class="menu__group"><a href="#0" class="menu__link r-link text-underlined"
        data-departamento="hortifruti">Hortifruti</a></li>
<li class="menu__group"><a href="#0" class="menu__link r-link text-underlined"
        data-departamento="bebidas">Bebidas</a>
</li>
<li class="menu__group"><a href="#0" class="menu__link r-link text-underlined"
        data-departamento="mercearia">Mercearia</a></li>
<li class="menu__group"><a href="#0" class="menu__link r-link text-underlined"
        data-departamento="padaria">Padaria</a></li>
<li class="menu__group"><a href="#0" class="menu__link r-link text-underlined"
        data-departamento="congelados">Congelados</a></li>
</ul>`;
  menuDepartamento.appendChild(filtroDepartamentos);
  filtroDepartamentos.addEventListener("click", filtrarDepartamento);
  return filtroDepartamentos;
};

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
  pDataQuantidade.setAttribute("data-carrinho-quantidade", "");
  pDataQuantidade.textContent = "0 und.";
  divQuantidade.appendChild(pDataQuantidade);
  divFinalizar.appendChild(divQuantidade);

  const botaoFinalizarComprar = document.createElement("button");
  botaoFinalizarComprar.setAttribute("class", "card button");
  botaoFinalizarComprar.setAttribute("data-finalizar-compra", "");
  botaoFinalizarComprar.addEventListener("click", fecharPedido);
  botaoFinalizarComprar.textContent = "Finalizar";
  botaoFinalizarComprar.addEventListener("click", fecharPedido);
  divFinalizar.appendChild(botaoFinalizarComprar);

  areaCarrinho.appendChild(divCarrinho);

  return areaCarrinho;
};

pesquisarProduto.CriarInput();
FiltroDepartamentos();
carregarProdutos();
AreaCarrinho();
let carrinhoValorTotal = document.querySelector("[data-carrinho-total]");
let carrinhoQuantidadeTotal = document.querySelector(
  "[data-carrinho-quantidade]"
);
