// Armazenar amigos
let amigos = [];

// Adicionar amigo
function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();
    const lista = document.getElementById("listaAmigos");
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    if (nome === "") {
        mostrarMensagem("⚠️ O campo está vazio. Digite um nome!", "erro");
        return;
    }

    // Evita nomes duplicados
    if (amigos.includes(nome)) {
        mostrarMensagem(`⚠️ O nome "${nome}" já foi adicionado!`, "erro");
        return;
    }

    amigos.push(nome);

    // Cria item com botão de remover
    const item = document.createElement("li");
    item.textContent = nome;

    const btnRemove = document.createElement("button");
    btnRemove.textContent = "❌";
    btnRemove.classList.add("remove-btn");
    btnRemove.onclick = () => removerAmigo(nome, item);

    item.appendChild(btnRemove);
    lista.appendChild(item);

    input.value = "";
}

// Remover amigo individualmente
function removerAmigo(nome, item) {
    amigos = amigos.filter(amigo => amigo !== nome);
    item.remove();
    mostrarMensagem(`👋 ${nome} foi removido da lista.`, "info");
}

// Sortear apenas 1 amigo
function sortearAmigo() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    if (amigos.length === 0) {
        mostrarMensagem("⚠️ A lista de amigos está vazia!", "erro");
        return;
    }

    const sorteado = amigos[Math.floor(Math.random() * amigos.length)];
    mostrarMensagem(`🎉 O amigo sorteado é: <strong>${sorteado}</strong>`, "sucesso");
}

// Sorteio completo 
function sortearTodos() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    if (amigos.length < 2) {
        mostrarMensagem("⚠️ É preciso pelo menos 2 amigos para sortear!", "erro");
        return;
    }

 
    let sorteio = [...amigos];
    for (let i = sorteio.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]];
    }

    // Evita que alguém tire a si mesmo - Redundancia
    for (let i = 0; i < amigos.length; i++) {
        if (sorteio[i] === amigos[i]) {
            // troca com o próximo
            let swap = (i + 1) % amigos.length;
            [sorteio[i], sorteio[swap]] = [sorteio[swap], sorteio[i]];
        }
    }

    // Resultado
    amigos.forEach((amigo, i) => {
        const li = document.createElement("li");
        li.innerHTML = `🎁 ${amigo} → ${sorteio[i]}`;
        li.classList.add("fade-in");
        resultado.appendChild(li);
    });
}

// Resetar lista
function resetarAmigos() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "<li class='fade-in'>🔄 Lista resetada! Adicione novos amigos.</li>";
}

// Mensagem animada
function mostrarMensagem(msg, tipo) {
    const resultado = document.getElementById("resultado");
    const li = document.createElement("li");
    li.innerHTML = msg;
    li.classList.add("fade-in");

    if (tipo === "erro") li.style.color = "red";
    if (tipo === "sucesso") li.style.color = "green";
    if (tipo === "info") li.style.color = "blue";

    resultado.appendChild(li);
}
