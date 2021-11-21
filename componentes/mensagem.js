const Mensagem = (mensagem, elemento) => {
  const div = document.createElement("div");
  const lista = document.querySelector(elemento);
  div.innerHTML = `<p>${mensagem}</p>`;
  lista.appendChild(div);
};

export default Mensagem;
