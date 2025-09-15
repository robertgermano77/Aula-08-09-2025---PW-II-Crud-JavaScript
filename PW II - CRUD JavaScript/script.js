const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const btnSalvar = document.querySelector('#btnSalvar')

let itens = []
let id

const campos = ['nome', 'funcao', 'salario', 'rua', 'numero', 'cep', 'bairro', 'cidade', 'uf']

function getInputs() {
  let obj = {}
  campos.forEach(campo => {
    obj[campo] = document.querySelector(`#m-${campo}`).value
  })
  return obj
}

function setInputs(item = {}) {
  campos.forEach(campo => {
    document.querySelector(`#m-${campo}`).value = item[campo] ?? ''
  })
}

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.classList.contains('modal-container')) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    setInputs(itens[index])
    id = index
  } else {
    setInputs()
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td>${item.rua}</td>
    <td>${item.numero}</td>
    <td>${item.cep}</td>
    <td>${item.bairro}</td>
    <td>${item.cidade}</td>
    <td>${item.uf}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  e.preventDefault()

  let novoItem = getInputs()

  if (Object.values(novoItem).some(val => val === '')) return

  if (id !== undefined) {
    itens[id] = novoItem
  } else {
    itens.push(novoItem)
  }

  setItensBD()
  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => insertItem(item, index))
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()