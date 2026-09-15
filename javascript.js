/* ==========================================================================
   1. GESTÃO DE ESTADO DE ACESSIBILIDADE (FONTE E CONTRASTE)
   ========================================================================== */
let tamanhoFonteAtual = 16;

function alterarFonte(delta) {
    let novaFonte = tamanhoFonteAtual + (delta * 2);
    // Limite obrigatório do checklist de integridade: if (novaFonte >= 12 && novaFonte <= 24)
    if (novaFonte >= 12 && novaFonte <= 24) {
        tamanhoFonteAtual = novaFonte;
        document.documentElement.style.setProperty('--font-size-base', novaFonte + 'px');
    }
}

function toggleContraste() {
    document.body.classList.toggle('high-contrast');
}

/* ==========================================================================
   2. ARRAY DE OBJETOS - CARROSSEL INTERATIVO DINÂMICO
   ========================================================================== */
const dadosCarrossel = [
    {
        badge: "Equipe de Fábrica • Honda HRC",
        titulo: "Equipe HRC Honda Racing 450",
        descricao: "Liderando o desenvolvimento da CRF450R com injeção eletrônica e mapas ajustáveis no guidão. A equipe conta com investimento massivo e peças oficiais em liga de titânio e fibra de carbono.",
        piloto: "Jett Lawrence",
        moto: "Honda CRF450R Factory",
        imagem: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80"
    },
    {
        badge: "Equipe de Fábrica • Monster Energy Yamaha",
        titulo: "Yamaha Star Racing 450/250",
        descricao: "Uma das maiores estruturas de apoio do paddock americano. Conhecida pela potência avassaladora dos motores YZ-F de cabeçote invertido e suspensão KYB oficial de fábrica.",
        piloto: "Eli Tomac",
        moto: "Yamaha YZ450F Factory",
        imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80"
    },
    {
        badge: "Equipe de Fábrica • Red Bull KTM",
        titulo: "KTM Factory Racing",
        descricao: "Pioneira na introdução do quickshifter e quadros em aço cromo-molibdênio no Supercross. A equipe austríaca mantém um padrão global de excelência e patrocínio master da Red Bull.",
        piloto: "Chase Sexton",
        moto: "KTM 450 SX-F Factory Edition",
        imagem: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    }
];

let indiceCarrossel = 0;

function renderizarCarrossel() {
    const container = document.getElementById('carousel-box');
    if (!container) return;

    const item = dadosCarrossel[indiceCarrossel];
    
    container.innerHTML = `
        <div class="carousel-img-container">
            <img src="${item.imagem}" alt="${item.titulo}">
        </div>
        <div class="carousel-text-container">
            <span class="carousel-badge">${item.badge}</span>
            <h3 class="carousel-title">${item.titulo}</h3>
            <p class="carousel-desc">${item.descricao}</p>
            <div class="carousel-meta">
                <div class="carousel-meta-item">
                    <h4>${item.piloto}</h4>
                    <p>Piloto Principal</p>
                </div>
                <div class="carousel-meta-item">
                    <h4>${item.moto}</h4>
                    <p>Equipamento</p>
                </div>
            </div>
            <div class="carousel-nav">
                <button class="acc-btn" id="btn-carousel-prev" aria-label="Slide Anterior">&larr; Anterior</button>
                <button class="acc-btn" id="btn-carousel-next" aria-label="Próximo Slide">Próximo &rarr;</button>
                <span style="margin-left: auto; color: var(--text-secondary); font-size: 0.85rem; font-weight: 700;">
                    ${indiceCarrossel + 1} / ${dadosCarrossel.length}
                </span>
            </div>
        </div>
    `;

    // Vinculação dos eventos após renderização
    document.getElementById('btn-carousel-prev').addEventListener('click', () => mudarSlide(-1));
    document.getElementById('btn-carousel-next').addEventListener('click', () => mudarSlide(1));
}

function mudarSlide(direcao) {
    indiceCarrossel += direcao;
    if (indiceCarrossel < 0) {
        indiceCarrossel = dadosCarrossel.length - 1;
    }
    if (indiceCarrossel >= dadosCarrossel.length) {
        indiceCarrossel = 0;
    }
    renderizarCarrossel();
}

/* ==========================================================================
   3. ARRAY DE OBJETOS - ACORDEÃO DINÂMICO (FAQ)
   ========================================================================== */
const dadosAcordeao = [
    {
        pergunta: "Qual a diferença entre a categoria 250cc e a 450cc?",
        resposta: "A categoria 250cc (Light) serve como porta de entrada para jovens talentos, com motores de 4 tempos mais leves. A 450cc é a classe principal (Premier Class), onde competem os pilotos mais experientes do planeta com motocicletas que superam os 63-70 cavalos de potência."
    },
    {
        pergunta: "Como funcionam os valores de premiação e patrocínios de fábrica?",
        resposta: "Os pilotos de fábrica possuem salários base que variam de $300 mil a mais de $2 milhões anuais. Além do salário base, os contratos preveem bônus de vitória por corrida e bônus de campeonato que podem dobrar os ganhos do atleta."
    },
    {
        pergunta: "O que é o playoff do SuperMotocross World Championship (SMX)?",
        resposta: "O SMX é a unificação dos campeonatos AMA Supercross e AMA Pro Motocross. No final da temporada outdoor, os 20 melhores pilotos acumuladores de pontos disputam três etapas finais com premiação total histórica superior a 10 milhões de dólares."
    },
    {
        pergunta: "Qual a importância da preparação física no Motocross Pro?",
        resposta: "O Motocross é classificado por estudos de fisiologia esportiva como um dos esportes mais exigentes do mundo. Os pilotos treinam ciclismo de estrada, remo e musculação funcional diariamente para suportar batimentos elevados sob calor e impactos violentos."
    }
];

function renderizarAcordeao() {
    const container = document.getElementById('accordion-box');
    if (!container) return;

    container.innerHTML = dadosAcordeao.map((item, index) => `
        <div class="accordion-item" id="acc-item-${index}">
            <button class="accordion-header" id="acc-btn-${index}" aria-expanded="false" aria-controls="acc-content-${index}">
                <span>${item.pergunta}</span>
                <div class="accordion-icon">+</div>
            </button>
            <div class="accordion-content" id="acc-content-${index}">
                <p>${item.resposta}</p>
            </div>
        </div>
    `).join('');

    // Vinculação de eventos nos botões criados
    dadosAcordeao.forEach((_, index) => {
        const btn = document.getElementById(`acc-btn-${index}`);
        if (btn) {
            btn.addEventListener('click', () => toggleAcordeao(index));
        }
    });
}

function toggleAcordeao(index) {
    const itemClicado = document.getElementById(`acc-item-${index}`);
    const estaAtivo = itemClicado.classList.contains('active');
    
    // Fecha todos os outros itens
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        const btn = item.querySelector('.accordion-header');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    });

    // Se o item clicado não estava ativo, abre ele
    if (!estaAtivo) {
        itemClicado.classList.add('active');
        const btn = itemClicado.querySelector('.accordion-header');
        if (btn) btn.setAttribute('aria-expanded', 'true');
    }
}

/* ==========================================================================
   4. INICIALIZAÇÃO SEGURA E EVENTOS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Eventos dos botões fixos de Acessibilidade
    const btnIncrease = document.getElementById('btn-increase-font');
    const btnDecrease = document.getElementById('btn-decrease-font');
    const btnContrast = document.getElementById('btn-toggle-contrast');

    if (btnIncrease) btnIncrease.addEventListener('click', () => alterarFonte(1));
    if (btnDecrease) btnDecrease.addEventListener('click', () => alterarFonte(-1));
    if (btnContrast) btnContrast.addEventListener('click', toggleContraste);

    // Inicialização dos Componentes Dinâmicos
    renderizarCarrossel();
    renderizarAcordeao();
});