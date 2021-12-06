import BotaoComprar from "./botoes/comprarProduto.js";
const CriarCard = (imagem, descricao, preco, indice) => {
  const listaProdutos = document.querySelector("[data-lista-produtos]");
  const produto = document.createElement("div");
  produto.classList.add("card");
 
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
 
  const img = document.createElement("img");
   img.setAttribute("src", imagem);
  img.setAttribute("class", "card-img-top");
  img.setAttribute("alt", descricao);
  img.setAttribute("data-produto-imagem", "");
  cardBody.appendChild(img);
 
  const pDescricao = document.createElement("p");
  pDescricao.setAttribute("data-produto-descricao", "");
  pDescricao.textContent = descricao;
  cardBody.appendChild(pDescricao);
 
  const pCardPrice = document.createElement("p");
  pCardPrice.setAttribute("class", "card-price");
  pCardPrice.setAttribute("data-produto-preco", "");
  pCardPrice.textContent = `R$ ${preco}`;
  cardBody.appendChild(pCardPrice);

  const inputQuantidade = document.createElement("input");
  inputQuantidade.setAttribute("type", "number");
  inputQuantidade.setAttribute("min", "1");
  inputQuantidade.setAttribute("max", "9999");
  inputQuantidade.setAttribute("class", "card-quantidade");
  inputQuantidade.setAttribute("value", "1");
  inputQuantidade.setAttribute("data-card", indice);
  inputQuantidade.setAttribute("data-produto-quantidade", indice);
  inputQuantidade.oninput = validaQuantidade;
  inputQuantidade.addEventListener("keypress", somenteNumeros);
  cardBody.appendChild(inputQuantidade);
  
  produto.appendChild(cardBody);
  produto.appendChild(BotaoComprar(indice));
  listaProdutos.appendChild(produto);
};

const validaQuantidade = (e) => {
  const input = e.target;
  if (input.value === "" || input.value <= 0) {
    input.value = 1;
  }
};

const somenteNumeros = (e) => {
  const input = e.target;
  if (e.key === "," || e.key === "." || e.key === "+" || e.key === "-") {
    e.preventDefault();
  }

  if (input.value.length > 3) {
    input.value = input.value.slice(0, 3);
  }
};

export default CriarCard;
