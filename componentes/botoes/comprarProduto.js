import listaDeCompra from "../../js/listaDeCompra.js";

const BotaoComprar = (codigo) => {
  const botaoComprar = document.createElement("button");
  botaoComprar.setAttribute("data-produto-comprar", codigo);
  botaoComprar.innerText = "Comprar";
  botaoComprar.addEventListener("click", adicionarProduto);
  return botaoComprar;
};

const adicionarProduto = (evento) => {
  const botaoComprar = evento.target;
  const produto = botaoComprar.parentElement;
  const produtoImagem = produto.querySelector("[data-produto-imagem]");
  const produtoDescricao = produto.querySelector("[data-produto-descricao]");
  const produtoQuantidade = produto.querySelector("[data-produto-quantidade]");
  const produtoPreco = produto.querySelector("[data-produto-preco]");
  const produtoCodigo = produto.querySelector("[data-produto-comprar]");

  let valorTotalProduto = 0;
  const imagem = produtoImagem.src;
  const descricao = produtoDescricao.textContent;
  const quantidade = produtoQuantidade.value;
  const preco = produtoPreco.textContent.substring(3);
  const codigo = produtoCodigo.getAttribute("data-produto-comprar");

  valorTotalProduto = parseFloat(preco) * parseInt(quantidade);

  listaDeCompra.adicionarProdutoNaLista(
    codigo,
    imagem,
    descricao,
    quantidade,
    valorTotalProduto
  );
};

export default BotaoComprar;
