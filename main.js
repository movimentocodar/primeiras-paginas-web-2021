//Variáveis e constantes

// 0: nome, 1: img, 2: descr, 3: preço
const arProduct = [
    ["Dolce Gusto Caffé Matinal","dolcegusto-caffematinal.webp","Intensidade 9",23.9],
    ["Dolce Gusto Alpino","dolcegusto-alpino.webp","Intensidade 8",23.9],
    ["Dolce Gusto Caseiro Intenso","dolcegusto-caseirointenso.webp","Intensidade 10",23.9],
    ["Dolce Gusto Au Lait","dolcegusto-aulait.webp","Café com leite",23.9],
    ["Dolce Gusto Espresso","dolcegusto-espresso.webp","Intensidade 8",23.9],
    ["Melitta Sabor da Fazenda","melitta.jpg","Intensidade 7",15.9],
    ["Innovare Tradicional","innovare.jpg","Intensidade 7",15.9],
    ["Nespresso Colombia","colombiaespresso.jpg","Intensidade 9",25.9],
    ["Nespresso Cafézinho","nespresso-cafezinhodobrasil.webp","Intensidade 5",25.9],
    ["Caneca Sakura Starbucks","caneca01.jpg","Material em cerâmica",55.9],
    ["Caneca Preta","caneca-preta.webp","Material em cerâmica",33.9]    
    ]  

//Procura e adiciona evento

function findAndAddEvent(dataName, eventType, functionName){
    const objList = document.querySelectorAll('[' + dataName + ']');

    for (const eachObj of objList) {
        eachObj.addEventListener(eventType, functionName);
    }
}

function editProd(newQty, targetID){
    if(sessionStorage.getItem("Cart")){
        var arCart = JSON.parse(sessionStorage.getItem("Cart"));

        for(var i = 0; i < arCart.length; i++){
            if(arCart[i].ID === targetID){
                if(newQty === -100){
                    if(arCart[i].Qty === 15){
                        alert("Limite de 15 unidades por cliente.");
                        newQty = 15;
                    }else{
                        newQty = arCart[i].Qty + 1;
                    }
                } else if(newQty === 0) {
                    delProdTrashCan(targetID);
                    return;
                }

                arCart[i].Qty = newQty;
                window.sessionStorage.setItem("Cart", JSON.stringify(arCart));

                updateCart();
            }
        }
    }
}

function buildCart(){
    if(sessionStorage.getItem("Cart")){
        var arCart = JSON.parse(sessionStorage.getItem("Cart"));

        for (var i = 0; i < arCart.length; i++) {
            const tdCartContent = document.querySelector('[data-cart-content]');

            if(i == 0){
                tdCartContent.innerHTML = "";
                const divCartButtons = document.querySelector('[data-div-cart-buttons]');
                divCartButtons.style.display = "block";
            }
            
            if (i <= 1){
                var popupCartContent = `<table><tr><td colspan="2" class="prod-name-cart">${arProduct[arCart[i].ID][0]}</td></tr>
                <tr><td class="prod-cart"><img src="imagens/produtos/${arProduct[arCart[i].ID][1]}" class="img-prod-cart"></td>
                <td class="prod-cart-add"><input id="${arCart[i].ID}" class="input-prod-qty-cart" type="number" value="1" data-input-prod />
                <input type="image" id="${arCart[i].ID}" class="add-prod-qty" src="imagens/add.png" data-btn-add-prod /></td></tr>
                <tr><td colspan="2" class="prod-descr-cart"><p id="${arCart[i].ID}" class="prod-qty" data-cart-qty>1 un.</p>
                <p id="${arCart[i].ID}" class="prod-price-cart" data-cart-price>R$ ${arProduct[arCart[i].ID][3]}</p>
                <input type="image" id="${arCart[i].ID}" class="del-prod-cart" src="imagens/trash-can.png" data-btn-del-prod />
                </td></tr><tr><td colspan="2"><div class="cart-line"></div></td></tr></table>`;

                tdCartContent.innerHTML += popupCartContent;
            } else {
                break;
            }
        }

        findAndAddEvent("data-btn-add-prod", "click", addProd);
        findAndAddEvent("data-btn-del-prod", "click", delProd);
        findAndAddEvent("data-input-prod", "change", editProdInput);

        updateCart();
    }
}

function delProdTrashCan(targetID){

    if(sessionStorage.getItem("Cart")){
        var arCart = JSON.parse(sessionStorage.getItem("Cart")),
        deletedIndex = 0;

        for (var i = 0; i < arCart.length; i++) {
            if (arCart[i].ID === targetID){
                deletedIndex = i;
                arCart.splice(i, 1);
                console.log(arCart);
            }
        }

        window.sessionStorage.setItem("Cart", JSON.stringify(arCart));

        if(arCart.length === 0){
            resetSessionCart();
        } else {
            var tdProdContent = "";
        
            const objList = document.querySelectorAll('[data-opt-prod]');
            console.log(objList);
            console.log(targetID);
            for (const eachObj of objList) {
                if (eachObj.id == (targetID).toString()){
                    console.log(eachObj.id);
                    tdProdContent = `<button id="${targetID}" class="addcart-button" data-add-cart>Adicionar no carrinho</button>`;
                    eachObj.innerHTML = tdProdContent;
                }
            } 

            findAndAddEvent("data-add-cart", "click", addCart);

            if(deletedIndex < 2){
                buildCart();
            }else{
                updateCart();              
            }
        }
    }
}

function resetSessionCart(){
    if(sessionStorage.getItem("Cart")){
        var tdProdContent = "";
        
        const objList = document.querySelectorAll('[data-opt-prod]');
        for(var i = 0; i < arProduct.length; i++){
            tdProdContent = `<button id="${i}" class="addcart-button" data-add-cart>Adicionar no carrinho</button>`;
            objList[i].innerHTML = tdProdContent;
        }

        const tdCartContent = document.querySelector('[data-cart-content]');
        tdCartContent.innerHTML = "Não há nada no carrinho";
        const divCartButtons = document.querySelector('[data-div-cart-buttons]');
        divCartButtons.style.display = "none";
        const pCartNumber = document.querySelector('[data-cart-number]');
        pCartNumber.innerHTML = "0";

        const divCartQtd = document.querySelector('[data-cart-qtd]');
        divCartQtd.innerHTML = "";
        divCartQtd.style.display = "block";
    
        window.sessionStorage.removeItem("Cart");
        
        findAndAddEvent("data-add-cart", "click", addCart);
    }
}

function updateCart(){
    
    if(sessionStorage.getItem("Cart")){
        var arCart = JSON.parse(sessionStorage.getItem("Cart")),
        totalPr = 0,
        totalItem = 0,
        qtyItem = 0;

        const objList = document.querySelectorAll('[data-input-prod]'), 
        objList2 = document.querySelectorAll('[data-cart-qty]'),
        objList3 = document.querySelectorAll('[data-cart-price]');

        for(var i = 0; i < arCart.length; i++){
            qtyItem = parseInt(arCart[i].Qty);
            totalItem += qtyItem;
            arCart[i].Pr = parseFloat(arProduct[arCart[i].ID][3]) * parseFloat(arCart[i].Qty);
            totalPr += arCart[i].Pr;

            for (const eachObj of objList) {
                if (eachObj.id === arCart[i].ID){
                    eachObj.value = arCart[i].Qty;
                }
            }   
            
            if (i <= 1){     
                objList2[i].innerHTML = arCart[i].Qty.toString() + " un.";
                objList3[i].innerHTML = addRS(parseFloat(arCart[i].Pr));
            }    
        }

        window.sessionStorage.setItem("Cart", JSON.stringify(arCart));

        const pCartNumber = document.querySelector('[data-cart-number]');
        pCartNumber.innerHTML = totalItem.toString();

        const pTotalPrice = document.querySelector('[data-total-price]');
        pTotalPrice.innerHTML = addRS(parseFloat(totalPr));
         
        const divCartQtd = document.querySelector('[data-cart-qtd]');
        if(arCart.length > 2){
            var totalDisplay = 0,
            qtyTotalDisplay = 0,
            strQtyTotalDisplay = "";
    
            totalDisplay = parseInt(arCart[0].Qty) + parseInt(arCart[1].Qty);
        
            qtyTotalDisplay = totalItem - totalDisplay;
            strQtyTotalDisplay = qtyTotalDisplay > 1? " itens" : " item";
            divCartQtd.innerHTML = "+ " + qtyTotalDisplay.toString() + strQtyTotalDisplay;
            divCartQtd.style.display = "block";
        } else{
            divCartQtd.style.display = "none";
        }
    }
}

function addRS(price) {
    return "R$ " + price.toFixed(2).toString();
}

//Gerar lista de produtos
window.onload = function generateProductList() {  

    if(sessionStorage.getItem("Cart")){
        window.sessionStorage.removeItem("Cart");
    }

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
            <tr><td id="${i}" data-opt-prod><button id="${i}" class="addcart-button" data-add-cart>Adicionar no carrinho</button></td></tr></table>
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
            <tr><td id="${i}" data-opt-prod><button id="${i}" class="addcart-button" data-add-cart>Adicionar no carrinho</button></td>
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
            <tr><td id="${i}" data-opt-prod><button id="${i}" class="addcart-button" data-add-cart>Adicionar no carrinho</button></td>
            </tr></table></td><td class="table-prod-space"></td>`;

            if ((i+1) === arProduct.length){
                //Se for último item, última tag
                productContent += `</tr>`;
            }
        }
        
    }
    productContent +='</table>';
    contentSection.innerHTML = productContent;

    findAndAddEvent("data-add-cart", "click", addCart);
};

//Evento do botão Adicionar no carrinho
const addCart = (evento) => {
    evento.preventDefault();
    
    var tdProdContent = `<input id="${evento.target.id}" type="number" value="1" class="input-prod-qty" data-input-prod />
    <input type="image" id="${evento.target.id}" class="add-prod-qty" src="imagens/add.png" data-btn-add-prod />
    <input type="image" id="${evento.target.id}" class="del-prod" src="imagens/trash-can.png" data-btn-del-prod />`;
    
    evento.target.parentNode.innerHTML = tdProdContent;

    //Verificar se já existe algo no carrinho, adiciona item, quantidade.
    if (sessionStorage.getItem("Cart")){
        var arCart = JSON.parse(sessionStorage.getItem("Cart"));
        arCart.push({ID:evento.target.id, Qty:1, Pr:arProduct[evento.target.id][3]});
    } else {
        var arCart = [{ID:evento.target.id, Qty:1, Pr:arProduct[evento.target.id][3]}];
    }

    window.sessionStorage.setItem("Cart", JSON.stringify(arCart));

    buildCart();
}

//Evento do botão +
const addProd = (evento) => {
    evento.preventDefault();
    editProd(-100, evento.target.id);
}

//Evento do botão lixeira
const delProd = (evento) => {
    evento.preventDefault();
    delProdTrashCan(evento.target.id);
}

//Evento de alteração do input de quantidade de itens
const editProdInput = (evento) => {
    evento.preventDefault();

    var thisValue = evento.target.value;
    var reg = new RegExp('[0-9](([0-8](\.[0-9]*)?)|[0-9])?');

    if(thisValue.match(reg)){
        var inputQty = parseInt(thisValue);

        if(!(inputQty < 0)){
            if(inputQty <= 15){                
                editProd(inputQty, evento.target.id);
            } else {
                
                if(confirm('Limite de 15 unidades por cliente. Deseja incluir 15 unidades no carrinho?')){
                    editProd(15, evento.target.id);
                } else {
                    editProd(1, evento.target.id);
                }

            }
        }else{
            alert("A quantidade não pode ser negativa.");
            editProd(1, evento.target.id);
        }
    }else{
        alert("Utilizar somente números.");
        editProd(1, evento.target.id);
    }
    
}

//Evento do botão Visualizar carrinho
const clearSession = (evento) => {
    evento.preventDefault();
    resetSessionCart();
}

//Funções visuais

function positionCart(){
    const HiddenCart = document.querySelector('[data-hidden-cart]');
    const buttonCart = document.querySelector('[data-button-cart]');
    var buttonCartRect = buttonCart.getBoundingClientRect();
    HiddenCart.style.left = (buttonCartRect.left - 10).toString() + "px";
}

const ButtonShowCart = (evento) => {
    evento.preventDefault();
    const HiddenCart = document.querySelector('[data-hidden-cart]');
    positionCart();
    updateCart();
    HiddenCart.style.display = "block";
}

const ButtonHiddenCart = (evento) => {
    evento.preventDefault();

    const HiddenCart = document.querySelector('[data-hidden-cart]');
    HiddenCart.style.display = "none";
}

//Eventos a objetos

window.addEventListener('resize', positionCart);

const ButtonCart = document.querySelector('[data-button-cart]');
ButtonCart.addEventListener('click', ButtonShowCart);

const closeCart = document.querySelector('[data-close-cart]')
closeCart.addEventListener('click', ButtonHiddenCart);

const viewCart = document.querySelector('[data-view-cart]')
viewCart.addEventListener('click', clearSession);


