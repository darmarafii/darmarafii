// Function untuk menghitung BMI
function calculateBMI(weight, height) {
    return weight / ((height / 100) ** 2);
}

// Function untuk menghitung berat ideal
function idealWeight(height, gender) {
    let ideal;
    if (gender === "male") {
        ideal = 50 + 0.9 * (height - 152.4);
    } else {
        ideal = 45.5 + 0.9 * (height - 152.4);
    }
    return ideal;
}

// Function untuk klasifikasi BMI berdasarkan standar WHO
function classifyBMI(bmi) {
    if (bmi < 16) {
        return "Sangat Kurus (Severe Thinness)";
    } else if (bmi >= 16 && bmi < 17) {
        return "Kurus (Moderate Thinness)";
    } else if (bmi >= 17 && bmi < 18.5) {
        return "Sedikit Kurus (Mild Thinness)";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal";
    } else if (bmi >= 25 && bmi < 30) {
        return "Kelebihan Berat Badan (Overweight)";
    } else if (bmi >= 30 && bmi < 35) {
        return "Obesitas Kelas I";
    } else if (bmi >= 35 && bmi < 40) {
        return "Obesitas Kelas II";
    } else {
        return "Obesitas Kelas III";
    }
}

// Event listener untuk form submit di page2
document.getElementById('bmiForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    // Ambil input pengguna
    let height = parseFloat(document.getElementById('height').value);
    let weight = parseFloat(document.getElementById('weight').value);
    let gender = document.getElementById('gender').value;

    // Hitung BMI
    let bmi = calculateBMI(weight, height);
    let ideal = idealWeight(height, gender);

    // Klasifikasi BMI
    let bmiClassification = classifyBMI(bmi);

    // Pesan detail hasil
    let resultMessage = `
        <h2>Hasil BMI:</h2>
        <p><strong>BMI Kamu:</strong> ${bmi.toFixed(2)}</p>
        <p><strong>Klasifikasi:</strong> ${bmiClassification}</p>
        <p><strong>Berat Badan Ideal:</strong> ${ideal.toFixed(2)} kg</p>
    `;

    // Saran berdasarkan BMI
    if (bmi < 18.5) {
        resultMessage += `<p>Kamu mungkin perlu menaikkan berat badan. Pertimbangkan untuk menambah asupan kalori dengan makanan yang sehat dan kaya nutrisi.</p>`;
    } else if (bmi >= 18.5 && bmi < 24.9) {
        resultMessage += `<p>Berat badan kamu sudah ideal! Pertahankan pola makan dan aktivitas fisik yang seimbang.</p>`;
    } else if (bmi >= 25 && bmi < 29.9) {
        resultMessage += `<p>Kamu sedikit kelebihan berat badan. Pertimbangkan untuk melakukan olahraga rutin dan mengatur pola makan untuk menurunkan berat badan.</p>`;
    } else {
        resultMessage += `<p>Kamu mengalami obesitas. Sangat disarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk rencana penurunan berat badan yang sehat.</p>`;
    }

    // Tampilkan hasil di halaman 3
    localStorage.setItem('resultMessage', resultMessage);
    window.location.href = 'page3.html';
});

// Saat halaman 3 di-load, tampilkan hasil dari localStorage
if (window.location.pathname.includes('page3.html')) {
    document.getElementById('result').innerHTML = localStorage.getItem('resultMessage');
}
