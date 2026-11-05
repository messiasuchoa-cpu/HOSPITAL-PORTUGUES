const params = new URLSearchParams(window.location.search);
const especialidadeSelecionada = params.get("especialidade");
const titulo = document.getElementById("titulo-profissionais");
const cards = document.querySelectorAll("#lista-profissionais .card");
const mensagemVazia = document.getElementById("sem-profissionais");

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
