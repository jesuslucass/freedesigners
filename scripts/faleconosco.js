formulario = document.querySelector('form');
btnEnviar = document.querySelector('.btn-primary');
nomeMsgError = document.querySelector('.nome.msg-error');
emailMsgError = document.querySelector('.email.msg-error');

function enviaFormulario(event) {
	event.preventDefault();

	const entradasDoFormulario = new FormData(formulario).entries();
	const { nome, email, observacoes } = Object.fromEntries(entradasDoFormulario);

	const mensagemErroNome = validaNome(nome);
	const mensagemErroEmail = validaEmail(email);
	const mensagemErroObservacoes = validaObservacoes(observacoes);

	if (temErro(mensagemErroEmail, mensagemErroNome, mensagemErroObservacoes)) {
		return;
	}

	resetaFormulario(formulario);
}

function validaNome(nome) {
	const temLetras = /^[a-zA-Z\s]*$/g;

	if (nome.length <= 0) {
		return 'O nome é um campo obrigatório.';
	}

	if (!temLetras.test(nome)) {
		return 'O nome só pode conter letras.';
	}

	return '';
}

function validaEmail(email) {
	const ehValido = /^\S+@\S+$/g;

	if (email.length <= 0) {
		return 'O email é um campo obrigatório.';
	}

	if (!ehValido.test(email)) {
		return 'O email digitado não é válido.';
	}

	return '';
}

function validaObservacoes(observacoes) {
	if (observacoes.length <= 0) {
		return 'Informe suas observações.';
	}
	return '';
}

function temErro(...mensagens) {
	for (let i = 0; i < mensagens.length; i++) {
		if (mensagens[i].length != 0) {
			return true;
		}
	}
	return false;
}

function resetaFormulario(formulario) {
	formulario.nome.classList.remove('valido');
	formulario.email.classList.remove('valido');
	formulario.observacoes.classList.remove('valido');
	formulario.reset();
}

btnEnviar.addEventListener('click', enviaFormulario);

formulario.nome.addEventListener('keyup', function () {
	const mensagemErro = validaNome(this.value.trim());
	if (temErro(mensagemErro)) {
		this.classList.remove('valido');
		this.classList.add('invalido');
		nomeMsgError.innerText = mensagemErro;
	} else {
		this.classList.add('valido');
		this.classList.remove('invalido');
		nomeMsgError.innerText = '';
	}
});

formulario.email.addEventListener('keyup', function () {
	const mensagemErro = validaEmail(this.value.trim());
	if (temErro(mensagemErro)) {
		this.classList.remove('valido');
		this.classList.add('invalido');
		emailMsgError.innerText = mensagemErro;
	} else {
		this.classList.add('valido');
		this.classList.remove('invalido');
		emailMsgError.innerText = '';
	}
});
