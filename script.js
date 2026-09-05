/* ==========================================
LỚP TOÁN THẦY LỰC - LỚP 9
DỮ LIỆU BẮT ĐẦU MẶC ĐỊNH
========================================== */

const defaultStudents = {
    "20233513": {
        name: "Nguyễn Văn A",
        score: 8.5,
        comment: "Em có kết quả học tập tốt. Cần tiếp tục phát huy khả năng và duy trì tinh thần học tập."
    },
    "20233514": {
        name: "Trần Văn B",
        score: 7.25,
        comment: "Em đã nắm được kiến thức cơ bản. Cần dành thêm thời gian luyện tập các bài tập nâng cao."
    },
    "20233515": {
        name: "Lê Văn C",
        score: 9.0,
        comment: "Em có kết quả rất tốt. Bài làm chính xác và trình bày rõ ràng. Tiếp tục phát huy."
    }
};

/* Khởi tạo từ LocalStorage hoặc dữ liệu mặc định */
let students = JSON.parse(localStorage.getItem("thayLuc_students")) || defaultStudents;

function saveToLocalStorage() {
    localStorage.setItem("thayLuc_students", JSON.stringify(students));
    renderAdminTable();
}

/* LẤY CÁC PHẦN TỬ DOM */
const searchSection = document.getElementById("searchSection");
const resultSection = document.getElementById("resultSection");
const adminSection = document.getElementById("adminSection");

const studentIdInput = document.getElementById("studentId");
const searchButton = document.getElementById("searchButton");
const errorMessage = document.getElementById("errorMessage");

const studentName = document.getElementById("studentName");
const resultStudentId = document.getElementById("resultStudentId");
const studentScore = document.getElementById("studentScore");
const teacherComment = document.getElementById("teacherComment");
const backButton = document.getElementById("backButton");

/* ADMIN DOM */
const adminLoginBtn = document.getElementById("adminLoginBtn");
const closeAdminBtn = document.getElementById("closeAdminBtn");
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
    const studentId = studentIdInput.value.trim();
    errorMessage.textContent = "";

    if (studentId === "") {
        errorMessage.textContent = "Vui lòng nhập mã số học sinh.";
        return;
    }

    const student = students[studentId];

    if (!student) {
        errorMessage.textContent = "Không tìm thấy kết quả của mã số: " + studentId;
        return;
    }

    studentName.textContent = student.name;
    resultStudentId.textContent = studentId;
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

function renderAdminTable() {
    studentTableBody.innerHTML = "";
    const keys = Object.keys(students);
    totalStudentsCount.textContent = keys.length;

    keys.forEach(id => {
        const s = students[id];
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
    const s = students[id];
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
    const id = formStudentId.value.trim();
    const name = formStudentName.value.trim();
    const score = parseFloat(formStudentScore.value);
    const comment = formStudentComment.value.trim();

    if (!id || !name || isNaN(score)) {
        alert("Vui lòng điền đầy đủ Mã HS, Họ Tên và Điểm số!");
        return;
    }

    students[id] = { name, score, comment };
    saveToLocalStorage();
    resetForm();
    alert("Đã lưu thông tin học sinh thành công!");
});

deleteStudentBtn.addEventListener("click", () => {
    const id = formStudentId.value.trim();
    if (id && students[id]) {
        if (confirm(`Bạn có chắc chắn muốn xóa học sinh mã ${id}?`)) {
            delete students[id];
            saveToLocalStorage();
            resetForm();
        }
    }
});

function resetForm() {
    studentForm.reset();
    deleteStudentBtn.classList.add("hidden");
}

/* ==========================================
IMPORT EXCEL / CSV
========================================== */
excelFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            let count = 0;
            // Bỏ qua tiêu đề dòng 0
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row && row.length >= 3) {
                    const id = String(row[0]).trim();
                    const name = String(row[1]).trim();
                    const score = parseFloat(row[2]);
                    const comment = row[3] ? String(row[3]).trim() : "";

                    if (id && name && !isNaN(score)) {
                        students[id] = { name, score, comment };
                        count++;
                    }
                }
            }
            saveToLocalStorage();
            alert(`Đã import thành công ${count} học sinh từ file Excel!`);
            excelFileInput.value = "";
        } catch (err) {
            alert("Đã xảy ra lỗi khi đọc file Excel. Vui lòng kiểm tra lại định dạng file!");
            console.error(err);
        }
    };
    reader.readAsArrayBuffer(file);
});

/* TẢI EXCEL MẪU */
downloadTemplateBtn.addEventListener("click", () => {
    const templateData = [
        ["Mã Học Sinh", "Họ Và Tên", "Điểm Số", "Nhận Xét"],
        ["20233513", "Nguyễn Văn A", 8.5, "Học tập tốt, tiếp tục phát huy."],
        ["20233514", "Trần Văn B", 7.25, "Cần làm thêm bài tập nâng cao."]
    ];
    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Danh_Sach");
    XLSX.writeFile(wb, "Mau_Danh_Sach_Diem_Thay_Luc.xlsx");
});

/* ==========================================
SỰ KIỆN KHÁC
========================================== */
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