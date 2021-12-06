import CriarCard from "../componentes/criarCard.js";
let hugoogle = [
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

const carregarProdutos = () => {
  hugoogle.forEach((produto, indice) =>
    CriarCard(produto.imagem, produto.descricao, produto.preco, indice)
  );
};

export default {
  hugoogle,
  carregarProdutos,
};
