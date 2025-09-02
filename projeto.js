// ================================
// Inicializações e utilidades
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // AOS (animações ao rolar)
  if (window.AOS) AOS.init({ duration: 900, once: true });

  // CTA -> rolar até produtos
  const cta = document.querySelector(".cta");
  if (cta) cta.addEventListener("click", () => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }));

  // Interações sobre
  prepararInteracoesSobre();

  // -----------------------
  // Menu hambúrguer mobile
  // -----------------------
   });
  }
});

// Animação 3D nos cards
document.querySelectorAll(".case-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 30;
    const rotateX = ((y / rect.height) - 0.5) * -30;

    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0) rotateX(0) scale(1)";
  });
});


// ================================
// Interações seção sobre
// ================================
function prepararInteracoesSobre() {
  const btnHistoria = document.getElementById("btn-historia");
  const btnValores = document.getElementById("btn-valores");
  const sobreExtra = document.getElementById("sobre-extra");

  if (btnHistoria) {
    btnHistoria.addEventListener("click", () => {
      mostrarSobreExtra(`
        <strong>Nossa história</strong>
        <p>Fundada em 2000, a Etesc cresceu a partir de um pequeno núcleo técnico até se tornar uma fábrica com linhas automatizadas e cultura de inovação. Crescemos investindo em P&D, parcerias acadêmicas e práticas sustentáveis.</p>
      `);
    });
  }

  if (btnValores) {
    btnValores.addEventListener("click", () => {
      mostrarSobreExtra(`
        <strong>Valores & Metas ESG</strong>
        <ul>
          <li>Reduzir 50% do desperdício no próximo ciclo produtivo</li>
          <li>Chegar a 70% de materiais reciclados até 2027</li>
          <li>Programas de segurança e qualificação para funcionários</li>
        </ul>
      `);
    });
  }

  // fechar extra ao clicar fora
  document.addEventListener("click", (e) => {
    const extra = document.getElementById("sobre-extra");
    const btns = document.querySelectorAll(".sobre-actions, .s-card");
    if (!extra) return;
    const within = e.target.closest(".sobre") || e.target.closest(".s-card");
    if (!within && extra.style.display === "block") {
      extra.style.display = "none";
      extra.innerHTML = "";
    }
  });

  // cards também mostram info
  document.querySelectorAll(".s-card").forEach(card => {
    card.addEventListener("click", () => {
      const titulo = card.querySelector("h3")?.textContent || "Info";
      const texto = card.querySelector("p")?.innerHTML || "";
      mostrarSobreExtra(`<strong>${titulo}</strong><p>${texto}</p>`);
    });
  });

  function mostrarSobreExtra(html) {
    if (!sobreExtra) return;
    sobreExtra.innerHTML = html;
    sobreExtra.style.display = "block";
    sobreExtra.scrollIntoView({behavior: "smooth", block: "nearest"});
  }

}




