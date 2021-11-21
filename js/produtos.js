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

  carregarProdutos();