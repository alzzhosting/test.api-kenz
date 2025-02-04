    // Fungsi untuk toggle tema
    function toggleTheme() {
      const body = document.body;
      const themeIcon = document.getElementById("theme-icon");
      const isDark = body.getAttribute("data-theme") === "dark";

      if (isDark) {
        body.setAttribute("data-theme", "light");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      } else {
        body.setAttribute("data-theme", "dark");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }

      // Simpan preferensi tema di localStorage
      localStorage.setItem("theme", isDark ? "light" : "dark");
    }

    // Set tema awal berdasarkan preferensi pengguna
    function setInitialTheme() {
      const savedTheme = localStorage.getItem("theme") || "dark";
      const body = document.body;
      const themeIcon = document.getElementById("theme-icon");

      body.setAttribute("data-theme", savedTheme);
      themeIcon.classList.add(savedTheme === "dark" ? "fa-moon" : "fa-sun");
    }

    // Panggil fungsi setInitialTheme saat halaman dimuat
    setInitialTheme();

    // Fungsi untuk toggle link box
    function toggleLinkBox(id) {
      let box = document.getElementById(`link-box-${id}`);
      box.classList.toggle("visible");
    }

    // Fungsi untuk copy ke clipboard
    function copyToClipboard(id) {
      let input = document.getElementById(`link-${id}`);
      input.select();
      document.execCommand("copy");
      showPopup();
    }

    // Fungsi untuk menampilkan popup
    function showPopup() {
      const popup = document.getElementById("popup");
      popup.classList.add("show");

      // Hilangkan popup setelah 3 detik
      setTimeout(() => {
        popup.classList.remove("show");
      }, 3000);
    }