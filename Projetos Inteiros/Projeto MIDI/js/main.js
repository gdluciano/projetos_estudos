function tocaSom(idAudio) {
	document.querySelector(idAudio).play();
}
function removeClasse(p,classe) {
	listaSom[p].classList.remove(classe);
}

let listaSom = document.querySelectorAll('.midi_button');

for (let i = 0; i < listaSom.length; i++) {

	let classe = listaSom[i].classList[1];
	listaSom[i].onclick = () => tocaSom(`#wav_${classe}`);
	listaSom[i].onkeydown = (e) => {
		if (e.keyCode == 13 || e.keyCode == 32) {
			listaSom[i].classList.add('ativa');
		}	
	}
	listaSom[i].onkeyup = removeClasse(i,'ativa');
}

const midiPrincipal = document.querySelector('.main_midi');
const midiPosition = midiPrincipal.getBoundingClientRect(); //informações da posição do elemento na página
const midPage = [midiPosition.x + (midiPosition.width/2),
				midiPosition.y + (midiPosition.height/2)];
//pegar posição do mouse, diferença com a posicao central da midi e converte essa diferença na 
//box-shadow no css
document.addEventListener('mousemove', e => {
	window.requestAnimationFrame(() => {
		midiPrincipal.style.boxShadow = `${(midPage[0] - e.clientX)/20}px 
										${(midPage[1]-e.clientY)/20}px 
										${(Math.abs(midPage[1]-e.clientY)/30)+(Math.abs(midPage[0]-e.clientX)/30)}px 
										#0f0f0f`;
	});
});

//calcular diferença do ponto médio dos objetos em relação à posição do mouse
