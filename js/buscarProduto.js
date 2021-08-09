const produtoDigitado = document.querySelector('[data-buscar-produto]');
const nomeProduto = document.querySelectorAll('.lista--produto--nome');

var produtoDig = [];

produtoDigitado.addEventListener('keydown', (evento) =>{
    if(evento.key === "Backspace" || evento.key === "Delete"){
        produtoDig.pop();
    }else{
        produtoDig.push(evento.key);
    }
    let busca = produtoDig.join('');

    let regex = new RegExp(busca);
    for(let el of nomeProduto){
        let textoNomeProduto = el.textContent;
        if(textoNomeProduto.match(regex) != null){
            let match = textoNomeProduto.match(regex);
            encontrarProdutos(match);
        }        
    }    
});

const encontrarProdutos = (match) => {
    const listaProdutos = document.querySelectorAll('.lista--produto--nome');
    let produtosEncontrados = match.input;
    for (let el of listaProdutos){
        if(produtosEncontrados === el.textContent){
            listarProdutosBuscados(el);
        }
    }
}

const listarProdutosBuscados = (nomeProduto) => {
    var produto = nomeProduto.parentNode;
    var listaProdutosOriginal = document.querySelectorAll('.lista--produto');

    for(let el of listaProdutosOriginal){
        if(el == produto){
            el.style.display = 'inline-block';
        }else{
            el.style.display = 'none';
            if(produtoDig.length == 0){
                el.style.display = 'inline-block';
            }
        }        
    }
    
}