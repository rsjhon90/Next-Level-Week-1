function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]") //procura e seleciona o elemento "name=uf"
    
    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados") //buscar na url e retornar como a variável res
    .then ( (res) => { return res.json() }) //promise retornado como "res" para numa função anônima retornar convertido como "res.json"
    // .then ( res => res.json() ) -linha de código opcional para ficar mais compacto quando se trabalha com funções
    .then ( states => {

        //for (states = 1; states < 28; states++){
        for ( const state of states) { 
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            //alteração na linha de código html
        }

    })
}

populateUFs()

function getCities (event) {
    const citySelect = document.querySelector("select[name=city]") //procura e seleciona o elemento "name=uf"
    const stateInput = document.querySelector("input[name=state]") 
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    
    fetch (url)
    .then ( res => res.json() )
    .then ( cities => {
        
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`                        
        }
        
        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]") //target - procura no arquivo html e seleciona o elemento
    .addEventListener("change", getCities)

// Itens de coleta
// Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [] //array

function handleSelectedItem (event) {
    const itemLi = event.target
    
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id //id do clique atribuido
    
    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados e adicionar a um índice do array
    
    const alreadySelected = selectedItems.findIndex ( item => { //utilização de arrow function
        const itemFound = item == itemId //comparação do id value com a posição do índice(index)
        return itemFound //true or false
    })
    
    
    // se já estiver selecionado, tirar da seleção
    if ( alreadySelected >= 0 ) {
        //tirar da seleção
        const filteredItems = selectedItems.filter ( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent //irá retornar false
        })
        selectedItems = filteredItems
    } else { 
        // se não estiver selecionado 
        // adicionar à seleção
        selectedItems.push(itemId)
    }
    
    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
    
}

