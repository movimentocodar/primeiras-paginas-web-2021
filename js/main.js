import Banco from "./banco.js";
import ConsultaPorProduto from "../componentes/input/produto.js";
import CriarCard from "../componentes/criarCard.js";
import Carrinho from "../componentes/carrinho.js";
import FiltroDepartamentos from "../componentes/filtroDepartamento.js";

const carregarProdutos = () => {
  Banco.hugoogle.forEach((produto, indice) =>
    CriarCard(produto.imagem, produto.descricao, produto.preco, indice)
  );
};

ConsultaPorProduto.CriarInput();
FiltroDepartamentos();
carregarProdutos();
Carrinho.AreaCarrinho();