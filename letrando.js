var altura = 6; // número de tentativas
var largura = 5; // comprimento da palavra

var linha = 0; // tentativa atual (número da linha)
var coluna = 0; // letra atual para essa tentativa

var fimDoJogo = false;
// var palavra = "SQUID";

var listaDePalavras = ["teste", "lista", "chuva", "chave", "areia", "letra", "tecla", "moral", "justo", "nobre", "honra", "idoso", "muito", "sonho", "amigo", "tempo", "causa", "bravo", "comum", "sendo", "temor", "digno", "mundo", "forte", "vulgo", "louco", "criar", "round", "ordem", "mesmo", "pedir", "feliz", "coisa", "servo", "forma", "ontem", "falar", "fluir", "vendo", "certo", "valor", "temer", "falso", "abrir", "obter", "gerar", "crise", "burro", "enfim", "olhar", "favor", "falta", "ajuda", "ouvir", "noite", "calma", "outro", "outra", "fardo", "ativo", "pobre", "sinto", "adiar", "gente", "leigo", "humor", "terra", "claro", "imune", "ponto", "gesto", "ideal", "terno", "jovem", "papel", "tanto", "raiva", "entre", "frase", "verso", "feito", "cruel", "ciclo", "lazer", "preso", "maior", "carro", "pegar", "sorte", "livro", "setor", "peixe", "comer", "plano", "rezar", "junto", "sinal", "praia", "grupo", "lenda", "fugir", "treta", "parar", "rapaz", "prazo", "tenso", "puxar", "antes", "exame", "texto", "verbo", "conta", "filho", "cheio", "quase", "sumir", "ligar", "caixa", "solto", "livre", "grave", "tinha", "elite", "faixa", "bater", "salve", "autor", "ficha", "sexta", "pique", "porta", "extra", "culpa", "zelar", "gosto", "suave", "chama", "drama", "folga", "golpe", "feroz", "busca", "daqui", "verde", "carta", "aviso", "amiga", "rival", "tribo", "roupa", "pedra", "venha", "chefe", "fruto", "cargo", "vento", "saldo", "virar", "viram", "troca", "beijo", "traje", "surto", "perto", "feita", "feito", "natal", "volta", "tchau", "jogar", "odiar", "bolsa", "canto", "visto", "troco", "marca", "horto", "cheia", "burra", "linha", "calor", "folha", "peita", "misto", "redor", "banho", "mover", "porco", "loira", "sigla", "vazia", "sexto", "subir", "nariz", "cacto", "sugar", "lento", "bruxa", "toque", "ferir"]
var listaDeTentativas = ["aaaaa"];

listaDeTentativas = listaDeTentativas.concat(listaDePalavras);

var palavra = listaDePalavras[Math.floor(Math.random() * listaDePalavras.length)].toUpperCase();
console.log(palavra);

window.onload = function () {
    inicializar();
}

function inicializar() {

    // Criar o tabuleiro do jogo
    for (let r = 0; r < altura; r++) {
        for (let c = 0; c < largura; c++) {
            // <span id="0-0" class="bloco">P</span>
            let bloco = document.createElement("span");
            bloco.id = r.toString() + "-" + c.toString();
            bloco.classList.add("bloco");
            bloco.innerText = "";
            document.getElementById("tabuleiro").appendChild(bloco);
        }
    }

    // Criar o teclado
    let teclado = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
    ]

    for (let i = 0; i < teclado.length; i++) {
        let linhaAtual = teclado[i];
        let linhaTeclado = document.createElement("div");
        linhaTeclado.classList.add("linha-teclado");

        if (i === 1) {
            linhaTeclado.classList.add("linha-meio");
        }

        for (let j = 0; j < linhaAtual.length; j++) {
            let tecla = document.createElement("div");

            let letra = linhaAtual[j];
            tecla.innerText = letra;
            if (letra == "Enter") {
                tecla.id = "Enter";
            }
            else if (letra == "⌫") {
                tecla.id = "Backspace";
            }
            else if ("A" <= letra && letra <= "Z") {
                tecla.id = "Key" + letra; // "Key" + "A";
            }

            tecla.addEventListener("click", processarTecla);

            if (letra == "Enter") {
                tecla.classList.add("tecla-enter");
            } else {
                tecla.classList.add("bloco-tecla");
            }
            linhaTeclado.appendChild(tecla);
        }
        document.body.appendChild(linhaTeclado);
    }

    // Ouvir a pressão das teclas
    document.addEventListener("keyup", (e) => {
        processarEntrada(e);
    })
}

function processarTecla() {
    e = { "code": this.id };
    processarEntrada(e);
}

function processarEntrada(e) {
    if (fimDoJogo) return;

    // alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (coluna < largura) {
            let blocoAtual = document.getElementById(linha.toString() + '-' + coluna.toString());
            if (blocoAtual.innerText == "") {
                blocoAtual.innerText = e.code[3];
                coluna += 1;
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < coluna && coluna <= largura) {
            coluna -= 1;
        }
        let blocoAtual = document.getElementById(linha.toString() + '-' + coluna.toString());
        blocoAtual.innerText = "";
    }

    else if (e.code == "Enter") {
        atualizar();
    }

    if (!fimDoJogo && linha == altura) {
        fimDoJogo = true;
        document.getElementById("resposta").innerText = palavra;
    }
}

async function verificarPalavra(palavra) {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/fserb/pt-br/master/dicio');
        const dictionary = response.data.split('\n');
        if (dictionary.includes(palavra)) {
            console.log('A palavra existe!');
            return true;
        } else {
            console.log('A palavra não existe!');
            return false;
        }
    } catch (error) {
        console.log('Erro ao carregar o dicionário:', error);
        return false;
    }
}


async function atualizar() {
    let tentativa = "";
    document.getElementById("resposta").innerText = "";

    // Montar a tentativa com as letras
    for (let c = 0; c < largura; c++) {
        let blocoAtual = document.getElementById(linha.toString() + '-' + c.toString());
        let letra = blocoAtual.innerText;
        tentativa += letra;
    }

    tentativa = tentativa.toLowerCase(); // tornar minúsculo
    console.log(tentativa);

    // Verificar o comprimento da palavra
    if (tentativa.length !== largura) {
        document.getElementById("resposta").innerText = "A palavra deve ter " + largura + " letras.";
        for (let c = 0; c < largura; c++) {
            let blocoAtual = document.getElementById(linha.toString() + '-' + c.toString());
            blocoAtual.classList.add("bloquear");
        }
        return;
    }

    const palavraValida = await verificarPalavra(tentativa);
    if (!palavraValida) {
        document.getElementById("resposta").innerText = "Não está na lista de palavras";
        return;
    }

    // Começar a processar a tentativa
    let corretas = 0;

    let contagemLetras = {}; // rastrear a frequência das letras, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
    for (let i = 0; i < palavra.length; i++) {
        let letra = palavra[i];

        if (contagemLetras[letra]) {
            contagemLetras[letra] += 1;
        }
        else {
            contagemLetras[letra] = 1;
        }
    }

    console.log(contagemLetras);

    // primeira iteração, verificar todas as corretas primeiro
    for (let c = 0; c < largura; c++) {
        let blocoAtual = document.getElementById(linha.toString() + '-' + c.toString());
        let letra = blocoAtual.innerText;

        // Está na posição correto?
        if (palavra[c] == letra) {
            blocoAtual.classList.add("correto");

            let tecla = document.getElementById("Key" + letra);
            tecla.classList.remove("presente");
            tecla.classList.add("correto");

            corretas += 1;
            contagemLetras[letra] -= 1; // deduzir a contagem da letra
        }

        if (corretas == largura) {
            fimDoJogo = true;
        }
    }

    console.log(contagemLetras);
    // ir novamente e marcar as que estão presentes mas na posição errada
    for (let i = 0; i < palavra.length; i++) {
        let letra = palavra[i];
        contagemLetras[letra] = contagemLetras[letra] ? contagemLetras[letra] + 1 : 1;
    }
    
    // Percorrer os blocos e teclas
    for (let c = 0; c < largura; c++) {
        let blocoAtual = document.getElementById(linha.toString() + '-' + c.toString());
        let letra = blocoAtual.innerText;
    
        // Pular a letra se já foi marcada como correta ou ausente
        if (!blocoAtual.classList.contains("correto") && !blocoAtual.classList.contains("ausente")) {
            // Está na palavra e ainda tem ocorrências disponíveis
            if (palavra.includes(letra) && contagemLetras[letra] > 0) {
                blocoAtual.classList.add("presente");
                let tecla = document.getElementById("Key" + letra);
    
                // Verificar se a tecla já possui a classe "correto"
                if (!tecla.classList.contains("correto")) {
                    tecla.classList.add("presente");
                }
    
                contagemLetras[letra] -= 1; // Decrementar a contagem da letra
            } else {
                blocoAtual.classList.add("ausente");
                let tecla = document.getElementById("Key" + letra);
                tecla.classList.add("ausente");
            }
        }
    }

    linha += 1; // começar nova linha
    coluna = 0; // começar do zero para a nova linha

    if (!fimDoJogo && linha === altura) {
        fimDoJogo = true;
        document.getElementById("resposta").innerText = palavra;
    }

    if (corretas === largura) {
        document.getElementById("resposta").innerText = "Você ganhou!";
        fimDoJogo = true;
    }
}