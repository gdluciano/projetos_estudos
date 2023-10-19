let altura = 0;
let largura = 0;
let vida = 1
let tempo = 10;
let respawnTime = 1000;

let nivel = window.location.search;
nivel = nivel.replace('?', '');

if (nivel === 'normal') {
	respawnTime = 1500;
	tempo = 15;
} else if (nivel === 'dificil') {
	respawnTime = 1000;
	tempo = 20;
} else if (nivel === 'dengue') {
	respawnTime = 650;
	tempo = 24;
}

let cronometro = setInterval(function() {
	document.getElementById('cronometro').innerHTML = tempo;
	tempo--;
	if(tempo < 0) {
		window.location.href = 'gameVitoria.html';
	};
}, 1000);

function ajustaTamanho() {
	altura = window.innerHeight - 200;
	largura = window.innerWidth;
	console.log(largura, altura)
}

ajustaTamanho()

function ladoMosquito() {
	let classe = Math.floor(Math.random() * 2)

	switch (classe) {
		case 0:
			return 'scaleX(-1)'
		case 1:
			return 'scaleX(1)'
	}
}

function tirarVidas() {
	if(vida < 4) {
		document.getElementById('v' + vida).src = 'imagens/coracao_vazio.png';
		vida++;
	} else {
		window.location.href = 'gameOver.html';
	}
}

function posicionarMosquito() {

	let idMosquito = document.getElementById('mosquitos');

	if(idMosquito) {
		idMosquito.remove();
		tirarVidas()
	}
	//gera posicao aleatória;
	let posicaoX = Math.floor(Math.random() * largura) - 50;
	let posicaoY = Math.floor(Math.random() * altura) - 50;

	//condicao caso posição for < 0;
	posicaoX = posicaoX <= 50 ? posicaoX + 50 : posicaoX;
	posicaoY = posicaoY <= 50 ? posicaoY + 50 : posicaoY;

	//tamanho aleatório;
	let tamanhoMosquito = Math.floor(Math.random() * 70) + 30;

	console.log(posicaoX, posicaoY, tamanhoMosquito)

	//construção do mosquito;
	let mosquito = document.createElement('img');
	mosquito.src = 'imagens/mosca.png';
	mosquito.className = 'mosquito';
	mosquito.id = 'mosquitos';
	mosquito.style.left = posicaoX + 'px';
	mosquito.style.top = posicaoY + 'px';
	mosquito.style.position = 'absolute';
	mosquito.style.width = tamanhoMosquito + 'px';
	mosquito.style.height = tamanhoMosquito + 'px';
	mosquito.style.transform = ladoMosquito();
	mosquito.onclick = function() {this.remove();}

	document.body.appendChild(mosquito);

}

setInterval(posicionarMosquito, respawnTime);

