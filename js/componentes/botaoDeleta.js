const BotaoDeleta = () => {
    const botaoDeleta =document.createElement('button')
    botaoDeleta.innerText = 'x'
    botaoDeleta.classList.add('delete')
    botaoDeleta.addEventListener('click', deletarItem)
    return botaoDeleta
}

const removePreco = (valor) =>{
    const cartPreco = document.querySelector('[data-cart-item-preco]')
    cartPreco.innerHTML = `${parseInt(cartPreco.textContent)-parseInt(valor)},00`
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