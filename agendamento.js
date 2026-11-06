const chaveCadastro = "hospitalPortuguesClienteCadastrado";
const formularioAgendamento = document.getElementById("formAgendamento");
const avisoAcesso = document.getElementById("aviso-acesso");
const parametrosAgendamento = new URLSearchParams(window.location.search);

try {
    if (localStorage.getItem(chaveCadastro) !== "true") {
        const cadastro = new URL("05-cadastro.html", window.location.href);
        cadastro.searchParams.set("retorno", "agendamento");

        const especialidade = parametrosAgendamento.get("especialidade");
        if (especialidade) {
            cadastro.searchParams.set("especialidade", especialidade);
        }

        window.location.replace(cadastro.href);
    } else {
        const especialidade = parametrosAgendamento.get("especialidade");
        const campoEspecialidade = document.getElementById("especialidade");

        if (especialidade && [...campoEspecialidade.options].some((opcao) => opcao.value === especialidade)) {
            campoEspecialidade.value = especialidade;
        }
    }
} catch {
    formularioAgendamento.hidden = true;
    avisoAcesso.textContent = "Não foi possível verificar o cadastro neste navegador. Ative o armazenamento do navegador e recarregue a página.";
    avisoAcesso.hidden = false;
}

formularioAgendamento.addEventListener("submit", (evento) => {
    evento.preventDefault();

    document.getElementById("resEspecialidade").textContent = document.getElementById("especialidade").value;
    document.getElementById("resData").textContent = document.getElementById("data").value;
    document.getElementById("resHorario").textContent = document.getElementById("horario").value;
    document.getElementById("resumo").style.display = "block";
});