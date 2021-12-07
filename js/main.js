const addPreco = (valor, quantidade) =>{
    const cartPreco = document.querySelector('[data-cart-item-preco]')
    cartPreco.innerHTML = `${(parseInt(valor)*parseInt(quantidade))+parseInt(cartPreco.textContent)},00`
    return `${(parseInt(valor)*parseInt(quantidade))}`
}

const addQuantidade = (qnt) =>{
    const cartQuant = document.querySelector('[data-item-quantidade]')
    cartQuant.innerHTML = `${parseInt(cartQuant.textContent)+parseInt(qnt)}`
}

const addCartEvent = document.querySelectorAll('[data-comprar-button]').forEach(item => {
    item.addEventListener('click', event => {
        const carrinho = document.querySelector('[data-carrinho-item]');
        const image = item.parentElement.querySelector('[data-img-item]');
        const nome = item.parentElement.querySelector('span.item-name').textContent;
        const valor = item.parentElement.querySelector('[data-item-preco]').textContent;
        const quantidade = item.parentElement.querySelector('input.item-input').value;
        const itemPreco = addPreco(valor, quantidade);
        addQuantidade(quantidade);
        const tarefa = document.createElement('div');
        tarefa.classList.add('carrinho-item');
        const conteudo =   `<img src="${image.src}">
                            <div>
                                <span>${nome}</span><br>
                                quantidade: <span data-qnt>${quantidade}</span><span data-value class="item-value">${itemPreco}</span>
                            </div>`
        tarefa.innerHTML = conteudo;
        tarefa.appendChild(BotaoDeleta())
        carrinho.appendChild(tarefa);
    })
})