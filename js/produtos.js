let banco = [
  {
    imagem: "./imagens/produtos/arroz.jpg",
    descricao: "Arroz",
    preco: "20.00",
    departamento: "mercearia",
  },
  {
    imagem: "./imagens/produtos/coca-cola.jpg",
    descricao: "Coca-cola",
    preco: "12.00",
    departamento: "bebidas",
  },
  {
    imagem: "./imagens/produtos/cream-cracker.jpeg",
    descricao: "Cream-cracker",
    preco: "7.50",
    departamento: "mercearia",
  },
  {
    imagem: "./imagens/produtos/frutas.jpeg",
    descricao: "Frutas",
    preco: "3.99",
    departamento: "hortifruti",
  },
  {
    imagem: "./imagens/produtos/mems.jpg",
    descricao: "Mms",
    preco: "10.00",
    departamento: "mercearia",
  },
  {
    imagem: "./imagens/produtos/rosquinha-coco.jpg",
    descricao: "Roquinha coco",
    preco: "8.65",
    departamento: "mercearia",
  },
  {
    imagem: "./imagens/produtos/sadia-lasanha-frango.jpg",
    descricao: "Sadia lasanha frango",
    preco: "14.80",
    departamento: "congelados",
  },
  {
    imagem: "./imagens/produtos/vinhos.jpeg",
    descricao: "Vinhos",
    preco: "72.00",
    departamento: "bebidas",
  },
];

let listaDeCompras = [];
let valorTotal = 0;
let quantidadeTotal = 0;
let carrinhoValorTotal = document.querySelector("[data-carrinho-total]");
let carrinhoQuantidadeTotal = document.querySelector(
  "[data-carrinho-quantidade]"
);
let carrinhoQuantidadeitens = document.querySelector(
  "[data-carrinho-quantidade-itens]"
);

const criarProduto = (imagem, descricao, preco, indice) => {
  const listaProdutos = document.querySelector("[data-lista-produtos]");
  const produto = document.createElement("div");
  produto.classList.add("card");
  // produto.setAttribute("style", "width:100%;");
  produto.innerHTML = `
     <div class="card-body">
          <img src=${imagem}  class="card-img-top" alt="${descricao}" data-produto-imagem>
          <p data-produto-descricao>${descricao}</p>
          <p class="card-price" data-produto-preco> R$ ${preco}</p>
          <input type="number"  min="0" max="999" class="card-quantidade" value="1" data-produto-quantidade>  
          <button type="button" data-produto-comprar=${indice} >Comprar</button>
     </div>`;
  listaProdutos.appendChild(produto);
};

const carregarProdutos = () => {
  banco.forEach((produto, indice) =>
    criarProduto(produto.imagem, produto.descricao, produto.preco, indice)
  );
};

const adicionarProduto = (evento) => {
  const elemento = evento.target;

  const produto = elemento.parentElement;

  const produtoImagem = produto.querySelector("[data-produto-imagem]");
  const produtoDescricao = produto.querySelector("[data-produto-descricao]");
  const produtoQuantidade = produto.querySelector("[data-produto-quantidade]");
  const produtoPreco = produto.querySelector("[data-produto-preco]");
  const produtoCodigo = produto.querySelector("[data-produto-comprar]");

  if (elemento.type === "button") {
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
          console.log(`codigo encontrado ${codigo}`);
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
  carrinhoQuantidadeTotal.textContent = `${quantidadeTotal}`;
  carrinhoQuantidadeitens.textContent = `${quantidadeTotal}`;
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

carregarCarrinho = (codigo, imagem, descricao, quantidade, preco, indice) => {
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
      </div>
  
          <button type="button" class="carrinho-compras-excluir" data-produto-comprar=${codigo} data-carrinho-excluir=${indice}></button>`;

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

carregarProdutos();
const comprarProduto = document.querySelector("[data-lista-produtos]");
comprarProduto.addEventListener("click", adicionarProduto);