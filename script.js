/* ==========================================
LỚP TOÁN THẦY LỰC - CƠ SỞ DỮ LIỆU TỰ ĐỘNG LƯU TRỰC TIẾP
========================================== */

// Dữ liệu học sinh LỚP 9
const class9Students = {
    "111111": { name: "Nguyễn Thị Vân Anh", score: 0, comment: "Học tập tốt, tiếp tục phát huy.", tuition: "290.000 VNĐ" },
    "151212": { name: "Lê Qúy Việt", score: 3.0, comment: "Hay nói chuyện riêng trong giờ, không chú ý nghe giảng bài, về nhà không làm bài tập.", tuition: "0 VNĐ" },
    "310212": { name: "Nguyễn Thị Yến Nhi", score: 7.0, comment: "Khả năng hiểu bài mức khá, chú ý cần trật tự và chú ý nghe giảng hơn.", tuition: "330.000 VNĐ" },
    "201012": { name: "Nguyễn Thị Thu Hoài", score: 8.0, comment: "Ham học hỏi, chú ý nghe giảng và xây dựng bài tốt.", tuition: "330.000 VNĐ" },
    "191212": { name: "Nguyễn Thị Hải Yến", score: 5.0, comment: "Học tập tốt, tiếp tục phát huy. Cần cố gắng làm bài tập đầy đủ hơn nữa.", tuition: "330.000 VNĐ" },
    "304212": { name: "Trần Thị Kim Anh", score: 7.5, comment: "Khả năng hiểu bài mức khá, chú ý cần trật tự và chú ý nghe giảng hơn.", tuition: "250.000 VNĐ" },
    "189204": { name: "Lê Thị Hà", score: 8.0, comment: "Học tập tốt, tiếp tục phát huy.", tuition: "0 VNĐ" },
    "222222": { name: "Nguyễn Thị Phương Linh", score: 0, comment: "", tuition: "210.000 VNĐ" },
    "101112": { name: "Vũ Bảo Ngọc", score: 8.5, comment: "Học tập tốt, tiếp tục phát huy.", tuition: "330.000 VNĐ" },
    "290812": { name: "Vũ Thị Trà My", score: 5.0, comment: "Ham học hỏi, trật tự. Tuy nhiên cần làm bài tập về nhà đầy đủ hơn.", tuition: "290.000 VNĐ" },
    "251212": { name: "Vũ Thị Thanh Trúc", score: 3.5, comment: "Hay nói chuyện riêng trong giờ, không chú ý nghe giảng bài, về nhà không làm bài tập.", tuition: "0 VNĐ" },
    "333333": { name: "Vũ Đình Ngọc Anh", score: 0, comment: "", tuition: "380.000 VNĐ" },
    "121212": { name: "Lê Thị Thùy Trang", score: 4.0, comment: "Hiểu bài chưa nhanh, hay mất tập trung và mất trật tự. Cần chú ý bài giảng hơn.", tuition: "340.000 VNĐ" }
};

// Dữ liệu học sinh LỚP 8 (Cập nhật từ bảng ảnh)
const class8Students = {
    "123456": { name: "Nguyễn Quang Vinh", score: 3.0, comment: "Hay mất tập trung không nghe giảng và làm bài tập. Cần chú ý hơn rất nhiều.", tuition: "290.000 VNĐ" },
    "233211": { name: "Nguyễn Thị Thu Hằng", score: 6.5, comment: "Tiếp thu nhanh, tuy nhiên còn hay mất tập trung và mất trật tự.", tuition: "290.000 VNĐ" },
    "923820": { name: "Nguyễn Thùy Linh", score: 2.0, comment: "Không theo dõi bài, hay ngủ trong lớp. Cần học nghiêm chỉnh hơn.", tuition: "0 VNĐ" },
    "280313": { name: "Nguyễn Thị Huệ", score: 9.5, comment: "Tiếp thu bài tốt, ham học hỏi.", tuition: "250.000 VNĐ" },
    "000013": { name: "Nguyễn Thị Ngọc Anh (a)", score: 10.0, comment: "Tiếp thu bài tốt, ham học hỏi.", tuition: "330.000 VNĐ" },
    "121314": { name: "Nguyễn Thị Kim Ngân", score: 6.5, comment: "Tiếp thu bài ở mức khá. Hay mất trật tự trong giờ. Cần nghiêm túc hơn.", tuition: "370.000 VNĐ" },
    "915392": { name: "Nguyễn Anh Thư", score: 7.0, comment: "Tiếp thu bài mức khá, thường xuyên mất tập trung. Cần chú ý hơn.", tuition: "370.000 VNĐ" },
    "013579": { name: "Nguyễn Văn Phương", score: 1.5, comment: "Không tập trung vào bài học,hay ngủ trong lớp, nghỉ học bừa bãi không phép. Cần chỉnh đốn ngay.", tuition: "290.000 VNĐ" },
    "554407": { name: "Nguyễn Công Việt", score: 10.0, comment: "Tiếp thu bài tốt, ham học hỏi.", tuition: "0 VNĐ" },
    "555555": { name: "Nguyễn Thị Anh Thư", score: 0, comment: "", tuition: "0 VNĐ" }
};

// Tự động phân chia dữ liệu từng khối lớp
const defaultData = {
    "9": class9Students,
    "8": class8Students,
    "7": {},
    "6": {}
};

// Lưu trực tiếp vào bộ nhớ để tất cả người dùng thấy ngay
let classDatabase = defaultData;
localStorage.setItem("thayLuc_multiclass_db", JSON.stringify(classDatabase));

function saveDatabase() {
    localStorage.setItem("thayLuc_multiclass_db", JSON.stringify(classDatabase));
    if (typeof renderAdminTable === "function") {
        renderAdminTable();
    }
}

/* Định dạng hiển thị học phí */
function formatTuition(value) {
    if (value === undefined || value === null || value === "") return "0 VNĐ";
    let strVal = String(value).replace(/[^0-9]/g, "");
    if (!strVal || strVal === "0") return "0 VNĐ";
    return Number(strVal).toLocaleString('vi-VN') + " VNĐ";
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
const studentTuition = document.getElementById("studentTuition");
const teacherComment = document.getElementById("teacherComment");
const backButton = document.getElementById("backButton");
const qrImage = document.getElementById("qrImage");

/* ADMIN DOM ELEMENTS */
const adminLoginBtn = document.getElementById("adminLoginBtn");
const closeAdminBtn = document.getElementById("closeAdminBtn");
const adminClassSelect = document.getElementById("adminClassSelect");
const currentClassLabel = document.getElementById("currentClassLabel");
const studentForm = document.getElementById("studentForm");
const formStudentId = document.getElementById("formStudentId");
const formStudentName = document.getElementById("formStudentName");
const formStudentScore = document.getElementById("formStudentScore");
const formStudentTuition = document.getElementById("formStudentTuition");
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
    studentTuition.textContent = formatTuition(student.tuition);
    teacherComment.textContent = student.comment || "Chưa có nhận xét.";

    /* Tạo mã QR Momo tự động */
    if (qrImage) {
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=MoMo_0972824372_${studentId}`;
    }

    searchSection.classList.add("hidden");
    if (adminSection) adminSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
}

/* ==========================================
QUẢN LÝ ADMIN
========================================== */
if (adminLoginBtn) {
    adminLoginBtn.addEventListener("click", () => {
        const pass = prompt("Nhập mật khẩu truy cập Admin :");
        if (pass === "123123") {
            searchSection.classList.add("hidden");
            resultSection.classList.add("hidden");
            adminSection.classList.remove("hidden");
            renderAdminTable();
        } else if (pass !== null) {
            alert("Mật khẩu không chính xác!");
        }
    });
}

if (closeAdminBtn) {
    closeAdminBtn.addEventListener("click", () => {
        adminSection.classList.add("hidden");
        searchSection.classList.remove("hidden");
        resetForm();
    });
}

if (adminClassSelect) {
    adminClassSelect.addEventListener("change", () => {
        renderAdminTable();
        resetForm();
    });
}

function renderAdminTable() {
    if (!adminClassSelect || !studentTableBody) return;
    const currentClass = adminClassSelect.value;
    if (currentClassLabel) currentClassLabel.textContent = `Lớp ${currentClass}`;
    
    if (!classDatabase[currentClass]) {
        classDatabase[currentClass] = {};
    }

    const classData = classDatabase[currentClass];
    studentTableBody.innerHTML = "";
    const keys = Object.keys(classData);
    if (totalStudentsCount) totalStudentsCount.textContent = keys.length;

    keys.forEach(id => {
        const s = classData[id];
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><b>${id}</b></td>
            <td>${s.name}</td>
            <td><strong style="color: #5a67d8;">${s.score}</strong></td>
            <td><span style="color: #dd6b20; font-weight: 600;">${formatTuition(s.tuition)}</span></td>
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
        formStudentTuition.value = s.tuition || "0";
        formStudentComment.value = s.comment || "";
        deleteStudentBtn.classList.remove("hidden");
    }
}

if (studentForm) {
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const currentClass = adminClassSelect.value;
        const id = formStudentId.value.trim();
        const name = formStudentName.value.trim();
        const score = parseFloat(formStudentScore.value);
        const tuition = formStudentTuition.value.trim();
        const comment = formStudentComment.value.trim();

        if (!id || !name || isNaN(score)) {
            alert("Vui lòng điền đầy đủ Mã HS, Họ Tên và Điểm số!");
            return;
        }

        if (!classDatabase[currentClass]) {
            classDatabase[currentClass] = {};
        }

        classDatabase[currentClass][id] = { name, score, comment, tuition };
        saveDatabase();
        resetForm();
        alert(`Đã lưu học sinh vào Lớp ${currentClass} thành công!`);
    });
}

if (deleteStudentBtn) {
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
}

function resetForm() {
    if (studentForm) studentForm.reset();
    if (deleteStudentBtn) deleteStudentBtn.classList.add("hidden");
}

/* ==========================================
IMPORT EXCEL THEO TỪNG LỚP (5 CỘT)
========================================== */
if (excelFileInput) {
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
                        const tuition = row[4] !== undefined ? String(row[4]).trim() : "0";

                        if (id && name && !isNaN(score)) {
                            classDatabase[currentClass][id] = { name, score, comment, tuition };
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
}

/* TẢI EXCEL MẪU */
if (downloadTemplateBtn) {
    downloadTemplateBtn.addEventListener("click", () => {
        const currentClass = adminClassSelect.value;
        const templateData = [
            ["Mã Học Sinh", "Họ Và Tên", "Điểm Số", "Nhận Xét", "Học Phí Cần Nộp"],
            ["123456", "Nguyễn Quang Vinh", 3.0, "Hay mất tập trung...", 290000],
            ["280313", "Nguyễn Thị Huệ", 9.5, "Tiếp thu bài tốt...", 250000]
        ];
        const ws = XLSX.utils.aoa_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `Danh_Sach_Lop_${currentClass}`);
        XLSX.writeFile(wb, `Mau_Danh_Sach_Diem_Lop_${currentClass}.xlsx`);
    });
}

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