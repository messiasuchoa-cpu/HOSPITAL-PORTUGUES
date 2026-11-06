const formularioCadastro = document.getElementById("formCadastro");
const mensagemCadastro = document.getElementById("mensagem");
const chaveCadastro = "hospitalPortuguesClienteCadastrado";
const parametrosCadastro = new URLSearchParams(window.location.search);

formularioCadastro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    try {
        localStorage.setItem(chaveCadastro, "true");
    } catch {
        mensagemCadastro.textContent = "Não foi possível salvar o cadastro neste navegador. Verifique as permissões de armazenamento e tente novamente.";
        mensagemCadastro.setAttribute("role", "alert");
        return;
    }

    mensagemCadastro.textContent = `Cadastro de ${nome} realizado com sucesso! (Demonstração)`;
    mensagemCadastro.setAttribute("role", "status");
    formularioCadastro.reset();

    if (parametrosCadastro.get("retorno") === "agendamento") {
        const destino = new URL("06-agendamento.html", window.location.href);
        const especialidade = parametrosCadastro.get("especialidade");

        if (especialidade) {
            destino.searchParams.set("especialidade", especialidade);
        }

        window.setTimeout(() => window.location.assign(destino.href), 800);
    }
});