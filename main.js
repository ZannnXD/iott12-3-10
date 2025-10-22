const devices = [
  {
    id: "lamp-dapur",
    name: "Lampu Dapur",
    iconOn: "https://img.icons8.com/fluency/96/light-on.png",
    iconOff: "https://img.icons8.com/color/96/light-off.png",
  },
  {
    id: "lamp-kamar",
    name: "Lampu Kamar",
    iconOn: "https://img.icons8.com/fluency/96/light-on.png",
    iconOff: "https://img.icons8.com/color/96/light-off.png",
  },
  {
    id: "lamp-rtamu",
    name: "Lampu Ruang Tamu",
    iconOn: "https://img.icons8.com/fluency/96/light-on.png",
    iconOff: "https://img.icons8.com/color/96/light-off.png",
  },
  {
    id: "ac-rtamu",
    name: "AC Ruang Tamu",
    iconOn: "https://img.icons8.com/fluency/96/air-conditioner.png",
    iconOff: "https://img.icons8.com/color/96/air-conditioner.png",
  },
  {
    id: "tv",
    name: "TV",
    iconOn: "https://img.icons8.com/fluency/96/retro-tv.png",
    iconOff: "https://img.icons8.com/color/96/retro-tv.png",
  },
  {
    id: "fan",
    name: "Kipas Angin",
    iconOn: "https://img.icons8.com/fluency/96/fan.png",
    iconOff: "https://img.icons8.com/color/96/fan.png",
  },
  {
    id: "mesin-cuci",
    name: "Mesin Cuci",
    iconOn: "https://img.icons8.com/fluency/96/washing-machine.png",
    iconOff: "https://img.icons8.com/color/96/washing-machine.png",
  },
  {
    id: "komputer",
    name: "Komputer",
    iconOn: "https://img.icons8.com/fluency/96/computer.png",
    iconOff: "https://img.icons8.com/color/96/computer.png",
  },
  {
    id: "fax",
    name: "Fax",
    iconOn: "https://img.icons8.com/fluency/96/fax.png",
    iconOff: "https://img.icons8.com/color/96/fax.png",
  },
];

const devicesGrid = document.getElementById("devices-grid");
const historyLog = document.getElementById("history-log");

function renderDevices() {
  devices.forEach((dev) => {
    const card = document.createElement("article");
    card.className = "device";
    card.id = dev.id;

    card.innerHTML = `
      <img src="${dev.iconOff}" alt="${dev.name}" class="device-img" id="${dev.id}-img" />
      <h2>${dev.name}</h2>
      <label class="switch">
        <input type="checkbox" onchange="toggleDevice('${dev.id}')" />
        <span class="slider"></span>
      </label>
      <p>Status: <span class="status">OFF</span></p>
    `;
    devicesGrid.appendChild(card);
  });
}

function toggleDevice(deviceId) {
  const device = document.getElementById(deviceId);
  const checkbox = device.querySelector("input[type=checkbox]");
  const statusSpan = device.querySelector(".status");
  const image = device.querySelector(".device-img");

  const devData = devices.find((d) => d.id === deviceId);
  const isOn = checkbox.checked;

  if (isOn) {
    device.classList.add("on");
    statusSpan.textContent = "ON";
    image.src = devData.iconOn;
    addHistoryLog(`${devData.name} dinyalakan`);
  } else {
    device.classList.remove("on");
    statusSpan.textContent = "OFF";
    image.src = devData.iconOff;
    addHistoryLog(`${devData.name} dimatikan`);
  }
}

function addHistoryLog(text) {
  const time = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const li = document.createElement("li");
  li.textContent = `[${time}] ${text}`;
  historyLog.prepend(li);

  // Batasi max 20 item log
  if (historyLog.childElementCount > 1000) {
    historyLog.removeChild(historyLog.lastChild);
  }
}

// Render devices saat load halaman
window.onload = () => {
  renderDevices();
};
