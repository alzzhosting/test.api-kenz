function checkResetCode(event) {
  event.preventDefault(); // Mencegah form dikirim secara langsung

  var userCode = document.getElementById("resetCode").value;
  var storedCode = localStorage.getItem('resetCode'); // Mengambil kode yang disimpan

  if (userCode === storedCode) {
    alert("Kode benar! Password Anda telah direset.");
    window.location.href = "apibotwa/apibotwa.html"; // Arahkan ke halaman pengingat password
  } else {
    alert("Kode salah! Silakan coba lagi.");
  }
}