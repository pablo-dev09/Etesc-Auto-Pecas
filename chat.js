const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Respostas simuladas da IA
function getIAResponse(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("horário") || msg.includes("funcionamento")) {
    return "Nosso horário de atendimento é de segunda a sexta, das 8h às 18h.";
  } else if (msg.includes("endereço") || msg.includes("localização")) {
    return "Estamos localizados na Rua Exemplo, 123 - Centro, São Paulo/SP.";
  } else if (msg.includes("telefone") || msg.includes("contato")) {
    return "Você pode nos ligar no (11) 4002-8922.";
  } else {
    return "Desculpe, não entendi sua pergunta. Mas em breve terei mais informações!";
  }
}

// Enviar mensagem
sendBtn.addEventListener("click", () => {
  const msg = userInput.value.trim();
  if (msg === "") return;

  // Mensagem do usuário
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.textContent = msg;
  chatBox.appendChild(userMsg);

  // Resposta da IA
  setTimeout(() => {
    const iaMsg = document.createElement("div");
    iaMsg.className = "msg ia";
    iaMsg.textContent = getIAResponse(msg);
    chatBox.appendChild(iaMsg);

    chatBox.scrollTop = chatBox.scrollHeight;
  }, 600);

  userInput.value = "";
});
