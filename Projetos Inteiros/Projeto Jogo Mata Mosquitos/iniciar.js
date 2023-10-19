function iniciarJogo() {
	let nivel = document.getElementById('selecaoDificuldade').value;

	window.location.href = 'app.html?' + nivel
}