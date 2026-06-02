let outputScreen = document.getElementById("output-screen");

function display(num) {
    outputScreen.value += num;
}

function Calculate() {
    try {
        // eval() menghitung ekspresi matematika di dalam string
        outputScreen.value = eval(outputScreen.value);
    } catch (err) {
        alert("Format perhitungan tidak valid");
        outputScreen.value = "";
    }
}

function Clear() {
    outputScreen.value = "";
}

function del() {
    outputScreen.value = outputScreen.value.slice(0, -1);
}
