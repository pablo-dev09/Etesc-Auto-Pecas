// ================================
// Inicializações e utilidades
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // AOS (animações ao rolar)
  if (window.AOS) AOS.init({ duration: 900, once: true });

  // CTA -> rolar até produtos
  const cta = document.querySelector(".cta");
  if (cta) {
    cta.addEventListener("click", () =>
      document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })
    );
  }

  // Interações seção "Sobre"
  prepararInteracoesSobre();

  // -----------------------
  // Menu hambúrguer mobile
  // -----------------------
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu");

  // cria botão hamburguer dinamicamente
  const btnHamb = document.createElement("button");
  btnHamb.classList.add("hamburger");
  btnHamb.innerHTML = '<i class="ti ti-menu-2"></i>';
  nav.insertBefore(btnHamb, menu);

  btnHamb.addEventListener("click", () => {
    menu.classList.toggle("ativo");
    btnHamb.classList.toggle("ativo");
  });
});

// ================================
// Animação 3D nos cards
// ================================
document.querySelectorAll(".case-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
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
        <p>Fundada em 2000, a Etesc cresceu de um núcleo técnico até se tornar uma fábrica com linhas automatizadas e cultura de inovação.</p>
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
    if (!sobreExtra) return;
    const dentro = e.target.closest(".sobre") || e.target.closest(".s-card");
    if (!dentro && sobreExtra.style.display === "block") {
      sobreExtra.style.display = "none";
      sobreExtra.innerHTML = "";
    }
  });

  // cards também mostram info
  document.querySelectorAll(".s-card").forEach((card) => {
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
    sobreExtra.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}
// Botão voltar ao topo
const btnTopo = document.getElementById("btn-topo");

if (btnTopo) {
  btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const btnTopo = document.getElementById("btn-topo");

if (btnTopo) {
  // Ação de clicar → voltar ao topo
  btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mostrar/esconder o botão conforme rolagem
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnTopo.classList.add("mostrar");
    } else {
      btnTopo.classList.remove("mostrar");
    }
  });
}
