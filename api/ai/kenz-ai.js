const fetch = require("node-fetch");

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { text } = req.query; // Ambil teks pertanyaan dari query

        if (!text) {
            return res.status(400).json({
                status: "error",
                message: "Parameter 'text' tidak boleh kosong."
            });
        }

        try {
            const aiResponse = await fetchGPT4Response(text);
            return res.status(200).json({
                status: "success",
                response: aiResponse
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "Terjadi kesalahan saat memproses permintaan."
            });
        }
    } else {
        return res.status(405).json({
            status: "error",
            message: "Metode HTTP tidak diizinkan."
        });
    }
}

// Fungsi buat ambil jawaban dari GPT-4
async function fetchGPT4Response(text) {
    const apiKey = process.env.OPENAI_API_KEY; // API Key dari .env
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: text }]
        })
    });

    if (!response.ok) {
        throw new Error("Gagal mendapatkan respons dari AI.");
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
