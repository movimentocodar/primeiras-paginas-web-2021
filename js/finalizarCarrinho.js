const botaoFinalizar = document.querySelector('.carrinho--finalizar');

botaoFinalizar.addEventListener('click', function(){
    const produtosCarrinho = document.querySelector('.carrinho--produtos-selecionados');
    while(produtosCarrinho.firstChild){
        produtosCarrinho.removeChild(produtosCarrinho.firstChild);
        const valorTotal = document.querySelector('[data-valor-total]');
        const qtdTotal = document.querySelector('[data-qtd-total]');
        valorTotal.innerHTML = 0.00.toFixed(2);
        qtdTotal.innerHTML = 0;
    }

    const quantidadeListaProdutos = document.querySelectorAll('.lista--produto--quantidade');
    for(let el of quantidadeListaProdutos){
        el.value = 0;
    }    
});

