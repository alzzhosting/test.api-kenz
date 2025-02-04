    // Fungsi untuk menghasilkan kode acak
    function generateRandomCode() {
      return Math.floor(100000 + Math.random() * 900000); // 6 digit kode acak
    }

    // Fungsi untuk mengirim email
    function sendEmail(event) {
      event.preventDefault(); // Mencegah form dikirim secara langsung

      var email = document.getElementById("email").value;
      var randomCode = generateRandomCode(); // Menghasilkan kode acak
      var subject = "Reset Password Request";
      var body = "Kode reset password Anda adalah: " + randomCode;

      // Menyimpan kode yang dihasilkan di localStorage agar bisa divalidasi pada halaman berikutnya
      localStorage.setItem('resetCode', randomCode);

      // Membuka aplikasi email pengguna dengan mailto
      window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      // Mengarahkan ke halaman berikutnya setelah mengirim kode
      setTimeout(function() {
        window.location.href = "/kodereset/kodereset.html";
      }, 3000); // 3 detik setelah email dikirim, alihkan ke halaman berikutnya
    }