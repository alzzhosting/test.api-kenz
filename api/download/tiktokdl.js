const fetch = require('node-fetch');

export default async function handler(req, res) {
    // Menyaring request berdasarkan metode HTTP
    if (req.method === 'GET') {
        const { url } = req.query; // Mendapatkan URL TikTok dari query parameter

        if (!url) {
            return res.status(400).json({
                status: 'error',
                message: 'URL TikTok tidak ditemukan.'
            });
        }

        try {
            // Ambil data dari TikTok video URL
            const videoData = await fetchTikTokVideo(url);
            return res.status(200).json({
                status: 'success',
                data: videoData
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 'error',
                message: 'Terjadi kesalahan saat mengambil video TikTok.'
            });
        }
    } else {
        // Mengembalikan 405 Method Not Allowed untuk selain GET
        return res.status(405).json({
            status: 'error',
            message: 'Metode HTTP tidak diizinkan.'
        });
    }
}

// Fungsi untuk mengambil data video TikTok
async function fetchTikTokVideo(url) {
    const videoUrl = `https://www.tiktok.com/oembed?url=${url}`;

    // Ambil metadata video menggunakan TikTok oEmbed API
    const response = await fetch(videoUrl);
    if (!response.ok) {
        throw new Error('Tidak dapat mengambil data video TikTok.');
    }

    const data = await response.json();
    
    // Mengembalikan URL video
    return {
        title: data.title,
        author: data.author_name,
        thumbnail: data.thumbnail_url,
        videoUrl: data.url // Link video yang bisa didownload
    };
}
