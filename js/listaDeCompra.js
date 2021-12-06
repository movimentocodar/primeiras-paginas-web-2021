import carrinho from "../componentes/carrinho.js";
import mensagem from "../componentes/mensagem.js";
let listaDeCompras = [];

const adicionarProdutoNaLista = (
  codigo,
  imagem,
  descricao,
  quantidade,
  valorTotalProduto
) => {
  const isItemLista = listaDeCompras.some(
    (carrinho) => carrinho.codigo === codigo
  );

  if (isItemLista) {
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

  carrinho.carregarProdutosNoCarrinho(listaDeCompras);
};

const finalizarListaDeCompra = (evento) => {
      mensagem.MensagemDeSucesso("O seu pedido foi enviado com sucesso!", listaDeCompras, carrinho); 
};

function removeProdutoDaLista(item) {
  let elemento;
  let preco;
  let quantidade;
  listaDeCompras.forEach((element) => {
    if (element.codigo === item) {
      elemento = element;
      preco = element.preco;
      quantidade = element.quantidade;
    }
  });

  const index = listaDeCompras.indexOf(elemento);

  if (index !== -1) {
    listaDeCompras.splice(index, 1);
    carrinho.atualizarDadosDoCarrinho("debito", preco, quantidade);
  }

  if (listaDeCompras.length === 0) {
    const carrinhoVazio = document.querySelector("[data-carrinho-vazio]");
    carrinhoVazio.textContent = "Carrinho Vazio!";
  }
}

const listaSemItem = () => {
  listaDeCompras.length === 0;
};

export default {
  adicionarProdutoNaLista,
  finalizarListaDeCompra,
  removeProdutoDaLista,
  listaSemItem,
};
