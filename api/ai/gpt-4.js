

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt } = req.body;

        // Cek apakah prompt dikirim
        if (!prompt || prompt.trim() === '') {
            return res.status(400).json({
                status: 'true',
                code: 'NO_PROMPT',
                message: 'Ayo masukkan prompt dulu!',
                hint: 'Tulis sesuatu yang mau kamu tanya ke AI!'
            });
        }

        try {
            // Kirim request ke OpenAI GPT-4
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4', // Pilih model GPT-4
                    messages: [
                        { role: 'system', content: 'Kamu adalah asisten AI yang membantu pengguna dengan berbagai pertanyaan.' },
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: 150
                },
                {
                    headers: {
                        'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Ganti dengan API key kamu
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Ambil jawaban dari GPT-4
            const aiResponse = response.data.choices[0].message.content;

            // Kirim balasan ke client
            return res.status(200).json({
                status: 'success',
                message: 'AI berhasil menjawab pertanyaan kamu!',
                answer: aiResponse
            });

        } catch (error) {
            console.error('Error OpenAI:', error);

            // Response error kalo ada masalah
            return res.status(500).json({
                status: 'error',
                code: 'AI_ERROR',
                message: 'Terjadi masalah saat menghubungi AI.',
                hint: 'Coba lagi nanti atau cek API key kamu.'
            });
        }
    } else {
        // Kalau bukan POST, return error
        return res.status(405).json({
            status: 'error',
            code: 'METHOD_NOT_ALLOWED',
            message: 'Metode hanya bisa POST, bro!',
            hint: 'Gunakan metode POST untuk mengirim pertanyaan ke AI.'
        });
    }
}
