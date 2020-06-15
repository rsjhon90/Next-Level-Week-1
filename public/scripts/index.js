const buttonSearch = document.querySelector("#page-home main a") //botão pesquisar pontos de coleta
const modal = document.querySelector("#modal")
const closeX = document.querySelector("#modal .header a") //botão "x"

//adicionar e remover a classe hide no html
//ao clicar no botão
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

closeX.addEventListener("click",() => {
    modal.classList.add("hide")
})