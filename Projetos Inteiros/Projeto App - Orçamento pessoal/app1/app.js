class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	verificar() {
		for (let i in this) {
			if(this[i] === undefined || this[i] === null || this[i] === '') {
				return false
			}
		}
		return true
	}
}

class Bd {
	constructor() {
		let id = localStorage.getItem('id')
		if(id === null) {
			localStorage.setItem('id', 0) //set o id inicial como 0
		}
	}

	getProximoId() {
		return parseInt(localStorage.getItem('id')) + 1 //retorna valor atual id + 1
	}

	gravar(d) {
		let id = this.getProximoId() //atribui o retorno da função
		localStorage.setItem(id, JSON.stringify(d)) //pega id e usa como key
		localStorage.setItem('id', id) //set o id = id atual
	}

	puxaDespesas() {
		let despesas = Array();
		let id = localStorage.getItem('id');

		for (let i = 1; i <= id; i++) {
			
			let despesa = JSON.parse(localStorage.getItem(i));

			if (despesa != null) {
				despesa.id = i;
				despesas.push(despesa);
			}
		}
		return despesas
	}

	pesquisar(despesa) {
		let despesas = this.puxaDespesas()

		if(despesa.ano != '') {
			despesas = despesas.filter(f => f.ano === despesa.ano)
		}
		if(despesa.mes != '') {
			despesas = despesas.filter(f => f.mes === despesa.mes)
		}
		if(despesa.dia != '') {
			despesas = despesas.filter(f => f.dia === despesa.dia)
		}
		if(despesa.tipo != '') {
			despesas = despesas.filter(f => f.tipo === despesa.tipo)
		}
		if(despesa.descricao != '') {
			despesas = despesas.filter(f => f.descricao === despesa.descricao)
		}
		if(despesa.valor != '') {
			despesas = despesas.filter(f => f.valor === despesa.valor)
		}

		return despesas
	}

	remover(id) {
		localStorage.removeItem(id);
	}
}

let bd = new Bd();

function cadastrarDespesas() {
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);

	if(despesa.verificar()){
		document.getElementById('modalCorHeader').className = "modal-header text-success";
		document.getElementById('modalTitulo').innerHTML = "Preenchimento concluído";
		document.getElementById('modalBody').innerHTML = "A despesa foi cadastrada com sucesso!";
		document.getElementById('modalCorBotao').className = "btn btn-success";

		bd.gravar(despesa);
		$('#modalPreenchimento').modal('show');

		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else {
		document.getElementById('modalCorHeader').className = "modal-header text-danger";
		document.getElementById('modalTitulo').innerHTML = "Preenchimento incompleto";
		document.getElementById('modalBody').innerHTML = "Erro no preenchimento. Favor verificar os campos!";
		document.getElementById('modalCorBotao').className = "btn btn-danger";

		$('#modalPreenchimento').modal('show')
	}
}

function carregarListaDespesas(despesas = Array(), filtro = false) {

	if(despesas.length == 0 && filtro == false){
		despesas = bd.puxaDespesas();
	}

	let lista = document.getElementById('tabelaDespesas');
	lista.innerHTML = '';

	despesas.forEach(d => {
		
		let linha = lista.insertRow() //cria uma <tr>

		//cria <td>
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
		switch (d.tipo) {
			case '1':
				d.tipo = 'Alimentação'
				break;
			case '2':
				d.tipo = 'Educação'
				break;
			case '3':
				d.tipo = 'Lazer'
				break;
			case '4':
				d.tipo = 'Saúde'
				break;
			case '5':
				d.tipo = 'Transporte'
				break;
		}
		linha.insertCell(1).innerHTML = d.tipo;
		linha.insertCell(2).innerHTML = d.descricao;
		linha.insertCell(3).innerHTML = d.valor;

		let btn = document.createElement('button');
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		linha.insertCell(4).append(btn);
		btn.id = d.id;
		btn.onclick = function() {
			bd.remover(this.id)
			alert("Item removido")
			window.location.reload()
		}

	})
}

function pesquisarDespesas() {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

	let despesas = bd.pesquisar(despesa)

	carregarListaDespesas(despesas, true)
}