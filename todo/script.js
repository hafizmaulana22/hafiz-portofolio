const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Anda harus menuliskan sesuatu!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Kode unicode untuk tanda kali (silang)
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// Fitur tambahan: Menambahkan tugas dengan menekan tombol Enter pada keyboard
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Menyimpan data ke Local Storage agar tidak hilang saat halaman di-refresh
function saveData() {
    localStorage.setItem("todoData", listContainer.innerHTML);
}

// Memanggil data dari Local Storage saat halaman pertama kali dimuat
function showTask() {
    listContainer.innerHTML = localStorage.getItem("todoData");
}

showTask();
