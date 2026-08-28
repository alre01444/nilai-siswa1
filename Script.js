// Array untuk menyimpan data siswa
let siswa = [];

// Fungsi menentukan kategori nilai
function kategoriNilai(nilai) {

    if (nilai >= 90 && nilai <= 100) {
        return "Sangat Baik";
    } 
    else if (nilai >= 80) {
        return "Baik";
    } 
    else if (nilai >= 70) {
        return "Cukup";
    } 
    else {
        return "Remedial";
    }
}

// Fungsi menentukan status kelulusan
function statusNilai(nilai) {

    if (nilai >= 70) {
        return "Lulus";
    } 
    else {
        return "Tidak Lulus";
    }
}

// Menambahkan siswa
function tambahSiswa() {

    let nama = document.getElementById("nama").value.trim();
    let nilai = Number(document.getElementById("nilai").value);
    let pesan = document.getElementById("pesan");

    // Operator logika && digunakan di sini
    if (nama === "" || isNaN(nilai) || nilai < 0 || nilai > 100) {

        pesan.textContent =
            "⚠️ Masukkan nama dan nilai antara 0 sampai 100.";

        pesan.style.color = "#f87171";

        return;
    }

    let dataSiswa = {
        nama: nama,
        nilai: nilai,
        kategori: kategoriNilai(nilai),
        status: statusNilai(nilai)
    };

    siswa.push(dataSiswa);

    pesan.textContent = "✓ Data siswa berhasil ditambahkan.";
    pesan.style.color = "#4ade80";

    document.getElementById("nama").value = "";
    document.getElementById("nilai").value = "";

    tampilkanSiswa();
    hitungStatistik();
}

// Menampilkan data siswa
function tampilkanSiswa() {

    let tabel = document.getElementById("tabelSiswa");

    tabel.innerHTML = "";

    if (siswa.length === 0) {

        tabel.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    Belum ada data siswa
                </td>
            </tr>
        `;

        return;
    }

    // PERULANGAN FOR
    for (let i = 0; i < siswa.length; i++) {

        let data = siswa[i];

        let statusClass =
            data.status === "Lulus"
                ? "lulus"
                : "tidak-lulus";

        tabel.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${data.nama}</td>
                <td>${data.nilai}</td>
                <td>${data.kategori}</td>
                <td class="${statusClass}">
                    ${data.status}
                </td>
            </tr>
        `;
    }
}

// Menghitung statistik
function hitungStatistik() {

    if (siswa.length === 0) {

        document.getElementById("tertinggi").textContent = "-";
        document.getElementById("terendah").textContent = "-";
        document.getElementById("rataRata").textContent = "-";
        document.getElementById("jumlahSiswa").textContent = "0";

        return;
    }

    let tertinggi = siswa[0].nilai;
    let terendah = siswa[0].nilai;

    let total = 0;
    let i = 0;

    // PERULANGAN WHILE
    while (i < siswa.length) {

        let nilai = siswa[i].nilai;

        // Operator perbandingan
        if (nilai > tertinggi) {
            tertinggi = nilai;
        }

        if (nilai < terendah) {
            terendah = nilai;
        }

        // Operator aritmatika
        total = total + nilai;

        i++;
    }

    // Menghitung rata-rata
    let rataRata = total / siswa.length;

    document.getElementById("tertinggi").textContent = tertinggi;
    document.getElementById("terendah").textContent = terendah;
    document.getElementById("rataRata").textContent = rataRata.toFixed(2);
    document.getElementById("jumlahSiswa").textContent = siswa.length;
}

// Menghapus semua data
function hapusSemua() {

    if (siswa.length === 0) {
        return;
    }

    siswa = [];

    tampilkanSiswa();
    hitungStatistik();

    document.getElementById("pesan").textContent =
        "✓ Semua data berhasil dihapus.";

    document.getElementById("pesan").style.color =
        "#4ade80";
}