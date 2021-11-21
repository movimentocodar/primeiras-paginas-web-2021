import listaDeCompra from "../../js/listaDeCompra.js";
const BotaoExcluir = (codigo, indice) => {
  const botaoExcluir = document.createElement("button");
  botaoExcluir.classList.add("carrinho-compras-excluir");
  botaoExcluir.setAttribute("data-produto-comprar", codigo);
  botaoExcluir.setAttribute("data-carrinho-excluir", indice);
  botaoExcluir.addEventListener("click", excluirItem);
  return botaoExcluir;
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

  produto.remove();
  listaDeCompra.removeProdutoDaLista(item);
};

export default BotaoExcluir;
