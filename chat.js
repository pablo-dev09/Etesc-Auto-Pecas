// ELEMENTOS
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const btnClear = document.getElementById("btn-clear");
const btnTts = document.getElementById("btn-tts");
const ttsStateSpan = document.getElementById("tts-state");
const btnDark = document.getElementById("btn-dark");
const btnBack = document.getElementById("btn-back");

let messages = [];
let ttsEnabled = false;

// FUNÇÕES BÁSICAS
function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// RENDERIZAÇÃO DAS MENSAGENS
function renderMessages() {
  chatBox.innerHTML = "";
  for (const m of messages) {
    const row = document.createElement("div");
    row.className = "msg-row" + (m.role === "user" ? " msg-row--right" : "");

    const avatar = document.createElement("div");
    avatar.className = "avatar " + (m.role === "user" ? "user" : "bot");
    avatar.textContent = m.role === "user" ? "EU" : "IA";

    const bubble = document.createElement("div");
    bubble.className = "chat-message " + (m.role === "user" ? "user" : "bot");

    // ✅ CORREÇÃO AQUI
    const safeHtml = escapeHtml(m.text).replace(/\n/g, "<br>");
    bubble.innerHTML = `<div class="content">${safeHtml}</div>
                        <div class="meta">${m.time}</div>`;

    if (window.innerWidth <= 720) {
      row.appendChild(bubble);
    } else if (m.role === "user") {
      row.appendChild(bubble);
      row.appendChild(avatar);
    } else {
      row.appendChild(avatar);
      row.appendChild(bubble);
    }

    chatBox.appendChild(row);
  }
  chatBox.scrollTop = chatBox.scrollHeight;
}

// INDICADOR DE DIGITAÇÃO
function showTyping() {
  const row = document.createElement("div");
  row.className = "msg-row";
  const avatar = document.createElement("div");
  avatar.className = "avatar bot";
  avatar.textContent = "IA";

  const bubble = document.createElement("div");
  bubble.className = "chat-message bot";
  bubble.innerHTML = `<div class="typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;

  row.appendChild(avatar);
  row.appendChild(bubble);
  chatBox.appendChild(row);
  chatBox.scrollTop = chatBox.scrollHeight;
  return row;
}

function removeTyping(row) {
  if (row && row.parentNode) row.remove();
}

// EFEITO DE DIGITAÇÃO
function typeWrite(element, text, speed = 12) {
  element.textContent = "";
  let i = 0;
  return new Promise(resolve => {
    function step() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        chatBox.scrollTop = chatBox.scrollHeight;
        setTimeout(step, speed);
      } else resolve();
    }
    step();
  });
}

// TTS
function speak(text) {
  if (!ttsEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const ut = new SpeechSynthesisUtterance(text);
  ut.lang = "pt-BR";
  window.speechSynthesis.speak(ut);
}

// RESPOSTAS PRÉ-MOLDADAS
function getIAResponseSync(msg) {
  const m = msg.toLowerCase().trim();
  if (m.includes("horário") || m.includes("funcionamento") || m.includes("horario"))
    return "Nosso horário de atendimento é de segunda a sexta, das 08:00 às 18:00.";
  if (m.includes("grupo") || m.includes("integrantes") || m.includes("participantes"))
    return "Pedro Henrique Soares - piririquepedro@gmail.com (Líder Do Projeto)\n" +
      "Pablo Sousa Ribeiro - pablo.info.09@gmail.com (Desenvolvedor Web)\n" +
      "Marlon Eduardo Da Silva Amaral - marlon.edu2015@gmail.com (Suporte Web)\n" +
      "Kelly Araujo - kellyfaetec.com@gmail.com (Administradora Principal)\n" +
      "Davi Lucas - 21993891165 (Apresentador Mecânico)\n" +
      "Joao Pedro Cavalcante - 21983660758 (Apresentador Mecânico)";
  if (m.includes("endereço") || m.includes("localização"))
    return "Estamos localizados na Escola Técnica Estadual De Santa Cruz, FAETEC — Rio De Janeiro/RJ.";
  if (m.includes("telefone") || m.includes("contato") || m.includes("whatsapp"))
    return "Você pode nos ligar no (11) 4002-8922 ou enviar WhatsApp para (11) 9 9999-9999.";
  if (m.includes("preço") || m.includes("valor") || m.includes("mensalidade"))
    return "Para informar preços, preciso saber qual produto ou plano você tem interesse — pode especificar?";
  if (m.includes("trabalhar") || m.includes("vaga"))
    return "Temos oportunidades — envie seu currículo para rh@exemplo.com ou visite nossa página de carreiras.";
  if (m.includes("ajuda") || m.includes("suporte"))
    return "Estou aqui para ajudar! Conte qual é o problema e eu te direi o passo a passo.";
  if (m.includes("obrig") || m.includes("valeu"))
    return "De nada! Se precisar de mais alguma coisa, estou por aqui.";
  if (m.startsWith("como") && m.includes("fazer"))
    return "Para te orientar, diga exatamente qual tarefa você quer realizar que eu te guio passo a passo.";
  return "Desculpe, não entendi bem. Posso ajudar com: horário, endereço, telefone, preços ou suporte. Pode reformular?";
}

// ENVIO DE MENSAGEM
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  messages.push({ role: "user", text, time: nowTime() });
  saveHistory();
  renderMessages();

  userInput.value = "";
  adjustTextareaHeight();

  const typingRow = showTyping();
  sendBtn.disabled = true;
  userInput.disabled = true;

  await new Promise(r => setTimeout(r, Math.min(1000 + text.length * 18, 2400)));

  removeTyping(typingRow);
  const resp = getIAResponseSync(text);

  messages.push({ role: "bot", text: "", time: nowTime() });
  saveHistory();
  renderMessages();

  const bubbles = Array.from(document.querySelectorAll(".chat-message.bot .content"));
  const lastContent = bubbles[bubbles.length - 1];
  if (lastContent) {
    await typeWrite(lastContent, resp, 14);
    messages[messages.length - 1].text = resp;
    messages[messages.length - 1].time = nowTime();
    saveHistory();
  }

  speak(resp);

  sendBtn.disabled = false;
  userInput.disabled = false;
  userInput.focus();
}

// TEXTAREA AUTO ALTURA
function adjustTextareaHeight() {
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 200) + "px";
}

// LOCALSTORAGE
function loadHistory() {
  try {
    const raw = localStorage.getItem("chat_local_v1");
    if (raw) messages = JSON.parse(raw);
  } catch (e) {}
}

function saveHistory() {
  try {
    localStorage.setItem("chat_local_v1", JSON.stringify(messages));
  } catch (e) {}
}

// EVENTOS
sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("input", () => {
  sendBtn.disabled = userInput.value.trim() === "";
  adjustTextareaHeight();
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (userInput.value.trim()) sendMessage();
  }
});

btnClear.addEventListener("click", () => {
  if (confirm("Deseja limpar todo o histórico local?")) {
    messages = [];
    saveHistory();
    renderMessages();
  }
});

btnTts.addEventListener("click", () => {
  ttsEnabled = !ttsEnabled;
  ttsStateSpan.textContent = ttsEnabled ? "ON" : "OFF";
  btnTts.style.background = ttsEnabled ? "linear-gradient(180deg,var(--verde), #009b50)" : "";
  if (!ttsEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
});

btnDark.addEventListener("
