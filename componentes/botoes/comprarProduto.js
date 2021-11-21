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

  if (botaoComprar.type === "submit") {
    let valorTotalProduto = 0;
    const imagem = produtoImagem.src;
    const descricao = produtoDescricao.textContent;
    const quantidade = produtoQuantidade.value;
    const preco = produtoPreco.textContent.substring(3);
    const codigo = produtoCodigo.getAttribute("data-produto-comprar");

    valorTotalProduto = parseFloat(preco) * parseInt(quantidade);

    const isCodigo = listaDeCompras.some(
      (carrinho) => carrinho.codigo === codigo
    );

    if (isCodigo) {
      listaDeCompras.forEach((carrinho) => {
        if (carrinho.codigo === codigo) {
          carrinho.preco += valorTotalProduto;

          carrinho.quantidade =
            parseInt(carrinho.quantidade) + parseInt(quantidade);
        }
      });
    } else {
      listaDeCompras.push({
        codigo: codigo,
        imagem: imagem,
        descricao: descricao,
        quantidade: quantidade,
        preco: valorTotalProduto,
      });
    }
    carregarProdutosNoCarrinho();
  }
};

const carregarProdutosNoCarrinho = () => {
  limparCarrinho();
  const carrinhoVazio = document.querySelector("[data-carrinho-vazio]");
  carrinhoVazio.textContent = "";
  listaDeCompras.forEach(calcularListaDeCompra);
  carrinhoValorTotal.textContent = `R$ ${valorTotal.toFixed(2)}`;
  carrinhoQuantidadeTotal.textContent = `${quantidadeTotal} und.`;
  carrinhoQuantidadeitens.textContent = `${quantidadeTotal}`;
};

export default BotaoComprar;
