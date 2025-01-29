export default function handler(req, res) {
    res.json({ 
        status: "success", 
        message: "API KenzDev berhasil diakses!",
        data: {
            creator: "KenzDev",
            version: "1.0.0",
            info: "Ini API sederhana buat kamu!"
        }
    });
}
