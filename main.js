// 0: nome, 1: img, 2: descr, 3: preço
const arProduct = [
    ["Dolce Gusto Caffé Matinal","dolcegusto-caffematinal.webp","Intensidade 9",23.9],
    ["Dolce Gusto Alpino","dolcegusto-alpino.webp","Intensidade 8",23.9],
    ["Dolce Gusto Caseiro Intenso","dolcegusto-caseirointenso.webp","Intensidade 10",23.9],
    ["Dolce Gusto Au Lait","dolcegusto-aulait.webp","Café com leite",23.9],
    ["Dolce Gusto Espresso","dolcegusto-espresso.webp","Intensidade 8",23.9],
    ["Melitta Sabor da Fazenda","melitta.jpg","Intensidade 7",15.9],
    ["Innovare Tradicional","innovare.jpg","Intensidade 7",15.9],
    ["Nespresso Colombia Espresso","colombiaespresso.jpg","Intensidade 9",25.9],
    ["Nespresso Cafézinho","nespresso-cafezinhodobrasil.webp","Intensidade 5",25.9],
    ["Caneca Sakura Starbucks","caneca01.jpg","Material em cerâmica",55.9],
    ["Caneca Preta","caneca-preta.webp","Material em cerâmica",33.9]    
    ]  

window.onload = function generateProductList() {  

    const contentSection = document.querySelector('[data-content-section]')
    var productContent ='<table>';

    for(var i = 0; i < arProduct.length; i++){
        if ((i % 3) === 0){
            //Primeiro item na linha
            productContent += `<tr><td class="table-prod-space2"></td></tr><td class="table-prod">
            <table><tr><td><img src="imagens/produtos/${arProduct[i][1]}" class="img-prod"></td></tr>
            <tr><td class="prod-name">${arProduct[i][0]}</td></tr>
            <tr><td class="prod-descr">${arProduct[i][2]}</td></tr>
            <tr><td><p class="prod-price">R$ ${arProduct[i][3]}</p></td></tr>
            <tr><td><button id="${arProduct[i]}" class="addcart-button" data-add-cart>Adicionar no carrinho</button></td></tr></table>
            </td><td class="table-prod-space"></td>`;

            if ((i+1) === arProduct.length){
                //Se for último item, última tag
                productContent += `</tr>`;
            }
        } else if (((i+1) % 3) === 0){
            //Terceiro item na linha
            productContent += `<td class="table-prod"><table><tr><td>
            <img src="imagens/produtos/${arProduct[i][1]}" class="img-prod"></td></tr>
            <tr><td class="prod-name">${arProduct[i][0]}</td></tr>
            <tr><td class="prod-descr">${arProduct[i][2]}</td></tr>
            <tr><td class="prod-price">R$ ${arProduct[i][3]}</td></tr>
            <tr><td><button id="${arProduct[i]}" class="addcart-button" data-add-cart>Adicionar no carrinho</button></td>
            </tr></table></td><td class="table-prod-space2"></td></tr>` 
            if ((i+1)<arProduct.length){
                //Se houver nova linha, criar espaço
                productContent += `<tr><td colspan="7" class="table-prod-space"></td></tr>`;
            }
        } else {
            //Segundo item na linha
            productContent += `<td class="table-prod"><table><tr><td>
            <img src="imagens/produtos/${arProduct[i][1]}" class="img-prod"></td></tr>
            <tr><td class="prod-name">${arProduct[i][0]}</td></tr>
            <tr><td class="prod-descr">${arProduct[i][2]}</td></tr>
            <tr><td class="prod-price">R$ ${arProduct[i][3]}</td></tr>
            <tr><td><button id="${arProduct[i]}" class="addcart-button" data-add-cart>Adicionar no carrinho</button></td>
            </tr></table></td><td class="table-prod-space"></td>`;

            if ((i+1) === arProduct.length){
                //Se for último item, última tag
                productContent += `</tr>`;
            }
        }
        
    }
    productContent +='</table>';
    contentSection.innerHTML = productContent;
  };

function AddCart(){
    alert('fui chamado');
}


const ButtonShowCart = (evento) => {
    evento.preventDefault();


    const HiddenCart = document.querySelector('[data-hidden-cart]');
    HiddenCart.style.display = "block";
}


const ButtonHiddenCart = (evento) => {
    evento.preventDefault();

    const HiddenCart = document.querySelector('[data-hidden-cart]');
    HiddenCart.style.display = "none";
}

const ButtonCart = document.querySelector('[data-button-cart]');
ButtonCart.addEventListener('click', ButtonShowCart);

const closeCart = document.querySelector('[data-close-cart]')
closeCart.addEventListener('click', ButtonHiddenCart);

const addCart = document.querySelector('[data-add-cart]')
addCart.addEventListener('click', AddCart);