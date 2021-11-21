import banco from "../../js/banco.js";
import Mensagem from "../mensagem.js";
import CriarCard from "../criarCard.js";

const CriarInput = () => {
  const form = document.querySelector("[data-form]");
  const inputBuscarProduto = document.createElement("div");
  inputBuscarProduto.setAttribute("data-form-pesquisa", "");
  inputBuscarProduto.innerHTML = `<input type="search" id="busca" name="busca" data-filtrar-produto
 placeholder="Pesquise por produto..."><svg alt="lupa"></svg>`;
  inputBuscarProduto.addEventListener("input", filtrarProduto);

  form.appendChild(inputBuscarProduto);
  return inputBuscarProduto;
};

const filtrarProduto = (evento) => {
  const texto = evento.target.value;
  let item = [];

  for (let p of banco) {
    if (p.descricao.toLowerCase().indexOf(texto.toLowerCase()) > -1) {
      item.push(p);
    }

    limparProdutos();

    if (item.length === 0) {
      Mensagem("Produto(s) não encontrado!", "[data-lista-produtos]");
    } else {
      item.forEach((itens, indice) =>
        CriarCard(itens.imagem, itens.descricao, itens.preco, indice)
      );
    }
  }
};

const limparProdutos = () => {
  const listaProdutos = document.querySelector("[data-lista-produtos]");
  while (listaProdutos.firstChild) {
    listaProdutos.removeChild(listaProdutos.firstChild);
  }
};

export default {
  CriarInput,
  limparProdutos,
};
