const express = require('express');
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ 
        status: "success", 
        message: "API KenzDev berhasil diakses!",
        data: {
            creator: "KenzDev",
            version: "1.0.0",
            info: "Ini API sederhana buat kamu!"
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
