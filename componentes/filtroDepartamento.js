import Banco from "../js/banco.js";
import ConsultaPorProduto from "../componentes/input/produto.js";
import CriarCard from "../componentes/criarCard.js";
import Mensagem from "./mensagem.js";
import InputProduto from "./input/produto.js";

const filtrarDepartamento = (evento) => {
  const elemento = evento.target;
  const elementoPai = elemento.parentElement;
  const elementoFilho = elementoPai.querySelector("[data-departamento]");
  const departamento = elementoFilho.getAttribute("data-departamento");
  listaPorDeparmento(departamento);
};

function listaPorDeparmento(departamento) {
  const navegacao = document.querySelector("[data-navegacao]");
  let item = [];
  navegacao.textContent = departamento;
  ConsultaPorProduto.limparProdutos();
  InputProduto.limparCampo();

  if (departamento === "todos") {
    Banco.carregarProdutos();
    return;
  }

  for (let p of Banco.hugoogle) {
    if (p.departamento.indexOf(departamento) > -1) {
      item.push(p);
    }
  }

  if (item.length === 0) {
    Mensagem.MensagemPorParametro("Produto(s) não encontrado!", "[data-lista-produtos]");
  } else {
    item.forEach((itens, indice) =>
      CriarCard(itens.imagem, itens.descricao, itens.preco, indice)
    );
  }
}

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

export default FiltroDepartamentos;
