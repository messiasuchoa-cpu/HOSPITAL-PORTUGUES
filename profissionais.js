const params = new URLSearchParams(window.location.search);
const especialidadeSelecionada = params.get("especialidade");
const titulo = document.getElementById("titulo-profissionais");
const cards = document.querySelectorAll("#lista-profissionais .card");
const mensagemVazia = document.getElementById("sem-profissionais");
const chaveCadastro = "hospitalPortuguesClienteCadastrado";

function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

if (especialidadeSelecionada) {
    const especialidadeNormalizada = normalizar(especialidadeSelecionada);
    let encontrouProfissional = false;

    titulo.textContent = `Profissionais de ${especialidadeSelecionada}`;

    cards.forEach((card) => {
        const corresponde = normalizar(card.dataset.especialidade) === especialidadeNormalizada;
        card.hidden = !corresponde;
        encontrouProfissional = encontrouProfissional || corresponde;
    });

    if (!encontrouProfissional) {
        mensagemVazia.textContent = `Ainda não há profissionais cadastrados em ${especialidadeSelecionada}.`;
        mensagemVazia.hidden = false;
    }
}

document.querySelectorAll(".botao-agendamento").forEach((botao) => {
    botao.addEventListener("click", (evento) => {
        evento.preventDefault();

        const especialidade = botao.closest(".card").dataset.especialidade;

        try {
            const destino = new URL("agendamento.html", window.location.href);
            destino.searchParams.set("especialidade", especialidade);

            if (localStorage.getItem(chaveCadastro) === "true") {
                window.location.assign(destino.href);
                return;
            }

            const cadastro = new URL("05-cadastro.html", window.location.href);
            cadastro.searchParams.set("retorno", "agendamento");
            cadastro.searchParams.set("especialidade", especialidade);
            window.location.assign(cadastro.href);
        } catch {
            window.alert("Não foi possível verificar o cadastro neste navegador. Verifique as permissões de armazenamento e tente novamente.");
        }
    });
});
