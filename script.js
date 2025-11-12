// === AnimeJS intro ===
anime.timeline({ loop: false })
  .add({
    targets: '#logo',
    opacity: [0, 1],
    scale: [0.8, 1],
    easing: 'easeOutExpo',
    duration: 1200
  })
  .add({
    targets: '#title',
    opacity: [0, 1],
    translateY: [-30, 0],
    duration: 1000,
    easing: 'easeOutExpo'
  }, '-=800')
  .add({
    targets: '#line',
    opacity: [0, 1],
    width: ['0px', '80px'],
    duration: 800,
    easing: 'easeOutExpo'
  })
  .add({
    targets: '#desc',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1000,
    easing: 'easeOutExpo'
  }, '-=400');
document.querySelectorAll('.heritage-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    anime({
      targets: card,
      scale: [1, 1.05],
      duration: 600,
      easing: 'easeOutElastic(1, .6)'
    });
  });

  card.addEventListener('mouseleave', () => {
    anime({
      targets: card,
      scale: [1.05, 1],
      duration: 500,
      easing: 'easeOutExpo'
    });
  });
});
// === Thanh top-bar khi cuộn ===
const topBar = document.getElementById('top-bar');
const heroSection = document.querySelector('.container');
window.addEventListener('scroll', () => {
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  topBar.classList.toggle('show', heroBottom < 50);
});

// === Dữ liệu di tích Việt Nam ===
const diTichVN = [
  {
    name: "Văn Miếu Quốc Tử Giám",
    desc: "Trung tâm văn hóa – giáo dục đầu tiên của Việt Nam, biểu tượng tri thức Nho học.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Van_Mieu_Quoc_Tu_Giam_Hanoi.jpg"
  },
  {
    name: "Hoàng thành Thăng Long",
    desc: "Khu di tích lịch sử lâu đời, từng là trung tâm quyền lực của các triều đại phong kiến Việt Nam.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Cua_Bac_-_Hoang_thanh_Thang_Long.jpg"
  },
  {
    name: "Cố đô Huế",
    desc: "Kinh đô của triều Nguyễn, được UNESCO công nhận là Di sản Văn hóa Thế giới.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Hue_Citadel_Flag_Tower.jpg"
  }
];

// === Tìm kiếm ===
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('result-modal');
const closeModal = document.getElementById('closeModal');
const resultTitle = document.getElementById('resultTitle');
const resultDesc = document.getElementById('resultDesc');
const resultImage = document.getElementById('resultImage');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) return;

  // Tìm trong danh sách di tích Việt Nam
  const found = diTichVN.find(d => d.name.toLowerCase() === query.toLowerCase());

  if (found) {
    showResult(found.name, found.desc, found.image);
    return;
  }

  // Nếu không có -> mở tìm kiếm Wikipedia bình thường
  const wikiSearchUrl = `https://vi.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`;
  window.open(wikiSearchUrl, "_blank");
});

searchInput.addEventListener('keydown', e => {
  if (e.key === "Enter") searchBtn.click();
});

// === Hiển thị kết quả nội bộ ===
function showResult(title, desc, image) {
  resultTitle.textContent = title;
  resultDesc.textContent = desc;
  resultImage.src = image || '';
  modal.style.display = 'flex';
}

closeModal.addEventListener('click', () => modal.style.display = 'none');

// === Hiệu ứng nhấp nháy neon ===
anime({
  targets: '#line',
  opacity: [1, 0.5, 1],
  easing: 'easeInOutSine',
  duration: 2000,
  loop: true
});
const sheetURL =
  "https://opensheet.elk.sh/1d4Gyu_NazIw1dZNCR5LV0iUfoR3SK1rm0KTPDXL9k-M/Sheet1";

let currentMode = "heritage"; // heritage | events

// Một số sự kiện lịch sử lớn chia theo thời kỳ
const majorEvents = {
  "Thời Hồng Bàng": [
    { name: "Thành lập nhà nước Văn Lang (2879 TCN)", link: "https://vi.wikipedia.org/wiki/V%C4%83n_Lang" },
    { name: "Vua Hùng dựng nước", link: "https://vi.wikipedia.org/wiki/Vua_H%C3%B9ng" }
  ],
  "Nhà Lý": [
    { name: "Dời đô ra Thăng Long (1010)", link: "https://vi.wikipedia.org/wiki/D%E1%BB%9Di_%C4%91%C3%B4_ra_Th%C4%83ng_Long" },
    { name: "Xây dựng Văn Miếu (1070)", link: "https://vi.wikipedia.org/wiki/V%C4%83n_Mi%E1%BA%BFu_-_Qu%E1%BB%91c_T%E1%BB%AD_Gi%C3%A1m" }
  ],
  "Nhà Trần": [
    { name: "Kháng chiến chống Nguyên – Mông (1258–1288)", link: "https://vi.wikipedia.org/wiki/Kh%C3%A1ng_chi%E1%BA%BFn_ch%E1%BB%91ng_Nguy%C3%AAn_-_M%C3%B4ng" },
    { name: "Chiến thắng Bạch Đằng (1288)", link: "https://vi.wikipedia.org/wiki/Tr%E1%BA%ADn_B%E1%BA%A1ch_%C4%90%E1%BA%B1ng_(1288)" }
  ],
  "Nhà Nguyễn": [
    { name: "Thành lập triều Nguyễn (1802)", link: "https://vi.wikipedia.org/wiki/Nh%C3%A0_Nguy%E1%BB%85n" },
    { name: "Xây dựng Kinh thành Huế (1804)", link: "https://vi.wikipedia.org/wiki/Kinh_th%C3%A0nh_Hu%E1%BA%BF" }
  ],
  "Hiện đại": [
    { name: "Cách mạng tháng Tám (1945)", link: "https://vi.wikipedia.org/wiki/C%C3%A1ch_m%E1%BA%A1ng_th%C3%A1ng_T%C3%A1m" },
    { name: "Tuyên ngôn Độc lập (1945)", link: "https://vi.wikipedia.org/wiki/Tuy%C3%AAn_ng%C3%B4n_%C4%91%E1%BB%99c_l%E1%BA%ADp_Vi%E1%BB%87t_Nam_D%C3%A2n_ch%E1%BB%A7_C%E1%BB%99ng_h%C3%B2a" },
    { name: "Chiến thắng Điện Biên Phủ (1954)", link: "https://vi.wikipedia.org/wiki/Chi%E1%BA%BFn_d%E1%BB%8Bch_%C4%90i%E1%BB%87n_Bi%C3%AAn_Ph%E1%BB%A7" }
  ]
};

async function fetchTimelineData() {
  const res = await fetch(sheetURL);
  return await res.json();
}

// ======== Chế độ Di tích ========
function renderHeritageTimeline(data) {
  const container = document.getElementById("timeline");
  container.innerHTML = "";

  const sorted = [...data].sort((a, b) => {
    const eraA = a["Niên đại"] === "TCN" ? -1 : 1;
    const eraB = b["Niên đại"] === "TCN" ? -1 : 1;
    return parseInt(a["Năm xuất hiện"]) * eraA - parseInt(b["Năm xuất hiện"]) * eraB;
  });

  sorted.forEach(item => {
    const year = `${item["Năm xuất hiện"]} ${item["Niên đại"] || "SCN"}`;
    const mapQuery = encodeURIComponent(`${item["Tên di tích"]} ${item["Tỉnh/Thành"]} Việt Nam`);
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    const el = document.createElement("div");
    el.className = "timeline-event";
    el.innerHTML = `
      <div class="timeline-year">${year}</div>
      <a href="${mapLink}" target="_blank" class="timeline-name" title="${item["Mô tả"]}">
        ${item["Tên di tích"]}
      </a>
    `;
    container.appendChild(el);
  });

  const line = document.createElement("div");
  line.className = "timeline-line";
  container.appendChild(line);

  anime({
    targets: ".timeline-event",
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(100),
    easing: "easeOutExpo"
  });
}

// ======== Chế độ Sự kiện ========
function renderEventTimeline() {
  const container = document.getElementById("timeline");
  container.innerHTML = "";

  Object.keys(majorEvents).forEach(period => {
    const el = document.createElement("div");
    el.className = "timeline-event";
    el.innerHTML = `
      <div class="timeline-year">${period}</div>
      <div class="timeline-name">Xem sự kiện</div>
    `;
    el.addEventListener("click", () => showEventDetails(period));
    container.appendChild(el);
  });

  const line = document.createElement("div");
  line.className = "timeline-line";
  container.appendChild(line);

  anime({
    targets: ".timeline-event",
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(100),
    easing: "easeOutExpo"
  });
}

function showEventDetails(period) {
  const detailBox = document.getElementById("event-details");
  const title = document.getElementById("period-title");
  const list = document.getElementById("event-list");

  title.textContent = `Các sự kiện tiêu biểu – ${period}`;
  list.innerHTML = "";

  (majorEvents[period] || []).forEach(e => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${e.link}" target="_blank">${e.name}</a>`;
    list.appendChild(li);
  });

  detailBox.classList.remove("hidden");

  anime({
    targets: "#event-details",
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 600,
    easing: "easeOutQuad"
  });
}

// ======== Khởi tạo & Chuyển chế độ ========
async function initTimeline() {
  const data = await fetchTimelineData();
  renderHeritageTimeline(data);

  document.getElementById("toggleMode").addEventListener("click", () => {
    const btn = document.getElementById("toggleMode");
    const detailBox = document.getElementById("event-details");

    if (currentMode === "heritage") {
      currentMode = "events";
      btn.textContent = "🏛️ Chuyển sang Di tích lịch sử";
      renderEventTimeline();
      detailBox.classList.add("hidden");
    } else {
      currentMode = "heritage";
      btn.textContent = "🕰️ Chuyển sang Sự kiện lịch sử";
      renderHeritageTimeline(data);
      detailBox.classList.add("hidden");
    }
  });
}

initTimeline();
