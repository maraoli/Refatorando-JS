"use strict";

// const listaNotas = {
//     secao: document.getElementsByClassName("notes")[0],
//     listaInterna: [],
//     adiciona:(novoTitulo, novoTexto) => {
//         let nota = {
//             titulo: novoTitulo,
//             texto: novoTexto,
//             editando: false
//         };
//         this.listaInterna.push(nota);
//     },
//     remove:(posicao) => {
//         this.listaInterna.splice(posicao, 1);
//         atualizarSecao(this.secao);
//     },
//     edita:(posicao)=> {
//         this.listaInterna[posicao].editando = true;
//         atualizarSecao(this.secao);
//     },
//     salva:(posicao, novoTitulo, novoTexto)=> {
//         this.listaInterna[posicao].titulo = novoTitulo;
//         this.listaInterna[posicao].texto = novoTexto;
//         this.listaInterna[posicao].editando = false;
//         atualizarSecao(this.secao);
//     },
//     // quando é uma linha de code eu posso tirar {} e coloca , no fim 
//     pega: posicao => {return this.listaInterna[posicao];

//     contaTotal: () => {return this.listaInterna.length;    
// }

var atualizaNota = function atualizaNota(inputTitulo, textareaTexto, formulario, posicao) {
    var titulo = inputTitulo.value;
    var texto = textareaTexto.value;

    listaNotas.atualiza(titulo, texto, posicao);
};

var editaFormulario = function editaFormulario(posicao) {
    var notaAtual = listaNotas.pegaNota(posicao);
    notaAtual.editando = true;
};

var adicionarNota = function adicionarNota(inputTitulo, textareaTexto, formulario, secao, posicao) {
    var notaAtual = listaNotas.pegaNota(posicao);
    if (notaAtual) {
        listaNotas.salva(posicao, inputTitulo.value, textareaTexto.value);
    } else {
        listaNotas.adiciona(inputTitulo.value, textareaTexto.value);
        // limpar o formulario
        formulario.reset();
    }
};

var removerNota = function removerNota(evento, posicao) {
    evento.stopPropagation();
    listaNotas.remove(posicao);
};

//  ou: const atualizarSecao = secao => { porque é so um parametro
var atualizarSecao = function atualizarSecao(secao) {
    var conteudoSecao = "";
    for (var posicao = 0; posicao < listaNotas.contaItens(); posicao++) {
        var notaAtual = listaNotas.pegaNota(posicao);
        if (notaAtual.editando) {
            conteudoSecao += "<form class=\"note\">\n                                <input class=\"note__title\" type=\"text\" name=\"titulo\" value=\"" + notaAtual.titulo + "\" placeholder=\"T\xEDtulo\">\n                                <textarea class=\"note__body\" name=\"texto\" rows=\"5\" placeholder=\"Criar uma nota...\">" + notaAtual.texto + "</textarea>\n                                <button class=\"note__control\" type=\"button\" onclick=\"atualizaNota(this.form.titulo, this.form.texto, this.form, " + posicao + ")\">\n                                    Conclu\xEDdo\n                                </button>\n                             </form>";
        } else {
            conteudoSecao += "<form class=\"note\" onclick=\"editaFormulario(" + posicao + ")\">\n                                <button class=\"note__control\" type=\"button\" onclick=\"removerNota(event," + posicao + ")\">\n                                    <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n                                </button>\n                                <h1 class=\"note__title\">" + notaAtual.titulo + "</h1>\n                                <p class=\"note__body\">" + notaAtual.texto + "</p>                             \n                             </form>";
        }
    }
    secao.innerHTML = conteudoSecao;
};

//  const pq n altero o listaNotas = {}
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