const scriptURL = "https://script.google.com/macros/s/AKfycbyyng6vNNQAdV87I3MDBXJu7nAqDqne9j-tAF9AU0sn4bpsb8mkRLNiWEQ-cIAcqtBDpQ/exec";

// ✅ Schema ข้อมูลทั้งหมด
const schemas = {
    service: ["id", "เลขที่ใบงาน", "ลำดับ", "วันที่เปิดงาน", "วันที่ปิดงาน", "ประเภทงาน", "ชื่อโรงพยาบาล", "ชื่อเครื่อง", "ยี่ห้อ", "รุ่น",
        "หมายเลขเครื่อง", "หมายเลขครุภัณฑ์", "อุปกรณ์ที่ส่งมาด้วย", "อาการที่แจ้งเสีย", "ผลการซ่อม", "รับประกัน",
        "ชื่อลูกค้า", "เบอร์ลูกค้า", "ลายเซ็นลูกค้า_add", "ลายเซ็นลูกค้า", "ชื่อช่าง", "เบอร์ช่าง", "ลายเซ็นช่าง_add",
        "ลายเซ็นช่าง", "รูปภาพ1", "รูปภาพ2", "รูปภาพ3", "รูปภาพ4", "รูปภาพ5", "รูปภาพ6", "รูปภาพ7", "รูปภาพ8", "หมายเหตุ"
    ],
    request: ["id", "ลำดับ", "วันที่แจ้งซ่อม", "ลูกค้า", "ชื่อเครื่อง", "ยี่ห้อ", "รุ่น", "อาการที่แจ้ง", "ชื่อช่าง"],
    sales: ["id", "ลำดับ", "วันที่", "ชื่อลูกค้า", "เบอร์โทร", "ที่อยู่", "email", "พนักงานขาย", "วิธีการชำระ", "สถานะ", "ชื่อเครื่อง/สินค้า", "จำนวน", "ราคาต่อหน่วย", "ยอดรวม"],
    rental: ["id", "ลำดับ", "วันที่", "ชื่อลูกค้า", "ที่อยู่", "email", "วันที่เริ่มเช่า", "วันที่สิ้นสุด", "พนักงานขาย", "ชื่อเครื่อง/สินค้า", "จำนวน", "ราคาต่อหน่วย", "ยอดรวม"],
    equipment: ["id", "ลำดับ", "วันที่", "ชื่อเครื่อง", "ประเภท", "ยี่ห้อ", "รุ่น", "หมายเลขเครื่อง/รหัส", "สถานะ", "ราคา", "จำนวน", "รูปภาพเครื่อง"],
    customers: ["id", "ลำดับ", "ชื่อลูกค้า", "ที่อยู่", "เบอร์โทร", "Email", "เลขประจำตัวผู้เสียภาษี"],
    sparepart: ["id", "ลำดับ", "วันที่", "ชื่ออะไหล่", "ยี่ห้อ", "รุ่น", "รหัส", "สถานะ", "ราคา", "ราคาต้นทุน", "จำนวน", "หมายเหตุ", "รูปภาพอะไหล่"]
};

const serviceAddFields = [
    "เลขที่ใบงาน", "วันที่เปิดงาน", "ประเภทงาน", "ชื่อโรงพยาบาล", "ชื่อเครื่อง", "ยี่ห้อ", "รุ่น", "หมายเลขเครื่อง",
    "หมายเลขครุภัณฑ์", "อุปกรณ์ที่ส่งมาด้วย", "อาการที่แจ้งเสีย",
    "ชื่อลูกค้า", "เบอร์ลูกค้า", "ลายเซ็นลูกค้า_add",
    "ชื่อช่าง", "เบอร์ช่าง", "ลายเซ็นช่าง_add",
    "รูปภาพ1", "รูปภาพ2", "รูปภาพ3", "รูปภาพ4",
    "หมายเหตุ"
];

const displayColumns = {
    service: ["เลขที่ใบงาน", "วันที่เปิดงาน", "ชื่อโรงพยาบาล", "ชื่อเครื่อง", "ยี่ห้อ", "รุ่น"],
    request: ["วันที่แจ้งซ่อม", "ลูกค้า", "ชื่อเครื่อง", "อาการที่แจ้ง"],
    sales: ["วันที่", "ชื่อลูกค้า", "พนักงานขาย", "สถานะ", "ยอดรวม"],
    rental: ["วันที่", "ชื่อลูกค้า", "พนักงานขาย", "วันที่เริ่มเช่า", "วันที่สิ้นสุด", "ยอดรวม"],
    equipment: ["ชื่อเครื่อง", "ยี่ห้อ", "รุ่น", "สถานะ", "จำนวน", "รูปภาพเครื่อง"],
    customers: ["ชื่อลูกค้า", "เบอร์โทร", "Email"],
    sparepart: ["ชื่ออะไหล่", "ยี่ห้อ", "รุ่น", "รหัส", "จำนวน", "รูปภาพอะไหล่"]
};

// Required fields for validation
const requiredFields = {
    service: ["เลขที่ใบงาน", "ชื่อโรงพยาบาล", "ชื่อเครื่อง", "ชื่อลูกค้า"],
    customers: ["ชื่อลูกค้า", "เบอร์โทร"],
    request: ["ลูกค้า", "ชื่อเครื่อง"],
    sales: ["ชื่อลูกค้า", "ชื่อเครื่อง/สินค้า", "พนักงานขาย"],
    rental: ["ชื่อลูกค้า", "ชื่อเครื่อง/สินค้า", "พนักงานขาย"],
    equipment: ["ชื่อเครื่อง", "ยี่ห้อ", "สถานะ"],
    sparepart: ["ชื่ออะไหล่", "ยี่ห้อ"]
};

// Dropdown options
const dropdownOptions = {
    สถานะ: ["พร้อมใช้งาน", "ไม่พร้อมใช้งาน", "อยู่ระหว่างซ่อม", "จำหน่ายแล้ว"],
    พนักงานขาย: ["นาย ก", "นาย ข", "นาง ค", "นางสาว ง", "นาย จ", "นางสาว ฉ"]
};

let currentSheet = "";
let currentData = {};
const sheetsOrder = ["service", "request", "sales", "rental", "equipment", "customers", "sparepart"];

// ===== Initialize Application =====
function initializeApp() {
    addDynamicCSS();
    loadAllTables();

    setTimeout(() => {
        addStatistics();
        addSearchFilters();
        addExportButtons();
        enableAutoRefresh(5);
    }, 1000);
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const existing = document.querySelectorAll('.notification');
    existing.forEach(el => el.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Loading System =====
function showLoading(show = true) {
    let loader = document.getElementById('loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loader';
        loader.className = 'loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(loader);
    }
    loader.style.display = show ? 'flex' : 'none';
}

// ===== โหลดตารางทั้งหมด =====
function loadAllTables() {
    const container = document.getElementById("tables-container");
    container.innerHTML = "";
    sheetsOrder.forEach(sheet => {
        const section = document.createElement("div");
        section.classList.add("data-section");
        section.innerHTML = `<h3>${sheet.toUpperCase()} <button onclick="openSection('${sheet}','add')">เพิ่ม</button></h3>
      <table class="data-table" id="table-${sheet}">
        <thead></thead><tbody></tbody>
      </table>`;
        container.appendChild(section);
        loadSheetData(sheet);
    });
}

// ===== โหลดข้อมูลจาก Google Apps Script =====
async function loadSheetData(sheet) {
    try {
        showLoading(true);
        const res = await fetch(scriptURL + "?sheet=" + sheet);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        currentData[sheet] = json.data || [];
        renderTable(sheet, currentData[sheet]);

    } catch (error) {
        console.error(`Error loading ${sheet}:`, error);
        currentData[sheet] = [];
        renderTable(sheet, []);
        showNotification(`ไม่สามารถโหลดข้อมูล ${sheet} ได้`, 'error');
    } finally {
        showLoading(false);
    }
}

// ===== แสดงตารางข้อมูล =====
function createImageElement(src, isSignature = false) {
    const img = document.createElement("img");
    img.classList.add("preview");
    if (isSignature) img.classList.add("signature-preview");

    const fallbackUrls = [
        src,
        src.replace('googleusercontent.com/profile/picture/1', 'drive.google.com/thumbnail?id='),
        src.replace('googleusercontent.com/profile/picture/1', 'drive.google.com/uc?id=')
    ];

    let currentIndex = 0;

    function tryNextUrl() {
        if (currentIndex < fallbackUrls.length) {
            img.src = fallbackUrls[currentIndex];
            currentIndex++;
        } else {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y4ZjlmYSIgc3Ryb2tlPSIjZGVlMmU2IiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5YTNiNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
            img.alt = "ไม่สามารถโหลดรูปได้";
        }
    }

    img.onerror = tryNextUrl;
    img.onclick = () => openImageModal(img.src);
    tryNextUrl();

    return img;
}

function renderTable(sheet, data) {
    const table = document.getElementById("table-" + sheet);
    if (!table) return;
    
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";

    const cols = displayColumns[sheet] || schemas[sheet].filter(c => c !== 'id');
    thead.innerHTML = "<tr>" + cols.map(c => `<th>${c}</th>`).join("") + "<th>จัดการ</th></tr>";

    const displayData = data.slice(0, 5);
    const hasMore = data.length > 5;

    displayData.forEach(row => {
        const tr = document.createElement("tr");
        cols.forEach(c => {
            const td = document.createElement("td");
            if (c.includes("รูปภาพ") && row[c]) {
                const img = createImageElement(row[c]);
                td.appendChild(img);
            } else if (c.includes("ลายเซ็น") && row[c]) {
                const img = createImageElement(row[c], true);
                td.appendChild(img);
            } else {
                td.textContent = row[c] || "";
            }
            tr.appendChild(td);
        });

        const tdAct = document.createElement("td");
        const btnEdit = document.createElement("button");
        btnEdit.textContent = "แก้ไข";
        btnEdit.className = "btn-edit";
        btnEdit.onclick = () => openSection(sheet, "edit", row);

        const btnDel = document.createElement("button");
        btnDel.textContent = "ลบ";
        btnDel.className = "btn-del";
        btnDel.onclick = () => deleteRow(row.id, sheet);

        tdAct.appendChild(btnEdit);
        tdAct.appendChild(btnDel);

        if (sheet === "service") {
            const btnPdf = document.createElement("button");
            btnPdf.textContent = "PDF";
            btnPdf.className = "btn-pdf";
            btnPdf.onclick = () => previewPDF(row);
            tdAct.appendChild(btnPdf);
        }

        tr.appendChild(tdAct);
        tbody.appendChild(tr);
    });

    if (hasMore) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = cols.length + 1;
        td.style.textAlign = "center";
        td.style.fontStyle = "italic";
        td.style.color = "#666";
        td.style.padding = "10px";
        td.innerHTML = `แสดง 5 จาก ${data.length} รายการ <button onclick="showAllData('${sheet}')" style="margin-left: 10px; padding: 4px 8px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">ดูทั้งหมด</button>`;
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}

function showAllData(sheet) {
    const data = currentData[sheet] || [];
    renderFullTable(sheet, data);
}

function renderFullTable(sheet, data) {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 95%; max-height: 90%; overflow: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3>${sheet.toUpperCase()} - ข้อมูลทั้งหมด (${data.length} รายการ)</h3>
                <button onclick="this.closest('.modal').remove()" style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 4px;">ปิด</button>
            </div>
            <table class="data-table" id="full-table-${sheet}">
                <thead></thead><tbody></tbody>
            </table>
        </div>
    `;
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    document.body.appendChild(modal);

    renderFullTableContent(sheet, data);
}

function renderFullTableContent(sheet, data) {
    const table = document.getElementById("full-table-" + sheet);
    if (!table) return;

    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";

    const cols = displayColumns[sheet] || schemas[sheet].filter(c => c !== 'id');
    thead.innerHTML = "<tr>" + cols.map(c => `<th>${c}</th>`).join("") + "<th>จัดการ</th></tr>";

    data.forEach(row => {
        const tr = document.createElement("tr");
        cols.forEach(c => {
            const td = document.createElement("td");
            if (c.includes("รูปภาพ") && row[c]) {
                const img = createImageElement(row[c]);
                td.appendChild(img);
            } else if (c.includes("ลายเซ็น") && row[c]) {
                const img = createImageElement(row[c], true);
                td.appendChild(img);
            } else {
                td.textContent = row[c] || "";
            }
            tr.appendChild(td);
        });

        const tdAct = document.createElement("td");
        const btnEdit = document.createElement("button");
        btnEdit.textContent = "แก้ไข";
        btnEdit.className = "btn-edit";
        btnEdit.onclick = () => {
            document.querySelector('.modal').remove();
            openSection(sheet, "edit", row);
        };

        const btnDel = document.createElement("button");
        btnDel.textContent = "ลบ";
        btnDel.className = "btn-del";
        btnDel.onclick = () => {
            document.querySelector('.modal').remove();
            deleteRow(row.id, sheet);
        };

        tdAct.appendChild(btnEdit);
        tdAct.appendChild(btnDel);

        if (sheet === "service") {
            const btnPdf = document.createElement("button");
            btnPdf.textContent = "PDF";
            btnPdf.className = "btn-pdf";
            btnPdf.onclick = () => generatePDF(row);
            tdAct.appendChild(btnPdf);
        }

        tr.appendChild(tdAct);
        tbody.appendChild(tr);
    });
}

// ===== Image Modal =====
function openImageModal(src) {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <button onclick="this.closest('.modal').remove()" style="float: right; margin-bottom: 10px;">✕</button>
            <img src="${src}" style="width: 100%; height: auto; border-radius: 4px;">
        </div>
    `;
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    document.body.appendChild(modal);
}

// ===== Validation =====
function validateFormData(sheet, data) {
    const errors = [];

    if (requiredFields[sheet]) {
        requiredFields[sheet].forEach(field => {
            if (!data[field] || String(data[field]).trim() === '') {
                errors.push(`${field} จำเป็นต้องกรอก`);
            }
        });
    }

    const phoneFields = ["เบอร์โทร", "เบอร์ลูกค้า", "เบอร์ช่าง"];
    phoneFields.forEach(field => {
        if (data[field] && !/^[0-9\-+\s()]{8,15}$/.test(data[field])) {
            errors.push(`${field} รูปแบบไม่ถูกต้อง`);
        }
    });

    if (data["email"] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data["email"])) {
        errors.push("รูปแบบ Email ไม่ถูกต้อง");
    }

    return errors;
}

// ===== Generate Next Numbers =====
function generateNextWorkNo() {
    const data = currentData["service"] || [];
    if (data.length === 0) return "IDMS001";

    const workNos = data.map(row => {
        const workNo = String(row["เลขที่ใบงาน"] || "");
        const match = workNo.match(/IDMS(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }).filter(num => !isNaN(num) && num > 0);

    const maxNo = workNos.length > 0 ? Math.max(...workNos) : 0;
    return "IDMS" + String(maxNo + 1).padStart(3, '0');
}

function generateNextSequence(sheet) {
    const data = currentData[sheet] || [];
    if (data.length === 0) return 1;

    const sequences = data.map(row => {
        const seq = parseInt(row["ลำดับ"] || 0, 10);
        return isNaN(seq) ? 0 : seq;
    }).filter(num => num > 0);

    const maxSeq = sequences.length > 0 ? Math.max(...sequences) : 0;
    return maxSeq + 1;
}

// ===== Image Handling =====
function previewImage(input) {
    const file = input.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        showNotification('ไฟล์รูปภาพใหญ่เกินไป (สูงสุด 5MB)', 'error');
        input.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = e => {
        const img = input.parentElement.querySelector("img.preview");
        if (img) img.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };

        img.src = URL.createObjectURL(file);
    });
}

// ===== Modal Add/Edit =====
function openSection(sheet, mode = "add", rowData = null) {
    currentSheet = sheet;
    const modal = document.getElementById("modal");
    modal.classList.add("show");
    document.getElementById("modal-title").textContent = (mode === "edit" ? "แก้ไข " : "เพิ่ม ") + sheet;
    const form = document.getElementById("entity-form");
    form.innerHTML = "";
    form.appendChild(createInput("id", "hidden"));

    let fields = (sheet === "service" ? (mode === "edit" ? schemas[sheet] : serviceAddFields) : schemas[sheet]);
    fields.filter(f => f !== 'id').forEach(f => {
        const label = document.createElement("label");
        label.textContent = f;
        let input;

        const textAreas = ["อาการที่แจ้งเสีย", "ผลการซ่อม", "หมายเหตุ"];

        if (textAreas.some(keyword => f.includes(keyword))) {
            input = document.createElement("textarea");
        } else if (f.includes("รูปภาพ")) {
            input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = e => previewImage(e.target);
            const imgPreview = document.createElement("img");
            imgPreview.className = "preview";
            label.appendChild(imgPreview);
        } else if (f.includes("ลายเซ็น")) {
            input = document.createElement("input");
            input.type = "hidden";
            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = "เซ็น";
            btn.onclick = () => openSignature(input);
            label.appendChild(btn);
        } else if (f === "สถานะ" && (sheet === "equipment" || sheet === "sparepart")) {
            input = document.createElement("select");
            input.innerHTML = '<option value="">เลือกสถานะ</option>' +
                dropdownOptions.สถานะ.map(option => `<option value="${option}">${option}</option>`).join('');
        } else if (f === "พนักงานขาย" && (sheet === "sales" || sheet === "rental")) {
            input = document.createElement("select");
            input.innerHTML = '<option value="">เลือกพนักงานขาย</option>' +
                dropdownOptions.พนักงานขาย.map(option => `<option value="${option}">${option}</option>`).join('');
        } else {
            input = document.createElement("input");
            if (f.includes("วันที่") || f.includes("ว/ด/ป")) {
                input.type = "date";
            } else if (f.includes("ราคา") || f.includes("จำนวน") || f.includes("ยอดรวม")) {
                input.type = "number";
                input.step = "0.01";
            } else if (f.includes("email") || f.includes("Email")) {
                input.type = "email";
            } else if (f.includes("เบอร์")) {
                input.type = "tel";
            }
        }

        input.name = f;
        label.appendChild(input);
        form.appendChild(label);
    });

    if (mode === "add") {
        const today = new Date().toISOString().split('T')[0];
        if (sheet === "service") {
            const seqInput = form.querySelector("[name='ลำดับ']");
            const workNoInput = form.querySelector("[name='เลขที่ใบงาน']");
            if (seqInput) seqInput.value = generateNextSequence(sheet);
            if (workNoInput) workNoInput.value = generateNextWorkNo();
            const openDateInput = form.querySelector("[name='วันที่เปิดงาน']");
            if (openDateInput) openDateInput.value = today;
        } else {
            const seqInput = form.querySelector("[name='ลำดับ']");
            if (seqInput) seqInput.value = generateNextSequence(sheet);
            const dateFields = ["วันที่", "วันที่แจ้งซ่อม", "วันที่เริ่มเช่า"];
            dateFields.forEach(fieldName => {
                const dateInput = form.querySelector(`[name='${fieldName}']`);
                if (dateInput) dateInput.value = today;
            });
        }
    }

    if (mode === "edit" && rowData) {
        form.querySelector("[name='id']").value = rowData.id;
        schemas[sheet].forEach(f => {
            const inp = form.querySelector(`[name='${f}']`);
            if (inp && rowData[f] !== undefined && rowData[f] !== null) {
                if (inp.type !== 'file') {
                    inp.value = rowData[f];

                    if (inp.type === 'hidden' && f.includes('ลายเซ็น') && rowData[f]) {
                        const existingPreview = inp.parentElement.querySelector('img.signature-preview');
                        if (existingPreview) {
                            existingPreview.src = rowData[f];
                        } else {
                            const sigImg = document.createElement('img');
                            sigImg.src = rowData[f];
                            sigImg.classList.add('preview', 'signature-preview');
                            inp.parentElement.insertBefore(sigImg, inp.parentElement.querySelector('button'));
                        }
                    }
                }
            }

            if (f.includes("รูปภาพ") && rowData[f]) {
                const img = form.querySelector(`label:has(input[name='${f}']) img`);
                if (img) img.src = rowData[f];
            }
        });
    }

    const btnSave = document.createElement("button");
    btnSave.type = "submit";
    btnSave.textContent = "บันทึก";
    btnSave.className = "btn-save";

    const btnCancel = document.createElement("button");
    btnCancel.type = "button";
    btnCancel.textContent = "ยกเลิก";
    btnCancel.onclick = closeModal;

    form.appendChild(btnSave);
    form.appendChild(btnCancel);

    let saving = false;

    form.onsubmit = async function (e) {
        e.preventDefault();
        if (saving) return;

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const validationErrors = validateFormData(sheet, data);
        if (validationErrors.length > 0) {
            showNotification(validationErrors.join('\n'), 'error');
            return;
        }

        saving = true;
        btnSave.disabled = true;
        btnSave.textContent = "กำลังบันทึก...";
        showLoading(true);

        try {
            const fileInputs = form.querySelectorAll('input[type="file"]');
            const imagePromises = [];

            fileInputs.forEach(input => {
                const file = input.files[0];
                const fieldName = input.name;

                if (file) {
                    imagePromises.push(
                        compressImage(file).then(compressedFile => 
                            toBase64(compressedFile).then(base64 => {
                                data[fieldName] = base64;
                            })
                        )
                    );
                } else if (mode === 'edit' && rowData && rowData[fieldName]) {
                    data[fieldName] = rowData[fieldName];
                }
            });

            const sigInputs = form.querySelectorAll('input[type="hidden"]');
            sigInputs.forEach(input => {
                const fieldName = input.name;
                if (fieldName.includes("ลายเซ็น")) {
                    if (input.value) {
                        data[fieldName] = input.value;
                    } else if (mode === 'edit' && rowData && rowData[fieldName]) {
                        data[fieldName] = rowData[fieldName];
                    }
                }
            });

            await Promise.all(imagePromises);

            data.id = data.id || crypto.randomUUID();

            const response = await fetch(scriptURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify({
                    action: "save",
                    sheet: sheet,
                    data: data
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                showNotification('บันทึกข้อมูลเรียบร้อย', 'success');
                form.reset();
                closeModal();
                loadSheetData(sheet);
            } else {
                throw new Error(result.error || 'เกิดข้อผิดพลาดในการบันทึก');
            }

        } catch (err) {
            console.error(err);
            showNotification('เกิดข้อผิดพลาด: ' + err.message, 'error');
        } finally {
            saving = false;
            btnSave.disabled = false;
            btnSave.textContent = "บันทึก";
            showLoading(false);
        }
    };
}

function closeModal() {
    document.getElementById("modal").classList.remove("show");
}

function createInput(name, type = "text") {
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    return input;
}

// ===== ลบข้อมูล =====
async function deleteRow(id, sheet) {
    if (!confirm("ต้องการลบข้อมูลนี้หรือไม่?")) return;

    try {
        showLoading(true);
        const response = await fetch(scriptURL, {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: "delete",
                sheet,
                id
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            showNotification('ลบข้อมูลเรียบร้อย', 'success');
            loadSheetData(sheet);
        } else {
            throw new Error(result.error || 'เกิดข้อผิดพลาดในการลบ');
        }

    } catch (error) {
        console.error(error);
        showNotification('เกิดข้อผิดพลาด: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}
// ===== PDF Generation (Fixed for Mobile) =====
let lastDoc = null;
let currentPDFRow = null;

// ฟังก์ชันตรวจสอบว่าเป็นมือถือหรือไม่
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// แก้ไขฟังก์ชัน previewPDF
function previewPDF(row) {
    currentPDFRow = row;
    
    if (isMobileDevice()) {
        // บนมือถือให้แสดง options
        showPDFOptions();
    } else {
        // บน desktop ใช้วิธีเดิม
        generateAndPreviewPDF(row);
    }
}

// แสดง options PDF
function showPDFOptions() {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.style.zIndex = '2000';
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center; max-width: 300px;">
            <h3 style="margin-bottom: 20px;">เลือกวิธีการดูรายงาน</h3>
            <button onclick="viewHTMLPDF()" style="padding: 12px; margin: 10px; width: 100%; background: #8e44ad; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
                📱 ดูในเว็บไซต์
            </button>
            <button onclick="downloadPDFFile()" style="padding: 12px; margin: 10px; width: 100%; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
                📄 ดาวน์โหลด PDF
            </button>
            <button onclick="closeModal()" style="padding: 12px; margin: 10px; width: 100%; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
                ❌ ยกเลิก
            </button>
        </div>
    `;
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    };
    document.body.appendChild(modal);
}

// ดู PDF ในรูปแบบ HTML
function viewHTMLPDF() {
    if (!currentPDFRow) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.style.zIndex = '2000';
    modal.style.background = 'white';
    
    const pdfContent = `
        <div style="max-width: 100%; height: 100vh; overflow: auto; padding: 20px; background: white;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <h2 style="margin: 0; color: #2c3e50;">📋 Service Report</h2>
                <div>
                    <button onclick="printPDF()" style="padding: 10px 15px; background: #3498db; color: white; border: none; border-radius: 4px; margin-right: 10px; cursor: pointer;">🖨️ พิมพ์</button>
                    <button onclick="closeModal()" style="padding: 10px 15px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">❌ ปิด</button>
                </div>
            </div>
            <div id="pdf-content" style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                ${createPDFHTMLContent(currentPDFRow)}
            </div>
        </div>
    `;
    
    modal.innerHTML = pdfContent;
    document.body.appendChild(modal);
}

// สร้างเนื้อหา HTML สำหรับ PDF
function createPDFHTMLContent(row) {
    const safeText = (val) => (val !== undefined && val !== null ? String(val) : '-');
    
    return `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #3498db;">
                <h1 style="color: #3498db; margin-bottom: 5px; font-size: 28px;">Service Report</h1>
                <p style="color: #7f8c8d; font-size: 16px;">เลขที่ใบงาน: ${safeText(row["เลขที่ใบงาน"])}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f8f9fa; width: 20%;">เลขที่ใบงาน</td>
                    <td style="padding: 12px; border: 1px solid #ddd; width: 30%;">${safeText(row["เลขที่ใบงาน"])}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f8f9fa; width: 20%;">ประเภทงาน</td>
                    <td style="padding: 12px; border: 1px solid #ddd; width: 30%;">${safeText(row["ประเภทงาน"])}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f8f9fa;">ชื่อโรงพยาบาล</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${safeText(row["ชื่อโรงพยาบาล"])}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f8f9fa;">วันที่เปิดงาน</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${safeText(row["วันที่เปิดงาน"])}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f8f9fa;">ชื่อเครื่อง</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${safeText(row["ชื่อเครื่อง"])}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f8f9fa;">ยี่ห้อ</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${safeText(row["ยี่ห้อ"])}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f8f9fa;">รุ่น</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${safeText(row["รุ่น"])}</td>
                    <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background: #f8f9fa;">หมายเลขเครื่อง</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${safeText(row["หมายเลขเครื่อง"])}</td>
                </tr>
            </table>
            
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px;">อุปกรณ์ที่ส่งมาด้วย</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #3498db;">
                    <p style="margin: 0; color: #2c3e50;">${safeText(row["อุปกรณ์ที่ส่งมาด้วย"])}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px;">อาการที่แจ้งเสีย</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #e74c3c;">
                    <p style="margin: 0; color: #2c3e50;">${safeText(row["อาการที่แจ้งเสีย"])}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px;">ผลการซ่อม</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #27ae60;">
                    <p style="margin: 0; color: #2c3e50;">${safeText(row["ผลการซ่อม"])}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px;">รับประกัน</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                    <p style="margin: 0; color: #2c3e50;">${safeText(row["รับประกัน"])}</p>
                </div>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd;">
                <div style="text-align: center; flex: 1; min-width: 200px;">
                    <div style="border-bottom: 2px solid #000; width: 200px; margin: 0 auto 15px; padding-bottom: 10px; font-weight: bold;">ลายเซ็นช่าง</div>
                    <div style="font-size: 16px; font-weight: bold; color: #2c3e50;">${safeText(row["ชื่อช่าง"])}</div>
                    <div style="color: #7f8c8d;">${safeText(row["เบอร์ช่าง"])}</div>
                </div>
                
                <div style="text-align: center; flex: 1; min-width: 200px;">
                    <div style="border-bottom: 2px solid #000; width: 200px; margin: 0 auto 15px; padding-bottom: 10px; font-weight: bold;">ลายเซ็นลูกค้า</div>
                    <div style="font-size: 16px; font-weight: bold; color: #2c3e50;">${safeText(row["名前ลูกค้า"])}</div>
                    <div style="color: #7f8c8d;">${safeText(row["เบอร์ลูกค้า"])}</div>
                </div>
            </div>
            
            <div style="margin-top: 30px; text-align: center; color: #7f8c8d; font-size: 12px; border-top: 1px solid #ddd; padding-top: 15px;">
                <p>เอกสารนี้ถูกสร้างขึ้นโดยระบบจัดการข้อมูล IDMS</p>
                <p>วันที่สร้าง: ${new Date().toLocaleDateString('th-TH')}</p>
            </div>
        </div>
    `;
}

// พิมพ์ PDF
function printPDF() {
    const content = document.getElementById('pdf-content');
    const originalContent = content.innerHTML;
    
    const printContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 20px;">
            ${content.innerHTML}
        </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Service Report - Print</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                @media print {
                    body { margin: 0; padding: 0; }
                    .no-print { display: none !important; }
                }
            </style>
        </head>
        <body>
            ${printContent}
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() {
                        window.close();
                    }, 500);
                }
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// ดาวน์โหลด PDF
function downloadPDFFile() {
    if (!currentPDFRow) return;
    
    try {
        const doc = generatePDF(currentPDFRow);
        if (!doc) return;
        
        const filename = `${currentPDFRow["เลขที่ใบงาน"] || 'service'}_report.pdf`;
        doc.save(filename);
        showNotification('กำลังดาวน์โหลด PDF...', 'success');
        
    } catch (error) {
        console.error('Error in downloadPDF:', error);
        showNotification('ไม่สามารถดาวน์โหลด PDF ได้', 'error');
    }
}

// ปิด modal
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (modal.style.zIndex === '2000') {
            modal.remove();
        }
    });
    currentPDFRow = null;
}

// ฟังก์ชัน generatePDF 
// ===== PDF Generation with Improved Table Design =====
function generatePDF(row) {
    try {
        const jsPDFLib = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
        const doc = new jsPDFLib();
        const safeText = (val) => (val !== undefined && val !== null ? String(val) : "");

        // ตรวจสอบและใช้ฟอนต์ไทย
        let hasThaiFont = false;
        try {
            if (typeof THSarabun !== 'undefined') {
                doc.addFileToVFS("THSarabun.ttf", THSarabun);
                doc.addFont("THSarabun.ttf", "THSarabun", "normal");
                
                if (typeof THSarabunBold !== 'undefined') {
                    doc.addFileToVFS("THSarabun-Bold.ttf", THSarabunBold);
                    doc.addFont("THSarabun-Bold.ttf", "THSarabun", "bold");
                }
                
                hasThaiFont = true;
                doc.setFont("THSarabun");
            }
        } catch (e) {
            console.log('ไม่สามารถโหลดฟอนต์ไทย:', e);
            doc.setFont("helvetica");
        }

        doc.setFontSize(12);
        let y = 10;

        // หัวข้อรายงาน
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 255);
        
        if (hasThaiFont && typeof THSarabunBold !== 'undefined') {
            doc.setFont("THSarabun", "bold");
        } else {
            doc.setFont(hasThaiFont ? "THSarabun" : "helvetica", "bold");
        }
        
        doc.text("รายงานการซ่อม", 105, y, { align: 'center' });
        y += 15;
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        
        if (hasThaiFont) {
            doc.setFont("THSarabun", "normal");
        } else {
            doc.setFont("helvetica", "normal");
        }

        // ===== ตารางข้อมูลหลัก =====
        const tableTop = y;
        const cellPadding = 5;
        const col1Width = 40; // ความกว้างคอลัมน์แรก
        const col2Width = 45; // ความกว้างคอลัมน์สอง
        const col3Width = 40; // ความกว้างคอลัมน์สาม  
        const col4Width = 45; // ความกว้างคอลัมน์สี่
        
        // ข้อมูลตาราง
        const tableData = [
            { label: "เลขที่ใบงาน", value: safeText(row["เลขที่ใบงาน"]), label2: "ประเภทงาน", value2: safeText(row["ประเภทงาน"]) },
            { label: "ชื่อโรงพยาบาล", value: safeText(row["ชื่อโรงพยาบาล"]), label2: "วันที่เปิดงาน", value2: safeText(row["วันที่เปิดงาน"]) },
            { label: "ชื่อเครื่อง", value: safeText(row["ชื่อเครื่อง"]), label2: "ยี่ห้อ", value2: safeText(row["ยี่ห้อ"]) },
            { label: "รุ่น", value: safeText(row["รุ่น"]), label2: "หมายเลขเครื่อง", value2: safeText(row["หมายเลขเครื่อง"]) },
            { label: "หมายเลขครุภัณฑ์", value: safeText(row["หมายเลขครุภัณฑ์"]), label2: "รับประกัน", value2: safeText(row["รับประกัน"]) }
        ];

        // วาดตาราง
        tableData.forEach((data, index) => {
            const rowY = tableTop + (index * 12);
            
            // เส้นกรอบแนวนอน
            doc.line(15, rowY, 195, rowY);
            
            // คอลัมน์ 1
            if (hasThaiFont && typeof THSarabunBold !== 'undefined') {
                doc.setFont("THSarabun", "bold");
            } else {
                doc.setFont(hasThaiFont ? "THSarabun" : "helvetica", "bold");
            }
            doc.text(data.label + ":", 20, rowY + 8);
            
            if (hasThaiFont) {
                doc.setFont("THSarabun", "normal");
            } else {
                doc.setFont("helvetica", "normal");
            }
            const value1Lines = doc.splitTextToSize(data.value || "-", col2Width - 10);
            doc.text(value1Lines, 20 + col1Width, rowY + 8);
            
            // คอลัมน์ 3
            if (hasThaiFont && typeof THSarabunBold !== 'undefined') {
                doc.setFont("THSarabun", "bold");
            } else {
                doc.setFont(hasThaiFont ? "THSarabun" : "helvetica", "bold");
            }
            doc.text(data.label2 + ":", 20 + col1Width + col2Width + 10, rowY + 8);
            
            if (hasThaiFont) {
                doc.setFont("THSarabun", "normal");
            } else {
                doc.setFont("helvetica", "normal");
            }
            const value2Lines = doc.splitTextToSize(data.value2 || "-", col4Width - 10);
            doc.text(value2Lines, 20 + col1Width + col2Width + col3Width, rowY + 8);
        });

        // เส้นกรอบสุดท้าย
        doc.line(15, tableTop + (tableData.length * 12), 195, tableTop + (tableData.length * 12));
        
        // เส้นกรอบแนวตั้ง
        doc.line(15, tableTop, 15, tableTop + (tableData.length * 12)); // ซ้าย
        doc.line(15 + col1Width, tableTop, 15 + col1Width, tableTop + (tableData.length * 12)); // ระหว่างคอลัมน์1-2
        doc.line(15 + col1Width + col2Width, tableTop, 15 + col1Width + col2Width, tableTop + (tableData.length * 12)); // ระหว่างคอลัมน์2-3
        doc.line(15 + col1Width + col2Width + col3Width, tableTop, 15 + col1Width + col2Width + col3Width, tableTop + (tableData.length * 12)); // ระหว่างคอลัมน์3-4
        doc.line(195, tableTop, 195, tableTop + (tableData.length * 12)); // ขวา

        y = tableTop + (tableData.length * 12) + 15;

        // ===== ข้อมูลเพิ่มเติม =====
        // อุปกรณ์ที่ส่งมาด้วย
        if (hasThaiFont && typeof THSarabunBold !== 'undefined') {
            doc.setFont("THSarabun", "bold");
        } else {
            doc.setFont(hasThaiFont ? "THSarabun" : "helvetica", "bold");
        }
        doc.text("อุปกรณ์ที่ส่งมาด้วย:", 20, y);
        
        if (hasThaiFont) {
            doc.setFont("THSarabun", "normal");
        } else {
            doc.setFont("helvetica", "normal");
        }
        
        // กรอบข้อมูลอุปกรณ์
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(248, 249, 250);
        doc.rect(20, y + 5, 170, 25, 'F');
        doc.setDrawColor(0, 0, 0);
        doc.rect(20, y + 5, 170, 25);
        
        const equipmentText = doc.splitTextToSize(safeText(row["อุปกรณ์ที่ส่งมาด้วย"] || "-"), 160);
        doc.text(equipmentText, 25, y + 15);
        y += 35;

        // อาการที่แจ้งเสีย
        if (hasThaiFont && typeof THSarabunBold !== 'undefined') {
            doc.setFont("THSarabun", "bold");
        } else {
            doc.setFont(hasThaiFont ? "THSarabun" : "helvetica", "bold");
        }
        doc.text("อาการที่แจ้งเสีย:", 20, y);
        
        // กรอบข้อมูลอาการ
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(255, 243, 245);
        doc.rect(20, y + 5, 170, 30, 'F');
        doc.setDrawColor(0, 0, 0);
        doc.rect(20, y + 5, 170, 30);
        
        if (hasThaiFont) {
            doc.setFont("THSarabun", "normal");
        } else {
            doc.setFont("helvetica", "normal");
        }
        
        const symptomText = doc.splitTextToSize(safeText(row["อาการที่แจ้งเสีย"] || "-"), 160);
        doc.text(symptomText, 25, y + 15);
        y += 40;

        // ผลการซ่อม
        if (hasThaiFont && typeof THSarabunBold !== 'undefined') {
            doc.setFont("THSarabun", "bold");
        } else {
            doc.setFont(hasThaiFont ? "THSarabun" : "helvetica", "bold");
        }
        doc.text("ผลการซ่อม:", 20, y);
        
        // กรอบข้อมูลผลการซ่อม
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(237, 247, 249);
        doc.rect(20, y + 5, 170, 30, 'F');
        doc.setDrawColor(0, 0, 0);
        doc.rect(20, y + 5, 170, 30);
        
        if (hasThaiFont) {
            doc.setFont("THSarabun", "normal");
        } else {
            doc.setFont("helvetica", "normal");
        }
        
        const resultText = doc.splitTextToSize(safeText(row["ผลการซ่อม"] || "-"), 160);
        doc.text(resultText, 25, y + 15);
        y += 40;

        // ===== ลายเซ็น =====
        const signatureY = y;
        
        // ตารางลายเซ็น
        doc.setDrawColor(150, 150, 150);
        doc.line(20, signatureY, 95, signatureY);
        doc.line(115, signatureY, 190, signatureY);
        
        doc.line(20, signatureY, 20, signatureY + 40);
        doc.line(95, signatureY, 95, signatureY + 40);
        doc.line(115, signatureY, 115, signatureY + 40);
        doc.line(190, signatureY, 190, signatureY + 40);
        doc.line(20, signatureY + 40, 95, signatureY + 40);
        doc.line(115, signatureY + 40, 190, signatureY + 40);

        if (hasThaiFont && typeof THSarabunBold !== 'undefined') {
            doc.setFont("THSarabun", "bold");
        } else {
            doc.setFont(hasThaiFont ? "THSarabun" : "helvetica", "bold");
        }
        doc.text("ลายเซ็นช่าง", 57.5, signatureY + 10, { align: "center" });
        doc.text("ลายเซ็นลูกค้า", 152.5, signatureY + 10, { align: "center" });
        
        if (hasThaiFont) {
            doc.setFont("THSarabun", "normal");
        } else {
            doc.setFont("helvetica", "normal");
        }
        
        // ข้อมูลช่าง
        const companyName = row["ชื่อช่าง"] || "-";
        const companyPhone = row["เบอร์ช่าง"] || "-";
        doc.text(`ชื่อ: ${companyName}`, 57.5, signatureY + 20, { align: "center" });
        doc.text(`เบอร์โทร: ${companyPhone}`, 57.5, signatureY + 28, { align: "center" });
        
        // ข้อมูลลูกค้า
        const customerName = row["ชื่อลูกค้า"] || "-";
        const customerPhone = row["เบอร์ลูกค้า"] || "-";
        doc.text(`ชื่อ: ${customerName}`, 152.5, signatureY + 20, { align: "center" });
        doc.text(`เบอร์โทร: ${customerPhone}`, 152.5, signatureY + 28, { align: "center" });

        // รูปภาพลายเซ็น (ถ้ามี)
        try {
            if (row["ลายเซ็นช่าง"]) {
                doc.addImage(row["ลายเซ็นช่าง"], 'JPEG', 35, signatureY + 5, 25, 15);
            }
            if (row["ลายเซ็นลูกค้า"]) {
                doc.addImage(row["ลายเซ็นลูกค้า"], 'JPEG', 130, signatureY + 5, 25, 15);
            }
        } catch (e) {
            console.log('ไม่สามารถเพิ่มลายเซ็นใน PDF:', e);
        }

        y = signatureY + 50;

        // ===== หมายเหตุ =====
        if (row["หมายเหตุ"]) {
            if (hasThaiFont && typeof THSarabunBold !== 'undefined') {
                doc.setFont("THSarabun", "bold");
            } else {
                doc.setFont(hasThaiFont ? "THSarabun" : "helvetica", "bold");
            }
            doc.text("หมายเหตุ:", 20, y);
            
            // กรอบหมายเหตุ
            doc.setDrawColor(200, 200, 200);
            doc.setFillColor(255, 249, 230);
            doc.rect(20, y + 5, 170, 20, 'F');
            doc.setDrawColor(0, 0, 0);
            doc.rect(20, y + 5, 170, 20);
            
            if (hasThaiFont) {
                doc.setFont("THSarabun", "normal");
            } else {
                doc.setFont("helvetica", "normal");
            }
            
            const noteText = doc.splitTextToSize(safeText(row["หมายเหตุ"]), 160);
            doc.text(noteText, 25, y + 15);
            y += 30;
        }

        // ===== Footer =====
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("เอกสารนี้ถูกสร้างขึ้นโดยระบบจัดการข้อมูล IDMS", 105, y + 10, { align: "center" });
        doc.text(`วันที่สร้าง: ${new Date().toLocaleDateString('th-TH')}`, 105, y + 16, { align: "center" });

        return doc;
    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('เกิดข้อผิดพลาดในการสร้าง PDF', 'error');
        return null;
    }
}

// ===== Signature System =====
let currentSignatureInput = null;

function openSignature(input) {
    currentSignatureInput = input;
    const popup = document.getElementById("signature-popup");
    if (!popup) {
        createSignaturePopup();
    }

    popup.classList.add("show");
    const sigPad = document.getElementById("signature-pad");
    const sigCtx = sigPad.getContext("2d");

    sigCtx.clearRect(0, 0, sigPad.width, sigPad.height);
    sigCtx.fillStyle = "white";
    sigCtx.fillRect(0, 0, sigPad.width, sigPad.height);

    sigCtx.strokeStyle = "black";
    sigCtx.lineWidth = 2;
    sigCtx.lineCap = "round";
    sigCtx.lineJoin = "round";

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    const newSigPad = sigPad.cloneNode(true);
    sigPad.parentNode.replaceChild(newSigPad, sigPad);
    const newSigCtx = newSigPad.getContext("2d");

    newSigCtx.clearRect(0, 0, newSigPad.width, newSigPad.height);
    newSigCtx.fillStyle = "white";
    newSigCtx.fillRect(0, 0, newSigPad.width, newSigPad.height);
    newSigCtx.strokeStyle = "black";
    newSigCtx.lineWidth = 2;
    newSigCtx.lineCap = "round";
    newSigCtx.lineJoin = "round";

    newSigPad.onmousedown = e => {
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
        newSigCtx.beginPath();
        newSigCtx.moveTo(lastX, lastY);
    };

    newSigPad.onmousemove = e => {
        if (!drawing) return;
        newSigCtx.lineTo(e.offsetX, e.offsetY);
        newSigCtx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    newSigPad.onmouseup = () => {
        drawing = false;
    };

    newSigPad.onmouseout = () => {
        drawing = false;
    };

    newSigPad.ontouchstart = e => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = newSigPad.getBoundingClientRect();
        drawing = true;
        [lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
        newSigCtx.beginPath();
        newSigCtx.moveTo(lastX, lastY);
    };

    newSigPad.ontouchmove = e => {
        e.preventDefault();
        if (!drawing) return;
        const touch = e.touches[0];
        const rect = newSigPad.getBoundingClientRect();
        const currentX = touch.clientX - rect.left;
        const currentY = touch.clientY - rect.top;
        newSigCtx.lineTo(currentX, currentY);
        newSigCtx.stroke();
        [lastX, lastY] = [currentX, currentY];
    };

    newSigPad.ontouchend = e => {
        e.preventDefault();
        drawing = false;
    };

    updateSignatureButtons(newSigPad);
}

function createSignaturePopup() {
    const popup = document.createElement('div');
    popup.id = 'signature-popup';
    popup.className = 'signature-popup';
    popup.innerHTML = `
        <div class="signature-content">
            <h3>ลายเซ็น</h3>
            <canvas id="signature-pad" width="400" height="200"></canvas>
            <div class="signature-buttons">
                <button type="button" class="clear-btn" onclick="clearSignature()">ล้าง</button>
                <button type="button" class="save-sig-btn" onclick="saveSignature()">บันทึก</button>
                <button type="button" class="cancel-sig-btn" onclick="closeSignature()">ยกเลิก</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}

function updateSignatureButtons(sigPad) {
    const popup = document.getElementById("signature-popup");
    const clearBtn = popup.querySelector('.clear-btn');
    const saveBtn = popup.querySelector('.save-sig-btn');

    clearBtn.onclick = () => clearSignature(sigPad);
    saveBtn.onclick = () => saveSignature(sigPad);
}

function clearSignature(sigPad = null) {
    const canvas = sigPad || document.getElementById("signature-pad");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveSignature(sigPad = null) {
    const canvas = sigPad || document.getElementById("signature-pad");
    const dataURL = canvas.toDataURL();

    if (currentSignatureInput) {
        currentSignatureInput.value = dataURL;

        const existingPreview = currentSignatureInput.parentElement.querySelector('img.signature-preview');
        if (existingPreview) {
            existingPreview.src = dataURL;
        } else {
            const sigImg = document.createElement('img');
            sigImg.src = dataURL;
            sigImg.classList.add('preview', 'signature-preview');
            sigImg.onclick = () => openImageModal(dataURL);
            currentSignatureInput.parentElement.insertBefore(sigImg, currentSignatureInput.parentElement.querySelector('button'));
        }

        showNotification('บันทึกลายเซ็นเรียบร้อย', 'success');
    }

    closeSignature();
}

function closeSignature() {
    document.getElementById("signature-popup").classList.remove("show");
    currentSignatureInput = null;
}

// ===== Search and Filter =====
function addSearchFilters() {
    const container = document.getElementById("tables-container");
    const searchDiv = document.createElement("div");
    searchDiv.innerHTML = `
        <div style="background: white; padding: 15px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="margin-bottom: 10px;">ค้นหาข้อมูล</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <select id="search-sheet" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">เลือกตาราง</option>
                    ${sheetsOrder.map(sheet => `<option value="${sheet}">${sheet.toUpperCase()}</option>`).join('')}
                </select>
                <input type="text" id="search-input" placeholder="ค้นหา..." style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; flex: 1; min-width: 200px;">
                <button onclick="performSearch()" style="padding: 8px 16px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">ค้นหา</button>
                <button onclick="clearSearch()" style="padding: 8px 16px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">ล้าง</button>
            </div>
        </div>
    `;
    container.insertBefore(searchDiv, container.firstChild);
}

function performSearch() {
    const sheet = document.getElementById("search-sheet").value;
    const searchTerm = document.getElementById("search-input").value.toLowerCase().trim();

    if (!sheet || !searchTerm) {
        showNotification('กรุณาเลือกตารางและใส่คำค้นหา', 'warning');
        return;
    }

    const data = currentData[sheet] || [];
    const filteredData = data.filter(row => {
        return Object.values(row).some(value => 
            String(value || '').toLowerCase().includes(searchTerm)
        );
    });

    renderTable(sheet, filteredData);
    showNotification(`พบข้อมูล ${filteredData.length} รายการ`, 'info');
}

function clearSearch() {
    document.getElementById("search-sheet").value = '';
    document.getElementById("search-input").value = '';

    sheetsOrder.forEach(sheet => {
        renderTable(sheet, currentData[sheet] || []);
    });

    showNotification('ล้างการค้นหาเรียบร้อย', 'success');
}

// ===== Export Functions =====
function addExportButtons() {
    const container = document.getElementById("tables-container");
    const exportDiv = document.createElement("div");
    exportDiv.innerHTML = `
        <div style="background: white; padding: 15px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="margin-bottom: 10px;">ส่งออกข้อมูล</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <select id="export-sheet" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="">เลือกตาราง</option>
                    ${sheetsOrder.map(sheet => `<option value="${sheet}">${sheet.toUpperCase()}</option>`).join('')}
                </select>
                <button onclick="exportToCSV()" style="padding: 8px 16px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">ส่งออก CSV</button>
                <button onclick="exportToJSON()" style="padding: 8px 16px; background: #8e44ad; color: white; border: none; border-radius: 4px; cursor: pointer;">ส่งออก JSON</button>
            </div>
        </div>
    `;
    container.insertBefore(exportDiv, container.firstChild);
}

function exportToCSV() {
    const sheet = document.getElementById("export-sheet").value;
    if (!sheet) {
        showNotification('กรุณาเลือกตาราง', 'warning');
        return;
    }

    const data = currentData[sheet] || [];
    if (data.length === 0) {
        showNotification('ไม่มีข้อมูลให้ส่งออก', 'warning');
        return;
    }

    const headers = schemas[sheet].filter(h => h !== 'id');
    let csv = headers.join(',') + '\n';

    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header] || '';
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        });
        csv += values.join(',') + '\n';
    });

    downloadFile(csv, `${sheet}_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
    showNotification(`ส่งออก CSV สำเร็จ (${data.length} รายการ)`, 'success');
}

function exportToJSON() {
    const sheet = document.getElementById("export-sheet").value;
    if (!sheet) {
        showNotification('กรุณาเลือกตาราง', 'warning');
        return;
    }

    const data = currentData[sheet] || [];
    if (data.length === 0) {
        showNotification('ไม่มีข้อมูลให้ส่งออก', 'warning');
        return;
    }

    const jsonData = JSON.stringify(data, null, 2);
    downloadFile(jsonData, `${sheet}_${new Date().toISOString().split('T')[0]}.json`, 'application/json');
    showNotification(`ส่งออก JSON สำเร็จ (${data.length} รายการ)`, 'success');
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// ===== Statistics =====
function addStatistics() {
    const container = document.getElementById("tables-container");
    const statsDiv = document.createElement("div");
    statsDiv.innerHTML = `
        <div style="background: white; padding: 15px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="margin-bottom: 10px;">สถิติข้อมูล</h3>
            <div id="statistics-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
            </div>
        </div>
    `;
    container.insertBefore(statsDiv, container.firstChild);
    updateStatistics();
}

function updateStatistics() {
    const statsContent = document.getElementById("statistics-content");
    if (!statsContent) return;

    let html = '';

    sheetsOrder.forEach(sheet => {
        const data = currentData[sheet] || [];
        const count = data.length;

        html += `
            <div style="text-align: center; padding: 10px; background: #ecf0f1; border-radius: 4px;">
                <div style="font-size: 24px; font-weight: bold; color: #2c3e50;">${count}</div>
                <div style="color: #7f8c8d; text-transform: uppercase; font-size: 12px;">${sheet}</div>
            </div>
        `;
    });

    const today = new Date().toISOString().split('T')[0];
    const todayService = (currentData.service || []).filter(row => row['วันที่เปิดงาน'] === today).length;
    const todayRequest = (currentData.request || []).filter(row => row['วันที่แจ้งซ่อม'] === today).length;

    html += `
        <div style="text-align: center; padding: 10px; background: #e8f8f5; border-radius: 4px; border-left: 4px solid #27ae60;">
            <div style="font-size: 24px; font-weight: bold; color: #27ae60;">${todayService}</div>
            <div style="color: #27ae60; font-size: 12px;">งานวันนี้</div>
        </div>
        <div style="text-align: center; padding: 10px; background: #fef9e7; border-radius: 4px; border-left: 4px solid #f39c12;">
            <div style="font-size: 24px; font-weight: bold; color: #f39c12;">${todayRequest}</div>
            <div style="color: #f39c12; font-size: 12px;">แจ้งซ่อมวันนี้</div>
        </div>
    `;

    statsContent.innerHTML = html;
}

// ===== Auto-refresh =====
let autoRefreshInterval = null;

function enableAutoRefresh(intervalMinutes = 5) {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }

    autoRefreshInterval = setInterval(() => {
        console.log('Auto refreshing data...');
        sheetsOrder.forEach(sheet => {
            loadSheetData(sheet);
        });
        updateStatistics();
    }, intervalMinutes * 60 * 1000);

    showNotification(`เปิดการอัพเดทอัตโนมัติทุก ${intervalMinutes} นาที`, 'info');
}

function disableAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
        showNotification('ปิดการอัพเดทอัตโนมัติ', 'info');
    }
}

// ===== Dynamic CSS =====
function addDynamicCSS() {
    if (document.getElementById('dynamic-styles')) return;

    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 600;
            z-index: 3000;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            white-space: pre-line;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }
        
        .notification.info { background: #3498db; }
        .notification.success { background: #27ae60; }
        .notification.error { background: #e74c3c; }
        .notification.warning { background: #f39c12; }
        
        .loader {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2500;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #ecf0f1;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .signature-popup {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 2000;
        }
        
        .signature-popup.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .signature-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        
        #signature-pad {
            border: 2px solid #3498db;
            border-radius: 4px;
            margin: 10px 0;
            cursor: crosshair;
            background: white;
        }
        
        .signature-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 15px;
        }
        
        .signature-buttons button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .clear-btn { background: #e74c3c; color: white; }
        .clear-btn:hover { background: #c0392b; }
        .save-sig-btn { background: #27ae60; color: white; }
        .save-sig-btn:hover { background: #2ecc71; }
        .cancel-sig-btn { background: #95a5a6; color: white; }
        .cancel-sig-btn:hover { background: #7f8c8d; }
        
        select {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            background: white;
            min-width: 150px;
        }
        
        select:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
        }
        
        .preview {
            max-width: 100px;
            max-height: 100px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-top: 5px;
            cursor: pointer;
            object-fit: cover;
        }
        
        .signature-preview {
            max-width: 150px;
            max-height: 75px;
            border: 2px solid #3498db;
        }
        
        @media (max-width: 768px) {
            #signature-pad {
                width: 300px;
                height: 150px;
            }
            
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
                font-size: 14px;
            }
            
            select {
                min-width: 120px;
                font-size: 13px;
            }
            
            .preview {
                max-width: 80px;
                max-height: 80px;
            }
        }
        
        .data-table td img.preview {
            max-width: 60px;
            max-height: 60px;
            border-radius: 4px;
            object-fit: cover;
        }
    `;
    document.head.appendChild(style);
}

// ===== Start Application =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Fallback logo variable
const logoBase64 = typeof logoBase64 !== 'undefined' ? logoBase64 : '';