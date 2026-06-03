// Aguarda o carregamento completo do DOM para garantir que todos os elementos existam em tela
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. ALTERNADOR DE MODO ESCURO (Acessibilidade)
    // ==========================================
    const btnDarkMode = document.getElementById("toggle-dark-mode");
    
    if (btnDarkMode) {
        btnDarkMode.addEventListener("click", () => {
            // Liga/Desliga a classe 'dark-mode' no elemento principal (body)
            document.body.classList.toggle("dark-mode");
            
            // Processa e altera o texto do botão baseado no estado atual da tela
            if (document.body.classList.contains("dark-mode")) {
                btnDarkMode.textContent = "☀️ Modo Claro";
            } else {
                btnDarkMode.textContent = "🌓 Modo Escuro";
            }
        });
    }

    // ==========================================
    // 2. SISTEMA DE BUSCA E FILTRAGEM DINÂMICA
    // ==========================================
    const searchInput = document.getElementById("search-input");
    const searchCounter = document.getElementById("search-counter");
    const cards = document.querySelectorAll(".info-card");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            // Converte o termo digitado para letras minúsculas e remove espaços extras
            const termo = e.target.value.toLowerCase().trim();
            let cardsVisiveis = 0;

            cards.forEach(card => {
                // Recupera as palavras-chave guardadas no atributo 'data-searchable' do HTML
                const dadosBusca = card.getAttribute("data-searchable").toLowerCase();

                // Regra lógica: Se o termo estiver nos dados, mostra o card, senão esconde
                if (dadosBusca.includes(termo)) {
                    card.classList.remove("filtered-out");
                    cardsVisiveis++;
                } else {
                    card.classList.add("filtered-out");
                }
            });

            // Atualiza o contador de resultados na tela de forma funcional
            if (termo === "") {
                searchCounter.textContent = `${cards.length} cards encontrados`;
            } else {
                searchCounter.textContent = `${cardsVisiveis} resultado(s) para "${termo}"`;
            }
        });
    }

    // ==========================================
    // 3. ABAS EXPANDÍVEIS (Sanfona/Accordion)
    // ==========================================
    const detailButtons = document.querySelectorAll(".btn-card-details");

    detailButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const targetDiv = document.getElementById(targetId);

            // Fecha todos os outros detalhes abertos para manter a organização visual
            document.querySelectorAll(".interactive-detail").forEach(div => {
                if (div.id !== targetId) div.classList.add("hidden");
            });

            // Altera o estado de visibilidade do elemento clicado
            targetDiv.classList.toggle("hidden");

            // Atualiza dinamicamente o texto interno do botão
            if (targetDiv.classList.contains("hidden")) {
                button.textContent = "Ver Benefícios";
            } else {
                button.textContent = "Fechar Detalhes";
                // Rola a tela suavemente até o bloco de texto revelado
                targetDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // ==========================================
    // 4. SIMULADOR MATEMÁTICO DE SUSTENTABILIDADE
    // ==========================================
    const btnCalcular = document.getElementById("btn-calcular");
    
    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const inputHectares = document.getElementById("hectares").value;
            const resultadoBox = document.getElementById("resultado-calculo");

            // Validação simples: o valor deve ser maior do que zero
            if (inputHectares > 0) {
                // Variáveis com fatores de impacto ecológico estimados por hectare
                const reducaoQuimicosPorHectare = 15; // kg
                const carbonoRetidoPorHectare = 2.4; // toneladas

                // Processamento dos cálculos matemáticos
                const totalQuimicosEvitados = inputHectares * reducaoQuimicosPorHectare;
                const totalCarbonoRetido = (inputHectares * carbonoRetidoPorHectare).toFixed(1);

                // Manipula o DOM para injetar os resultados calculados nas tags corretas
                document.getElementById("res-quimicos").textContent = totalQuimicosEvitados;
                document.getElementById("res-carbono").textContent = totalCarbonoRetido;

                // Torna a caixa de resultados visível aplicando efeitos suaves
                resultadoBox.classList.remove("hidden");
                resultadoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                alert("Por favor, insira um número válido de hectares maior que zero.");
            }
        });
    }

    // ==========================================
    // 5. GERADOR DINÂMICO DA SEGUNDA GUIA (Artigo)
    // ==========================================
    const abrirNovaGuia = () => {
        // Abre uma nova janela/aba em branco no navegador
        const novaAba = window.open("", "_blank");
        
        // Puxa a estrutura de dentro da tag <template> presente no HTML unificado
        const templateConteudo = document.getElementById("template-segunda-guia").innerHTML;
        
        // Verifica se a página mãe está no Modo Escuro para manter a consistência visual na nova aba
        const classeCorBody = document.body.classList.contains("dark-mode") ? "class='dark-mode deep-article'" : "class='deep-article'";

        // Constrói e injeta dinamicamente o código do artigo científico na nova aba aberta
        novaAba.document.write(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Funcionamento dos Bioinsumos - Detalhes Técnicos</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body ${classeCorBody}>
                <header class="main-header">
                    <div class="logo">
                        <h2>Agro<span>Ciência</span></h2>
                    </div>
                </header>
                
                ${templateConteudo}

                <footer class="main-footer">
                    <p>&copy; 2026 Consciência Agrinho - Conteúdo Educativo e Científico Autoral.</p>
                </footer>
            </body>
            </html>
        `);
        
        // Fecha o fluxo de escrita da nova aba para o navegador renderizar o CSS/JS perfeitamente
        novaAba.document.close();
    };

    // Vincula a ação de clique nos botões específicos do HTML para disparar a segunda guia
    const btnMenuGuia = document.getElementById("btn-abrir-guia");
    const btnHeroGuia = document.getElementById("hero-btn-guia");

    if (btnMenuGuia) btnMenuGuia.addEventListener("click", abrirNovaGuia);
    if (btnHeroGuia) btnHeroGuia.addEventListener("click", abrirNovaGuia);
});