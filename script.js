/* ==========================================
LỚP TOÁN THẦY LỰC - CƠ SỞ DỮ LIỆU TÁCH BIỆT THEO LỚP
========================================== */

const defaultData = {
    "9": {
        "20233513": { name: "Nguyễn Văn A", score: 8.5, comment: "Em có kết quả học tập tốt." },
        "20233514": { name: "Trần Văn B", score: 7.25, comment: "Cần luyện tập thêm bài tập nâng cao." }
    },
    "8": {
        "8001": { name: "Lê Văn C", score: 9.0, comment: "Bài làm xuất sắc, tư duy tốt." }
    },
    "7": {
        "7001": { name: "Phạm Văn D", score: 8.0, comment: "Trình bày cẩn thận, rõ ràng." }
    },
    "6": {
        "6001": { name: "Hoàng Văn E", score: 8.5, comment: "Hoàn thành tốt bài thi." }
    }
};

/* Đọc dữ liệu từ LocalStorage hoặc gán mặc định */
let classDatabase = JSON.parse(localStorage.getItem("thayLuc_multiclass_db")) || defaultData;

function saveDatabase() {
    localStorage.setItem("thayLuc_multiclass_db", JSON.stringify(classDatabase));
    renderAdminTable();
}

/* LẤY DOM ELEMENTS */
const searchSection = document.getElementById("searchSection");
const resultSection = document.getElementById("resultSection");
const adminSection = document.getElementById("adminSection");

const classSelect = document.getElementById("classSelect");
const studentIdInput = document.getElementById("studentId");
const searchButton = document.getElementById("searchButton");
const errorMessage = document.getElementById("errorMessage");

const studentName = document.getElementById("studentName");
const resultStudentId = document.getElementById("resultStudentId");
const resultClassName = document.getElementById("resultClassName");
const resultClassTitle = document.getElementById("resultClassTitle");
const studentScore = document.getElementById("studentScore");
const teacherComment = document.getElementById("teacherComment");
const backButton = document.getElementById("backButton");

/* ADMIN DOM ELEMENTS */
const adminLoginBtn = document.getElementById("adminLoginBtn");
const closeAdminBtn = document.getElementById("closeAdminBtn");
const adminClassSelect = document.getElementById("adminClassSelect");
const currentClassLabel = document.getElementById("currentClassLabel");
const studentForm = document.getElementById("studentForm");
const formStudentId = document.getElementById("formStudentId");
const formStudentName = document.getElementById("formStudentName");
const formStudentScore = document.getElementById("formStudentScore");
const formStudentComment = document.getElementById("formStudentComment");
const deleteStudentBtn = document.getElementById("deleteStudentBtn");
const studentTableBody = document.getElementById("studentTableBody");
const totalStudentsCount = document.getElementById("totalStudentsCount");
const excelFileInput = document.getElementById("excelFileInput");
const downloadTemplateBtn = document.getElementById("downloadTemplateBtn");

/* ==========================================
HÀM TRA CỨU HỌC SINH
========================================== */
function searchResult() {
    const selectedClass = classSelect.value;
    const studentId = studentIdInput.value.trim();
    errorMessage.textContent = "";

    if (studentId === "") {
        errorMessage.textContent = "Vui lòng nhập mã số học sinh.";
        return;
    }

    const currentClassData = classDatabase[selectedClass] || {};
    const student = currentClassData[studentId];

    if (!student) {
        errorMessage.textContent = `Không tìm thấy mã số ${studentId} trong dữ liệu Lớp ${selectedClass}!`;
        return;
    }

    /* Đưa thông tin lên giao diện */
    studentName.textContent = student.name;
    resultStudentId.textContent = studentId;
    resultClassName.textContent = `Lớp ${selectedClass}`;
    resultClassTitle.textContent = `KẾT QUẢ THI - LỚP ${selectedClass}`;
    studentScore.textContent = student.score;
    teacherComment.textContent = student.comment || "Chưa có nhận xét.";

    searchSection.classList.add("hidden");
    adminSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
}

/* ==========================================
QUẢN LÝ ADMIN
========================================== */
adminLoginBtn.addEventListener("click", () => {
    const pass = prompt("Nhập mật khẩu truy cập Admin (Mặc định: 123456):");
    if (pass === "123456") {
        searchSection.classList.add("hidden");
        resultSection.classList.add("hidden");
        adminSection.classList.remove("hidden");
        renderAdminTable();
    } else if (pass !== null) {
        alert("Mật khẩu không chính xác!");
    }
});

closeAdminBtn.addEventListener("click", () => {
    adminSection.classList.add("hidden");
    searchSection.classList.remove("hidden");
    resetForm();
});

adminClassSelect.addEventListener("change", () => {
    renderAdminTable();
    resetForm();
});

function renderAdminTable() {
    const currentClass = adminClassSelect.value;
    currentClassLabel.textContent = `Lớp ${currentClass}`;
    
    if (!classDatabase[currentClass]) {
        classDatabase[currentClass] = {};
    }

    const classData = classDatabase[currentClass];
    studentTableBody.innerHTML = "";
    const keys = Object.keys(classData);
    totalStudentsCount.textContent = keys.length;

    keys.forEach(id => {
        const s = classData[id];
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><b>${id}</b></td>
            <td>${s.name}</td>
            <td><strong style="color: #5a67d8;">${s.score}</strong></td>
            <td>${s.comment || ""}</td>
            <td><button class="edit-btn" onclick="editStudent('${id}')">Sửa</button></td>
        `;
        studentTableBody.appendChild(tr);
    });
}

function editStudent(id) {
    const currentClass = adminClassSelect.value;
    const s = classDatabase[currentClass][id];
    if (s) {
        formStudentId.value = id;
        formStudentName.value = s.name;
        formStudentScore.value = s.score;
        formStudentComment.value = s.comment || "";
        deleteStudentBtn.classList.remove("hidden");
    }
}

studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentClass = adminClassSelect.value;
    const id = formStudentId.value.trim();
    const name = formStudentName.value.trim();
    const score = parseFloat(formStudentScore.value);
    const comment = formStudentComment.value.trim();

    if (!id || !name || isNaN(score)) {
        alert("Vui lòng điền đầy đủ Mã HS, Họ Tên và Điểm số!");
        return;
    }

    if (!classDatabase[currentClass]) {
        classDatabase[currentClass] = {};
    }

    classDatabase[currentClass][id] = { name, score, comment };
    saveDatabase();
    resetForm();
    alert(`Đã lưu học sinh vào Lớp ${currentClass} thành công!`);
});

deleteStudentBtn.addEventListener("click", () => {
    const currentClass = adminClassSelect.value;
    const id = formStudentId.value.trim();
    if (id && classDatabase[currentClass][id]) {
        if (confirm(`Xóa học sinh mã ${id} khỏi Lớp ${currentClass}?`)) {
            delete classDatabase[currentClass][id];
            saveDatabase();
            resetForm();
        }
    }
});

function resetForm() {
    studentForm.reset();
    deleteStudentBtn.classList.add("hidden");
}

/* ==========================================
IMPORT EXCEL THEO TỪNG LỚP
========================================== */
excelFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const currentClass = adminClassSelect.value;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            if (!classDatabase[currentClass]) {
                classDatabase[currentClass] = {};
            }

            let count = 0;
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row && row.length >= 3) {
                    const id = String(row[0]).trim();
                    const name = String(row[1]).trim();
                    const score = parseFloat(row[2]);
                    const comment = row[3] ? String(row[3]).trim() : "";

                    if (id && name && !isNaN(score)) {
                        classDatabase[currentClass][id] = { name, score, comment };
                        count++;
                    }
                }
            }
            saveDatabase();
            alert(`Đã import thành công ${count} học sinh vào Lớp ${currentClass}!`);
            excelFileInput.value = "";
        } catch (err) {
            alert("Lỗi đọc file Excel! Hãy kiểm tra định dạng file.");
            console.error(err);
        }
    };
    reader.readAsArrayBuffer(file);
});

/* TẢI EXCEL MẪU */
downloadTemplateBtn.addEventListener("click", () => {
    const currentClass = adminClassSelect.value;
    const templateData = [
        ["Mã Học Sinh", "Họ Và Tên", "Điểm Số", "Nhận Xét"],
        ["20233513", "Nguyễn Văn A", 8.5, "Học tập tốt, tiếp tục phát huy."],
        ["20233514", "Trần Văn B", 7.25, "Cần làm thêm bài tập nâng cao."]
    ];
    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Danh_Sach_Lop_${currentClass}`);
    XLSX.writeFile(wb, `Mau_Danh_Sach_Diem_Lop_${currentClass}.xlsx`);
});

/* SỰ KIỆN NÚT VÀ PHÍM */
searchButton.addEventListener("click", searchResult);

studentIdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchResult();
});

backButton.addEventListener("click", () => {
    resultSection.classList.add("hidden");
    searchSection.classList.remove("hidden");
    studentIdInput.value = "";
    errorMessage.textContent = "";
});