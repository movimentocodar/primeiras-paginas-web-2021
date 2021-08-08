const BotaoFinalizar = () => {
    const clearCartList = document.querySelector('[data-carrinho-item]').innerHTML= "";
    const cartPreco = document.querySelector('[data-cart-item-preco]').innerHTML = "0,00"
    const cartQuant = document.querySelector('[data-item-quantidade]').innerHTML = "0"
}

const BotaoDeleta = () => {
    const botaoDeleta =document.createElement('button')
    botaoDeleta.innerText = 'x'
    botaoDeleta.classList.add('delete')
    botaoDeleta.addEventListener('click', deletarItem)
    return botaoDeleta
}

const addPreco = (valor, quantidade) =>{
    const cartPreco = document.querySelector('[data-cart-item-preco]')
    cartPreco.innerHTML = `${(parseInt(valor)*parseInt(quantidade))+parseInt(cartPreco.textContent)},00`
    return `${(parseInt(valor)*parseInt(quantidade))}`
}

const removePreco = (valor) =>{
    const cartPreco = document.querySelector('[data-cart-item-preco]')
    cartPreco.innerHTML = `${parseInt(cartPreco.textContent)-parseInt(valor)},00`

}

const addQuantidade = (qnt) =>{
    const cartQuant = document.querySelector('[data-item-quantidade]')
    cartQuant.innerHTML = `${parseInt(cartQuant.textContent)+parseInt(qnt)}`
}

const removeQuantidade = (qnt) =>{
    const cartQuant = document.querySelector('[data-item-quantidade]')
    cartQuant.innerHTML = `${parseInt(cartQuant.textContent)-parseInt(qnt)}`

}

const deletarItem = (evento) => {
    const botaoDeleta = evento.target;
    const cartItem = botaoDeleta.parentElement;
    const dataValue = cartItem.querySelector('[data-value]')
    const qnt = cartItem.querySelector('[data-qnt]')

    removePreco(dataValue.textContent)
    removeQuantidade(qnt.textContent)
    
    cartItem.remove()
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

const searchInput = document.querySelector('[data-search]')
searchInput.addEventListener('input', () =>{
    const itemName = document.querySelectorAll('.item-name').forEach(item => {
        const nameList = item.textContent.toLowerCase()
        const inputValue = searchInput.value.toLowerCase()
        if (!nameList.includes(inputValue)){
            item.parentElement.style.display = 'none';
        }else{
            item.parentElement.style.display = '';
        }
    })
})

const finalize = document.querySelector('[data-finalizar-cart]');
finalize.addEventListener('click', BotaoFinalizar);
