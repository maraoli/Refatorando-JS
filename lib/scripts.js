"use strict";

var listaNotas = {
    secao: document.getElementsByClassName("notes")[0],
    listaInterna: [],
    adiciona: function adiciona(novoTitulo, novoTexto) {
        var nota = {
            titulo: novoTitulo,
            texto: novoTexto,
            editando: false
        };
        this.listaInterna.push(nota);
        // atualizarSecao(this.secao);
    },
    remove: function remove(posicao) {
        this.listaInterna.splice(posicao, 1);
        atualizarSecao(this.secao);
    },
    edita: function edita(posicao) {
        this.listaInterna[posicao].editando = true;
        atualizarSecao(this.secao);
    },
    salva: function salva(posicao, novoTitulo, novoTexto) {
        this.listaInterna[posicao].titulo = novoTitulo;
        this.listaInterna[posicao].texto = novoTexto;
        this.listaInterna[posicao].editando = false;
        atualizarSecao(this.secao);
    },
    pega: function pega(posicao) {
        return this.listaInterna[posicao];
    },
    contaTotal: function contaTotal() {
        return this.listaInterna.length;
    }
};

function atualizarSecao(secao) {
    var conteudoSecao = "";
    // forEach, mapa, reduce
    for (var posicao = 0; posicao < listaNotas.contaItens(); posicao++) {
        var notaAtual = listaNotas.pegaNota(posicao);
        if (notaAtual.editando) {
            conteudoSecao += '<form class="note">' + '<input class="note__title" type="text" name="titulo" value="' + notaAtual.titulo + '" placeholder="Título">' + '<textarea class="note__body" name="texto" rows="5" placeholder="Criar uma nota...">' + notaAtual.texto + '</textarea>' + '<button class="note__control" type="button" onclick="atualizaNota(this.form.titulo, this.form.texto, this.form, ' + posicao + ')">' + 'Concluído' + '</button>' + '</form>';
        } else {
            conteudoSecao += '<form class="note" onclick="editaFormulario(' + posicao + ')">' + '<button class="note__control" type="button" onclick="removerNota(event, ' + posicao + ')">' + '<i class="fa fa-times" aria-hidden="true"></i>' + '</button>' + '<h1 class="note__title">' + notaAtual.titulo + '</h1>' + '<p class="note__body">' + notaAtual.texto + '</p>' + '</form>';
        }
    }

    secao.innerHTML = conteudoSecao;
}

// 30/01/2018

// apague o "notas" da funcao acima  e substitua por listaNotas.listaInterna 

var listaNotas = {
    // para atualizar a secao
    secao: document.getElementsByClassName("notes")[0],
    // var listaInterna = [];
    listaInterna: [],
    adiciona: function adiciona(titulo, texto) {
        var nota = {
            titulo: titulo,
            texto: texto,
            editando: false
        };
        // add this para acessar irmaos
        this.listaInterna.push(nota);
        atualizarSecao(this.secao);
    },
    remove: function remove(posicao) {
        this.listaInterna.splice(posicao, 1);
        atualizarSecao(this.secao);
    },
    edita: function edita(posicao) {
        this.listaInterna[posicao].edita = true;
        atualizarSecao(this.secao);
    },
    salva: function salva(posicao, novoTitulo, novoTexto) {
        this.listaInterna[posicao].titulo = novoTitulo;
        this.listaInterna[posicao].texto = novoTexto;
        this.listaInterna[posicao].editando = false;
        atualizarSecao(this.secao);
    },
    pegaNota: function pegaNota(posicao) {
        return this.listaInterna[posicao];
    },
    contaItens: function contaItens() {
        return this.listaInterna.length;
    }
};

function editaFormulario(posicao) {
    var notaAtual = listaNotas.pegaNota(posicao);
    console.log('chamou a editaFormulario');
    // pegar notar e setar editando = true
    notaAtual.editando = true;
    // listaNotas.edita(posicao);
}

// REFATORADA
function adicionarNota(inputTitulo, textareaTexto, formulario, secao, posicao) {
    var notaAtual = listaNotas.pegaNota(posicao);
    if (notaAtual) {
        listaNotas.salva(posicao, inputTitulo.value, textareaTexto.value);
    } else {
        listaNotas.adiciona(inputTitulo.value, textareaTexto.value);
        // limpar o formulario
        formulario.reset();
    }
}

function removerNota(evento, posicao) {
    console.log('chamou o remove');
    evento.stopPropagation();
    // remover nota da lista de notas
    listaNotas.splice(posicao, 1);

    // atualizar tela
}

function atualizaNota(inputTitulo, textareaTexto, formulario, posicao) {
    var titulo = inputTitulo.value;
    var texto = textareaTexto.value;

    listaNotas.atualiza(titulo, texto, posicao, secao);
}

// 31/01/2018

//  a lista interna não pode aparecer em nenhuma parte do code
// apenas da função que a utiliza
// var notaAtual = listaNotas.pegaNota(posicao);
//