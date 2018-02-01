
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

const atualizaNota = (inputTitulo, textareaTexto, formulario, posicao) => {
    let titulo = inputTitulo.value;
    let texto = textareaTexto.value;

    listaNotas.atualiza(titulo, texto, posicao);
}

const editaFormulario = (posicao) => {
    let notaAtual = listaNotas.pegaNota(posicao);
    notaAtual.editando = true;
}



const adicionarNota = (inputTitulo, textareaTexto, formulario, secao, posicao) => {
    let notaAtual = listaNotas.pegaNota(posicao);
    if (notaAtual) {
        listaNotas.salva(posicao, inputTitulo.value, textareaTexto.value)
    } else {
        listaNotas.adiciona(inputTitulo.value, textareaTexto.value);
        // limpar o formulario
        formulario.reset();
    }
}

const removerNota = (evento ,posicao) => {
    evento.stopPropagation();
    listaNotas.remove(posicao);
}


//  ou: const atualizarSecao = secao => { porque é so um parametro
const atualizarSecao = (secao) => {
    let conteudoSecao = "";
    for (let posicao = 0; posicao < listaNotas.contaItens(); posicao++) {
        let notaAtual = listaNotas.pegaNota(posicao);
        if (notaAtual.editando) {
            conteudoSecao += `<form class="note">
                                <input class="note__title" type="text" name="titulo" value="${notaAtual.titulo}" placeholder="Título">
                                <textarea class="note__body" name="texto" rows="5" placeholder="Criar uma nota...">${notaAtual.texto}</textarea>
                                <button class="note__control" type="button" onclick="atualizaNota(this.form.titulo, this.form.texto, this.form, ${posicao})">
                                    Concluído
                                </button>
                             </form>`;
        } else {
            conteudoSecao += `<form class="note" onclick="editaFormulario(${posicao})">
                                <button class="note__control" type="button" onclick="removerNota(event,${posicao})">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                                <h1 class="note__title">${notaAtual.titulo}</h1>
                                <p class="note__body">${notaAtual.texto}</p>                             
                             </form>`;
        }
    }
    secao.innerHTML = conteudoSecao;
}

//  const pq n altero o listaNotas = {}
const listaNotas ={
    // para atualizar a secao
    secao: document.getElementsByClassName("notes")[0],
    // var listaInterna = [];
    listaInterna: [] ,
    adiciona(titulo, texto){
        let nota = {
            titulo: titulo,
            texto: texto,
            editando: false,
        };
        // add this para acessar irmaos
        this.listaInterna.push(nota);
        atualizarSecao(this.secao);
    },
    remove(posicao){
        this.listaInterna.splice(posicao, 1);
        atualizarSecao(this.secao);
    },
    edita(posicao){
        this.listaInterna[posicao].edita = true;
        atualizarSecao(this.secao);
    },
    salva(posicao, novoTitulo, novoTexto){
        this.listaInterna[posicao].titulo = novoTitulo;
        this.listaInterna[posicao].texto = novoTexto;
        this.listaInterna[posicao].editando = false;
        atualizarSecao(this.secao);
    },
    pegaNota(posicao){
        return this.listaInterna[posicao];
    },
    contaItens(){
        return this.listaInterna.length;
    },
}




