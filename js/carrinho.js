const comprar = document.querySelectorAll(".lista--produto--comprar");
let valorTotal = 0;
let qtdTotal = 0;

for(var el of comprar){
    el.addEventListener('click', function(){
        const produtoSelecionado = this.parentNode;
        const quantidade = produtoSelecionado.querySelector('.lista--produto--quantidade').value;
        if(quantidade <= 0){
            alert('Selecione uma quantidade para este produto.')
        }else{
            inserirProdutoCarrinho(produtoSelecionado);
            quantidade = '';
        }        
    });
}

function inserirProdutoCarrinho(produto){
    const produtoImage = produto.querySelector('.lista--produto--imagem').src;
    const produtoNome = produto.querySelector('.lista--produto--nome').textContent;
    const produtoPreco = produto.querySelector('.lista--produto--valor').textContent;
    const produtoQtd = produto.querySelector('.lista--produto--quantidade').value;

    const htmlPreco = document.querySelector('[data-valor-total]');
    const htmlQtd = document.querySelector('[data-qtd-total]');

    const lista = document.querySelector('.carrinho--produtos-selecionados');

    const novaLinha = document.createElement('li');
    novaLinha.classList.add('produto-selecionado');

    const produtoImagemCarrinho = document.createElement('img');
    produtoImagemCarrinho.classList.add('produto-selecionado--imagem');
    produtoImagemCarrinho.src = produtoImage;

    const btnDeletar = document.createElement('img');
    btnDeletar.classList.add('produto-selecionado--deletar');
    btnDeletar.src = "imagens/close.png";

    btnDeletar.addEventListener('click', function(){
        const linha = this.parentNode;
        valorTotal -= parseFloat(produtoPreco) * parseFloat(produtoQtd);
        qtdTotal -= parseInt(produtoQtd);

        htmlPreco.innerHTML = valorTotal.toFixed(2);
        htmlQtd.innerHTML = qtdTotal;

        linha.remove();
    });

    const produtoNomeCarrinho = document.createElement('h4');
    produtoNomeCarrinho.classList.add('produto-selecionado--titulo');
    produtoNomeCarrinho.textContent = produtoNome;

    const produtoQtdCarrinho = document.createElement('p');
    produtoQtdCarrinho.classList.add('produto-selecionado--quantidade');
    produtoQtdCarrinho.textContent = `Quantidade: ${produtoQtd}`;    

    calcularCarrinho(produtoPreco, produtoQtd);    

    htmlPreco.innerHTML = valorTotal.toFixed(2);
    htmlQtd.innerHTML = qtdTotal;

    novaLinha.appendChild(produtoImagemCarrinho);
    novaLinha.appendChild(btnDeletar);
    novaLinha.appendChild(produtoNomeCarrinho);
    novaLinha.appendChild(produtoQtdCarrinho);
    lista.appendChild(novaLinha);    
}


function calcularCarrinho(produtoPreco, produtoQtd){
    valorTotal += parseFloat(produtoPreco) * parseFloat(produtoQtd);
    qtdTotal += parseInt(produtoQtd);
}