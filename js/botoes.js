let btn1 = []

function addProduto() {
    btn1 = document.querySelectorAll('[data-btn-compra]').forEach(itens => {
        btn1[0] += itens
    })
    alert(`Caiu ${this.vetor0}`)
}

function finalizar() {

        const limparPrecoCarrinho = document.querySelector('[data-cart-preco-item]').innerHTML = "0.00"
        const limparQtdCarrinho = document.querySelector('[data-cart-qtd-item]').innerHTML = "0"

        if (limparPrecoCarrinho <= 0) {
            alert("Favor, adicionar algum produto ao carrinho.")
        }
        else {
            alert("Compra Realizada!")
            document.location.reload(true)
        }
}