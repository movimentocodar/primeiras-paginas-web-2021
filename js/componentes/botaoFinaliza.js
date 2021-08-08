const BotaoFinalizar = () => {
    const clearCartList = document.querySelector('[data-carrinho-item]').innerHTML= "";
    const cartPreco = document.querySelector('[data-cart-item-preco]').innerHTML = "0,00"
    const cartQuant = document.querySelector('[data-item-quantidade]').innerHTML = "0"
}

const finalize = document.querySelector('[data-finalizar-cart]');
finalize.addEventListener('click', BotaoFinalizar);