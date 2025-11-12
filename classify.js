const sheetURL =
  "https://opensheet.elk.sh/1d4Gyu_NazIw1dZNCR5LV0iUfoR3SK1rm0KTPDXL9k-M/Sheet1";

async function fetchData() {
  const res = await fetch(sheetURL);
  const data = await res.json();
  return data;
}

function fillDropdowns(data) {
  const dropdowns = {
    filterTen: new Set(),
    filterPeriod: new Set(),
    filterReligion: new Set(),
    filterLoai: new Set(),
    filterTinh: new Set(),
    filterTinhTrang: new Set(),
  };

  data.forEach(d => {
    dropdowns.filterTen.add(d["Tên di tích"]);
    dropdowns.filterPeriod.add(d["Thời kỳ"]);
    dropdowns.filterReligion.add(d["Tôn giáo"]);
    dropdowns.filterLoai.add(d["Loại di sản"]);
    dropdowns.filterTinh.add(d["Tỉnh/Thành"]);
    dropdowns.filterTinhTrang.add(d["Tình trạng bảo tồn"]);
  });

  for (const key in dropdowns) {
    const select = document.getElementById(key);
    dropdowns[key].forEach(val => {
      if (val && val.trim() !== "") {
        const opt = document.createElement("option");
        opt.value = val;
        opt.textContent = val;
        select.appendChild(opt);
      }
    });
  }
}

function renderTable(data) {
  const tbody = document.querySelector("#heritageTable tbody");
  tbody.innerHTML = "";

  data.forEach(item => {
    const yearDisplay = item["Năm xuất hiện"]
      ? `${item["Năm xuất hiện"]} ${item["Niên đại"] || ""}`
      : "";
    const unesco =
      item["Công nhận UNESCO"] !== "Không" && item["Công nhận UNESCO"] !== ""
        ? `${item["Công nhận UNESCO"]} (có)`
        : "Không";

    // tạo link Google Maps dựa theo tên di tích + tỉnh/thành
    const mapQuery = encodeURIComponent(`${item["Tên di tích"]} ${item["Tỉnh/Thành"]} Việt Nam`);
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><a href="${mapLink}" target="_blank" class="name-link">${item["Tên di tích"]}</a></td>
      <td>${yearDisplay}</td>
      <td>${item["Thời kỳ"]}</td>
      <td>${item["Tôn giáo"]}</td>
      <td>${item["Loại di sản"]}</td>
      <td>${item["Tỉnh/Thành"]}</td>
      <td>${unesco}</td>
      <td>${item["Tình trạng bảo tồn"]}</td>
      <td>${item["Mô tả"]}</td>
    `;
    tbody.appendChild(tr);
  });
}

function applyFilters(data) {
  const nameVal = document.getElementById("filterTen").value;
  const yearStart = parseInt(document.getElementById("filterYearStart").value);
  const yearEnd = parseInt(document.getElementById("filterYearEnd").value);
  const eraVal = document.getElementById("filterEra").value;
  const periodVal = document.getElementById("filterPeriod").value;
  const religionVal = document.getElementById("filterReligion").value;
  const loaiVal = document.getElementById("filterLoai").value;
  const tinhVal = document.getElementById("filterTinh").value;
  const unescoVal = document.getElementById("filterUNESCO").value;
  const tinhTrangVal = document.getElementById("filterTinhTrang").value;

  return data.filter(item => {
    const year = parseInt(item["Năm xuất hiện"]);
    const matchYearStart = isNaN(yearStart) ? true : year >= yearStart;
    const matchYearEnd = isNaN(yearEnd) ? true : year <= yearEnd;
    const matchName = nameVal ? item["Tên di tích"] === nameVal : true;
    const matchEra = eraVal ? item["Niên đại"] === eraVal : true;
    const matchPeriod = periodVal ? item["Thời kỳ"] === periodVal : true;
    const matchReligion = religionVal ? item["Tôn giáo"] === religionVal : true;
    const matchLoai = loaiVal ? item["Loại di sản"] === loaiVal : true;
    const matchTinh = tinhVal ? item["Tỉnh/Thành"] === tinhVal : true;
    const matchUNESCO =
      unescoVal === "Có"
        ? item["Công nhận UNESCO"] !== "Không" && item["Công nhận UNESCO"] !== ""
        : unescoVal === "Không"
        ? item["Công nhận UNESCO"] === "Không"
        : true;
    const matchTinhTrang = tinhTrangVal
      ? item["Tình trạng bảo tồn"] === tinhTrangVal
      : true;

    return (
      matchYearStart &&
      matchYearEnd &&
      matchName &&
      matchEra &&
      matchPeriod &&
      matchReligion &&
      matchLoai &&
      matchTinh &&
      matchUNESCO &&
      matchTinhTrang
    );
  });
}

async function init() {
  const data = await fetchData();
  fillDropdowns(data);
  renderTable(data);

  document.getElementById("filterBtn").addEventListener("click", () => {
    const filtered = applyFilters(data);
    renderTable(filtered);
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    document.querySelectorAll(".filters input, .filters select").forEach(el => (el.value = ""));
    renderTable(data);
  });

  anime({
    targets: "#logo",
    rotate: [0, 360],
    duration: 4000,
    easing: "easeInOutSine",
    loop: true
  });
}

init();
