
function mascaraDeTelefone(telefone) {
    const textoAtual = telefone.replace(/\D/g, "");

    let textoAjustado;
    if (textoAtual.length == 11) {
        const parte1 = textoAtual.slice(0, 2);
        const parte2 = textoAtual.slice(2, 7);
        const parte3 = textoAtual.slice(7, 11);
        textoAjustado = `(${parte1}) ${parte2}-${parte3}`
        telefone.value = textoAjustado;

        return textoAjustado
    }
    
    if (textoAtual.length == 10) {
        const parte1 = textoAtual.slice(0, 2);
        const parte2 = textoAtual.slice(2, 6);
        const parte3 = textoAtual.slice(6, 11);
        textoAjustado = `(${parte1}) ${parte2}-${parte3}`
        return textoAjustado;
    }

}

function telefones(telefones) {
    const valor = telefones.value.split('/');

    if (valor[0] !== undefined && valor[1] == undefined && valor[2] == undefined) {
        const value = valor[0].replace(/\D/g, "");
        const result = mascaraDeTelefone(value);
        if (result !== undefined) {
            telefones.value = `${result}`
        }
    } else if (valor[0] !== undefined && valor[1] !== undefined && valor[2] == undefined) {
        const value1 = valor[0].replace(/\D/g, "");
        const value2 = valor[1].replace(/\D/g, "");
        const result1 = mascaraDeTelefone(value1);
        const result2 = mascaraDeTelefone(value2);
        if (result1 !== undefined && result2 !== undefined) {
            telefones.value = `${result1} / ${result2}`
        }
    } else if (valor[0] !== undefined && valor[1] !== undefined && valor[2] !== undefined) {
        const value1 = valor[0].replace(/\D/g, "");
        const value2 = valor[1].replace(/\D/g, "");
        const value3 = valor[2].replace(/\D/g, "");
        const result1 = mascaraDeTelefone(value1);
        const result2 = mascaraDeTelefone(value2);
        const result3 = mascaraDeTelefone(value3);
        if (result1 !== undefined && result2 !== undefined && result3 !== undefined) {
            telefones.value = `${result1} / ${result2} / ${result3}`
        }
    }


}

function id(el) {
    return document.getElementById(el);
}

/* window.onload = function () {
    id('phone').onkeyup = function () {
        setTimeout(() => {
            telefones(this);
        }, 1);

    }
} */