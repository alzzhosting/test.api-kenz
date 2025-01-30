const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            status: 'error',
            message: 'Metode HTTP tidak diizinkan.'
        });
    }

    const { url } = req.query; // Ambil URL dari query parameter
    if (!url) {
        return res.status(400).json({
            status: 'error',
            message: 'URL Instagram tidak ditemukan.'
        });
    }

    try {
        const videoData = await fetchInstagramVideo(url);
        return res.status(200).json({
            status: 'success',
            data: videoData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Gagal mengambil data video Instagram.'
        });
    }
}

// Fungsi untuk fetch data video dari Instagram
async function fetchInstagramVideo(url) {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    });

    if (!response.ok) {
        throw new Error('Gagal mengakses halaman Instagram.');
    }

    const html = await response.text();

    // Cari URL video dalam HTML
    const regex = /"video_url":"(https:[^"]+)"/;
    const match = html.match(regex);
    if (!match || match.length < 2) {
        throw new Error('Tidak dapat menemukan URL video.');
    }

    const videoUrl = match[1].replace(/\\u0025/g, '%'); // Decode URL

    return {
        videoUrl: decodeURIComponent(videoUrl)
    };
}
