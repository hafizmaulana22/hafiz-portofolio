
const API_KEY = '33a0e65cfd84ec36c73eb90cdc9ba179';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


const cityInput = document.getElementById('cityInput');
const result = document.getElementById('result');
const loader = document.getElementById('loader');
const errorBox = document.getElementById('errorBox');
const errorMsg = document.getElementById('errorMsg');
const quickCities = document.getElementById('quickCities');


cityInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') getWeather();
});


async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Masukkan nama kota terlebih dahulu!');
        return;
    }

    showLoader();

    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=id`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod != 200) {
            let errorMessage = 'Terjadi kesalahan. Coba lagi.';
            if (data.cod == 404) {
                errorMessage = `Kota "${city}" tidak ditemukan. Coba nama lain.`;
            } else if (data.cod == 401) {
                errorMessage = 'API Key baru sedang diaktivasi oleh server (bisa butuh 10-30 menit). Mohon tunggu sebentar lalu coba lagi ya.';
            }
            showError(errorMessage);
            return;
        }

        displayWeather(data);

    } catch (err) {
        showError('Gagal terhubung ke server. Periksa koneksi internet kamu.');
    }
}


function displayWeather(data) {
    // Nama & negara
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('cityCountry').textContent = data.sys.country;
    document.getElementById('dateTime').textContent = getDateTime(data.timezone);

    // Ikon cuaca
    const icon = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById('weatherIcon').alt = data.weather[0].description;

    // Suhu
    document.getElementById('tempMain').textContent = Math.round(data.main.temp);
    document.getElementById('weatherDesc').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = `Terasa seperti ${Math.round(data.main.feels_like)}°C`;

    // Statistik
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${data.wind.speed} m/s`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

    // Matahari terbit/terbenam
    document.getElementById('sunrise').textContent = formatTime(data.sys.sunrise, data.timezone);
    document.getElementById('sunset').textContent = formatTime(data.sys.sunset, data.timezone);

    hideLoader();
    hideError();
    result.style.display = 'flex';
    quickCities.style.display = 'none';
}


function searchCity(city) {
    cityInput.value = city;
    getWeather();
}


function formatTime(unixTimestamp, timezoneOffset) {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}


function getDateTime(timezoneOffset) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const local = new Date(utc + timezoneOffset * 1000);

    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    return `${hari[local.getDay()]}, ${local.getDate()} ${bulan[local.getMonth()]} ${local.getFullYear()} · ${String(local.getHours()).padStart(2, '0')}:${String(local.getMinutes()).padStart(2, '0')}`;
}


function showLoader() {
    loader.style.display = 'flex';
    result.style.display = 'none';
    errorBox.style.display = 'none';
}

function hideLoader() {
    loader.style.display = 'none';
}

function showError(msg) {
    hideLoader();
    errorMsg.textContent = msg;
    errorBox.style.display = 'flex';
    result.style.display = 'none';
}

function hideError() {
    errorBox.style.display = 'none';
}
