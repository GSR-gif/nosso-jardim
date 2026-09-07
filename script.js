const flowers = [
  {
    id: "azul",
    color: "#4aa3ff",
    soft: "rgba(74,163,255,.18)",
    name: "Flor Azul",
    theme: "A parte tranquila",
    character: "assets/personagem_1.jpg",
    characterName: "Personagem Azul",
    messages: [
      "Algumas pessoas chegam sem fazer barulho e, quando percebemos, já viraram casa.",
      "Cuidar de algo também é uma forma de dizer: eu escolho continuar aqui.",
      "Talvez a melhor parte seja poder ser você mesma sem precisar esconder nenhum pedaço.",
      "Se esta flor chegou até aqui, é porque você também cuidou de algo que é nosso.",
      "Entre tantas coisas no mundo, eu gosto especialmente da paz que existe quando estamos juntos."
    ]
  },
  {
    id: "amarela",
    color: "#ffd447",
    soft: "rgba(255,212,71,.17)",
    name: "Flor Amarela",
    theme: "A parte que faz sorrir",
    character: "assets/personagem_2.jpg",
    characterName: "Personagem Amarelo",
    messages: [
      "Você tem um talento suspeito para aparecer e melhorar um dia comum.",
      "Se existir uma competição de quem me faz rir mais, você já está roubando.",
      "Nem tudo precisa ser grandioso. Às vezes, uma conversa boba já salva o dia.",
      "Essa flor está crescendo, mas sua capacidade de bagunçar meu coração continua na frente.",
      "No meio de toda a seriedade da vida, eu ainda escolheria dividir as coisas mais bobas com você."
    ]
  },
  {
    id: "rosa",
    color: "#ff86ad",
    soft: "rgba(255,134,173,.17)",
    name: "Flor Rosa",
    theme: "A parte do carinho",
    character: "assets/personagem_3.jpg",
    characterName: "Personagem Rosa",
    messages: [
      "Tem carinho que aparece nos detalhes que ninguém mais percebe.",
      "Eu gosto das pequenas lembranças que ficam depois que um momento termina.",
      "Talvez amar também seja prestar atenção: nas manias, nos silêncios, nos sorrisos.",
      "Você se tornou alguém que eu quero cuidar, ouvir e ter por perto.",
      "Se eu pudesse guardar alguns momentos em uma caixinha, muitos deles teriam você dentro."
    ]
  },
  {
    id: "vermelha",
    color: "#ff4050",
    soft: "rgba(255,64,80,.18)",
    name: "Flor Vermelha",
    theme: "A parte intensa",
    character: "assets/personagem_4.jpg",
    characterName: "Personagem Vermelho",
    messages: [
      "Existem encontros que simplesmente não passam despercebidos.",
      "Você mexe comigo de um jeito que nenhuma explicação bonitinha consegue resumir.",
      "É estranho como uma pessoa pode ocupar tanto espaço nos pensamentos sem pedir licença.",
      "Quanto mais esta flor cresce, mais difícil fica fingir que você não é importante para mim.",
      "De todas as coincidências que poderiam ter acontecido, eu ainda acho a nossa uma das mais bonitas."
    ]
  },
  {
    id: "roxa",
    color: "#b68cff",
    soft: "rgba(182,140,255,.18)",
    name: "Flor Roxa",
    theme: "A parte que ainda vai florescer",
    character: "assets/personagem_5.jpg",
    characterName: "Personagem Roxo",
    messages: [
      "Nem toda história precisa saber o final para valer a pena.",
      "O futuro fica um pouco mais interessante quando existe alguém que queremos encontrar nele.",
      "Ainda existem lugares para conhecer, histórias para viver e momentos que nem imaginamos.",
      "Talvez esta seja a flor mais importante: ela não guarda o que já aconteceu, mas aquilo que ainda podemos construir.",
      "Se você chegou até aqui, então talvez a melhor parte ainda esteja por vir."
    ]
  }
];

const STAGES = [
  { min: 0, label: "Ainda é só uma semente." },
  { min: 20, label: "Uma pequena vida começou a aparecer." },
  { min: 45, label: "As primeiras folhas estão surgindo." },
  { min: 70, label: "O botão está quase pronto." },
  { min: 100, label: "Floresceu. ✦" }
];

const STORAGE_KEY = "nosso-jardim-v1";
let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return Object.fromEntries(flowers.map(f => [f.id, Math.min(100, Number(parsed[f.id]) || 0)]));
  } catch {
    return Object.fromEntries(flowers.map(f => [f.id, 0]));
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function stageFor(points) {
  let stage = 0;
  STAGES.forEach((s, i) => { if (points >= s.min) stage = i; });
  return stage;
}

function renderGarden() {
  const grid = document.getElementById("gardenGrid");
  grid.innerHTML = flowers.map((f) => {
    const points = state[f.id];
    const stage = stageFor(points);
    const growth = .28 + (points / 100) * .72;
    const unlocked = points >= 20;
    return `
      <article class="flower-card" style="--flower:${f.color};--flower-soft:${f.soft}">
        <div class="character-frame">
          <img src="${f.character}" alt="${f.characterName}" loading="lazy">
          <div class="character-label">${f.characterName}</div>
        </div>

        <div class="flower-name">${f.name}</div>
        <div class="flower-theme">${f.theme}</div>

        <div class="flower-visual" aria-hidden="true">
          <div class="stem"></div>
          <div class="leaf a"></div><div class="leaf b"></div>
          <div class="flower" style="--growth:${growth}">
            <div class="petal"></div><div class="petal"></div><div class="petal"></div>
            <div class="petal"></div><div class="petal"></div><div class="petal"></div>
            <div class="flower-center"></div>
          </div>
        </div>

        <div class="progress-row">
          <span>${points}/100</span>
          <span>estágio ${stage + 1}/5</span>
        </div>
        <div class="progress"><i style="width:${points}%"></i></div>
        <div class="stage-text">${STAGES[stage].label}</div>

        <div class="card-actions">
          <button class="water-button" data-water="${f.id}">💧 Regar <small>+10</small></button>
          <button class="message-button ${unlocked ? "" : "locked"}" data-message="${f.id}" ${unlocked ? "" : "disabled"} aria-label="Mensagem">
            ${unlocked ? "✦" : "🔒"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  updateStats();

  grid.querySelectorAll("[data-water]").forEach(btn => {
    btn.addEventListener("click", () => water(btn.dataset.water, btn));
  });
  grid.querySelectorAll("[data-message]").forEach(btn => {
    btn.addEventListener("click", () => openMessage(btn.dataset.message));
  });
}

function updateStats() {
  const total = flowers.reduce((sum, f) => sum + state[f.id], 0);
  const grown = flowers.filter(f => state[f.id] >= 100).length;
  document.getElementById("totalPoints").textContent = total;
  document.getElementById("grownCount").textContent = `${grown}/5`;

  const finalSection = document.getElementById("finalSection");
  const finalButton = document.getElementById("finalButton");
  const complete = grown === flowers.length;

  finalSection.classList.toggle("locked", !complete);
  finalButton.disabled = !complete;
  if (complete) {
    finalButton.textContent = "Abrir a última mensagem ✦";
  }
}

function water(id, button) {
  const before = state[id];
  if (before >= 100) {
    showToast("Esta flor já floresceu. 🌸");
    return;
  }

  state[id] = Math.min(100, before + 10);
  saveState();
  renderGarden();

  const rect = button.getBoundingClientRect();
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.left = `${rect.left + rect.width / 2}px`;
  ripple.style.top = `${rect.top + rect.height / 2}px`;
  ripple.style.setProperty("--ripple-color", flowers.find(f => f.id === id).color);
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 850);

  const flower = flowers.find(f => f.id === id);
  if (state[id] === 100) {
    showToast(`${flower.name} floresceu. ✦`);
    setTimeout(() => openMessage(id, true), 450);
  } else if (before < 20 && state[id] >= 20) {
    showToast("Uma nova mensagem foi desbloqueada. ✦");
  } else {
    showToast("Ela cresceu um pouquinho. 💧");
  }
}

function openMessage(id, finalStage = false) {
  const flower = flowers.find(f => f.id === id);
  const points = state[id];
  if (points < 20) return;

  const stage = stageFor(points);
  const message = flower.messages[Math.min(stage, flower.messages.length - 1)];

  document.getElementById("modalCharacter").src = flower.character;
  document.getElementById("modalCharacter").alt = flower.characterName;
  document.getElementById("modalEyebrow").textContent = finalStage ? "ELA FLORESCEU" : `${flower.name.toUpperCase()} · ESTÁGIO ${stage + 1}`;
  document.getElementById("modalTitle").textContent = flower.characterName;
  document.getElementById("modalMessage").textContent = message;

  const backdrop = document.getElementById("modalBackdrop");
  backdrop.classList.add("open");
  backdrop.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const backdrop = document.getElementById("modalBackdrop");
  backdrop.classList.remove("open");
  backdrop.setAttribute("aria-hidden", "true");
}

function showToast(text) {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1900);
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", e => {
  if (e.target.id === "modalBackdrop") closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

document.getElementById("finalButton").addEventListener("click", () => {
  document.getElementById("modalCharacter").src = flowers[4].character;
  document.getElementById("modalCharacter").alt = "A última flor";
  document.getElementById("modalEyebrow").textContent = "O NOSSO JARDIM";
  document.getElementById("modalTitle").textContent = "Agora é comigo.";
  document.getElementById("modalMessage").textContent =
    "Você cuidou de cada flor e chegou ao fim desta pequena viagem. Esta última mensagem é o lugar reservado para a carta que será escrita por você — aquela que não precisa de personagem, pontuação ou botão. Só precisa ser sua.";
  const backdrop = document.getElementById("modalBackdrop");
  backdrop.classList.add("open");
  backdrop.setAttribute("aria-hidden", "false");
});

renderGarden();
