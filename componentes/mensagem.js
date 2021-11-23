const MensagemPorParametro = (mensagem, elemento) => {
  const div = document.createElement("div");
  const lista = document.querySelector(elemento);
  div.innerHTML = `<p>${mensagem}</p>`;
  lista.appendChild(div);
};

const MensagemDeSucesso = (mensagem, listaDeCompras, carrinho) => {
    const elemento = document.querySelector('[data-mensagem]');
   
    if (listaDeCompras.length > 0) {
      $("#mensagem").css("display", "");
  
      setTimeout(function () {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        elemento.textContent = mensagem;;
        listaDeCompras.splice(0, listaDeCompras.length);
        carrinho.limparCarrinho();
        $("#mensagem").fadeIn("fast");
      });
  
      setTimeout(function () {
        $("#mensagem").val("");
        $("#mensagem").fadeOut("fast");
      }, 2000);
    }













}

export default {
    MensagemPorParametro,
    MensagemDeSucesso
};
