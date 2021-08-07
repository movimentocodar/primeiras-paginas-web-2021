import {Produto} from './Produto.js';

const primer = new Produto('imagens/produto-primer-anti-poluicao.jpg', 'primer anti poluição vizzela', 49.90);
const cleansing = new Produto('imagens/produto-cleansing-oil.jpg', 'cleansing oil vizzela', 49.90);
const bbCream = new Produto('imagens/produto-bb-cream-vizzela.png', 'bb cream fps 30 vizzela', 59.90);
const baseLiquida = new Produto('imagens/produto-base-liquida-vizzela.png', 'base líquida 01 vizzela', 41.90);
const delineadorColorido = new Produto('imagens/produto-delineador-colorido.png', 'delineador colorido vizzela', 39.90);
const delineadorCatLovers = new Produto('imagens/produto-delineador-marromcat.jpg', 'delineador – cat lovers vizzela', 39.90);
const balmLabial = new Produto('imagens/produto-balm-labial-xoxo.jpg', 'balm labial xoxo fps 20 vizzela', 19.90);
const batomLiquido = new Produto('imagens/produto-batom-liquido-vizzela.jpg', 'batom líquido vizzela', 28.50);

const produtos = [primer, cleansing, bbCream, baseLiquida, delineadorColorido, delineadorCatLovers, balmLabial, batomLiquido];

const listaProdutos = document.querySelector('[data-lista-produtos]');

for(var el of produtos){
    const linhaProduto = document.createElement('li');
    linhaProduto.classList.add('lista--produto');

    const produtoImagem = document.createElement('img');
    produtoImagem.classList.add('lista--produto--imagem');
    produtoImagem.setAttribute('src', el.imagem);

    const produtoNome = document.createElement('h3');
    produtoNome.classList.add('lista--produto--nome');
    produtoNome.textContent = el.nome;

    const produtoPreco = document.createElement('p');
    produtoPreco.classList.add('lista--produto--valor');
    let valor = el.preco;
    produtoPreco.textContent = valor.toFixed(2);

    const produtoQuantidade = document.createElement('input');
    produtoQuantidade.classList.add('lista--produto--quantidade');
    produtoQuantidade.setAttribute('type', 'number');
    produtoQuantidade.setAttribute('min', 0);

    const produtoBtnComprar = document.createElement('input');
    produtoBtnComprar.classList.add('lista--produto--comprar');
    produtoBtnComprar.setAttribute('type', 'submit');
    produtoBtnComprar.setAttribute('value', 'Comprar');

    linhaProduto.appendChild(produtoImagem);
    linhaProduto.appendChild(produtoNome);
    linhaProduto.appendChild(produtoPreco);
    linhaProduto.appendChild(produtoQuantidade);
    linhaProduto.appendChild(produtoBtnComprar);

    listaProdutos.appendChild(linhaProduto);
}


