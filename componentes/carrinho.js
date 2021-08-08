let totalCompra = 0.0
let qtdaItens = 0

let produtosNoCarrinho = {
    'nomeItens' : [],
    'quantidades' : [],
    'precos':[]
}

const totalTexto = document.querySelector('[data-total-compra]')
const totalQtda = document.querySelector('[data-quantidade-total]')
const botaoFinalizar = document.querySelector('[data-form-finalizar]')

export function adicionar(img, nome, preco, quantidade){
    quantidade = quantidade <= 0? 1:quantidade

    var precoFloat = preco.replace('R$: ','')

    if(produtosNoCarrinho.nomeItens.indexOf(nome) == -1){
        totalCompra += (precoFloat * quantidade)

        produtosNoCarrinho.nomeItens.push(nome)
        produtosNoCarrinho.quantidades.push(quantidade)
        produtosNoCarrinho.precos.push(precoFloat)

        const item = document.querySelector('[data-lista-carrinho]')
        const itemTemp = document.createElement('li')
        const conteudo = `<img src=${img.src}>
                <div>
                    <h4>${nome}</h4>
                    <h3>${quantidade}x R$: ${precoFloat}</h3>
                </div>`

        itemTemp.innerHTML = conteudo

        itemTemp.appendChild(botaoRemove())
        item.appendChild(itemTemp)
        calcQtdaETotal()
    }
}

const calcQtdaETotal = ()=>{
    totalCompra = 0.0
    qtdaItens = 0
    for(let i = 0; i < produtosNoCarrinho.nomeItens.length; i++){
        totalCompra += parseFloat(produtosNoCarrinho.precos[i]) * produtosNoCarrinho.quantidades[i]
        qtdaItens += parseInt(produtosNoCarrinho.quantidades[i])
    }
    totalTexto.textContent = `Total: R$: ${totalCompra.toFixed(2)}`
    totalQtda.textContent = `Quantidade total: ${qtdaItens}`
}

const botaoRemove = (event)=>{
    const botao = document.createElement('button')
    botao.id='remover'
    botao.setAttribute('data-remover-carrinho','')

    botao.innerHTML = '<img src="assets/icones/trash.png"></img>'

    botao.addEventListener('click', removerCarrinho)

    return botao
}

const removerCarrinho = (event)=>{
    const botaoRemove = event.target

    const parenteBotao = botaoRemove.parentElement.parentElement

    const divItem = parenteBotao.children.item(1)
    const nomeItem = divItem.children.item(0).textContent

    const indexProd = produtosNoCarrinho.nomeItens.indexOf(nomeItem)

    produtosNoCarrinho.nomeItens.splice(indexProd,1)
    produtosNoCarrinho.quantidades.splice(indexProd,1)
    produtosNoCarrinho.precos.splice(indexProd, 1)

    parenteBotao.remove()
    calcQtdaETotal()
}

const finalizarCompra = (event)=>{
    
    const listaCarrinho = document.querySelector('[data-lista-carrinho]')
    listaCarrinho.innerHTML = ''
    
    const prodLenght = produtosNoCarrinho.nomeItens.length
    produtosNoCarrinho.nomeItens.splice(0,prodLenght)
    produtosNoCarrinho.precos.splice(0,prodLenght)
    produtosNoCarrinho.quantidades.splice(0,prodLenght)

    calcQtdaETotal()
}

botaoFinalizar.addEventListener('click', (event)=>finalizarCompra(event))