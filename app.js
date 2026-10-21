
const feeForm = document.getElementById("feeForm");
const feeTable = document.getElementById("feeTable");

let fees = JSON.parse(localStorage.getItem("schoolFees") || "[]");

function saveData() {
    localStorage.setItem("schoolFees", JSON.stringify(fees));
}

function showFeeForm() {
    feeForm.classList.toggle("hidden");
}

feeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const student = document.getElementById("studentName").value.trim();
    const amount = Number(document.getElementById("feeAmount").value);
    const month = document.getElementById("feeMonth").value.trim();
    const status = document.getElementById("feeStatus").value;

    if (!student || !month || amount <= 0) {
        alert("Please enter valid fee details.");
        return;
    }

    fees.push({
        id: Date.now(),
        student,
        amount,
        month,
        status
    });

    saveData();
    renderFees();
    feeForm.reset();
    feeForm.classList.add("hidden");
});

function deleteFee(id) {
    if (!confirm("Delete this fee record?")) return;

    fees = fees.filter(fee => fee.id !== id);
    saveData();
    renderFees();
}

function renderFees() {
    feeTable.innerHTML = "";

    let collected = 0;
    let outstanding = 0;

    fees.forEach(fee => {
        if (fee.status === "Paid") {
            collected += fee.amount;
        } else {
            outstanding += fee.amount;
        }

        const row = document.createElement("tr");

        const studentCell = document.createElement("td");
        studentCell.textContent = fee.student;

        const monthCell = document.createElement("td");
        monthCell.textContent = fee.month;

        const amountCell = document.createElement("td");
        amountCell.textContent = "Rs. " + fee.amount.toLocaleString();

        const statusCell = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = "status " +
            (fee.status === "Paid" ? "paid" : "unpaid");
        badge.textContent = fee.status;
        statusCell.appendChild(badge);

        const actionCell = document.createElement("td");
        const delButton = document.createElement("button");
        delButton.className = "delete-btn";
        delButton.textContent = "Delete";
        delButton.addEventListener("click", () => deleteFee(fee.id));
        actionCell.appendChild(delButton);

        row.append(studentCell, monthCell, amountCell, statusCell, actionCell);
        feeTable.appendChild(row);
    });

    document.getElementById("totalSales").textContent =
        "Rs. " + collected.toLocaleString();

    document.getElementById("pendingFees").textContent =
        "Rs. " + outstanding.toLocaleString();
}

document.getElementById("themeBtn").addEventListener("click", function () {
    document.body.classList.toggle("dark");

    this.textContent = document.body.classList.contains("dark")
        ? "☀ Light Mode"
        : "🌙 Dark Mode";
});

document.getElementById("menuBtn").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("open");
});

renderFees();


const staffForm = document.getElementById("staffForm");
const staffTable = document.getElementById("staffTable");

let staffSalaries = JSON.parse(
    localStorage.getItem("schoolStaffSalaries") || "[]"
);

function saveStaffData() {
    localStorage.setItem(
        "schoolStaffSalaries",
        JSON.stringify(staffSalaries)
    );
}

function showStaffForm() {
    staffForm.classList.toggle("hidden");
}

staffForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("staffName").value.trim();
    const role = document.getElementById("staffRole").value.trim();
    const amount = Number(
        document.getElementById("staffAmount").value
    );
    const month = document.getElementById("salaryMonth").value;
    const status = document.getElementById("salaryStatus").value;

    if (!name || !role || !month || amount <= 0) {
        alert("Please enter valid staff salary details.");
        return;
    }

    staffSalaries.push({
        id: Date.now(),
        name: name,
        role: role,
        amount: amount,
        month: month,
        status: status
    });

    saveStaffData();
    renderStaffSalaries();

    staffForm.reset();
    staffForm.classList.add("hidden");
});

function deleteStaffSalary(id) {
    if (!confirm("Delete this salary record?")) return;

    staffSalaries = staffSalaries.filter(
        staff => staff.id !== id
    );

    saveStaffData();
    renderStaffSalaries();
}

function renderStaffSalaries() {
    staffTable.innerHTML = "";

    let paid = 0;
    let pending = 0;

    staffSalaries.forEach(function (staff) {
        if (staff.status === "Paid") {
            paid += Number(staff.amount);
        } else {
            pending += Number(staff.amount);
        }

        const row = document.createElement("tr");

        const values = [
            staff.name,
            staff.role,
            staff.month,
            "Rs. " + Number(staff.amount).toLocaleString()
        ];

        values.forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const statusCell = document.createElement("td");
        const badge = document.createElement("span");

        badge.className =
            "status " + (staff.status === "Paid" ? "paid" : "unpaid");

        badge.textContent = staff.status;
        statusCell.appendChild(badge);
        row.appendChild(statusCell);

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteStaffSalary(staff.id);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        staffTable.appendChild(row);
    });

    document.getElementById("staffCount").textContent =
        staffSalaries.length;

    document.getElementById("salaryPaid").textContent =
        "Rs. " + paid.toLocaleString();

    document.getElementById("salaryPending").textContent =
        "Rs. " + pending.toLocaleString();
}

renderStaffSalaries();
