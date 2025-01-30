const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            status: 'error',
            message: 'Metode HTTP tidak diizinkan.'
        });
    }

    const { url } = req.query;
    if (!url) {
        return res.status(400).json({
            status: 'error',
            message: 'URL CapCut tidak ditemukan.'
        });
    }

    try {
        const capcutData = await fetchCapcutTemplate(url);
        return res.status(200).json({
            status: 'success',
            data: capcutData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Gagal mengambil data template CapCut.'
        });
    }
};

async function fetchCapcutTemplate(url) {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    });

    if (!response.ok) {
        throw new Error('Gagal mengakses halaman CapCut.');
    }

    const html = await response.text();

    const regexTitle = /"title":"(.*?)"/;
    const regexPreview = /"cover":"(https:[^"]+)"/;
    const regexVideo = /"video":"(https:[^"]+)"/;

    const titleMatch = html.match(regexTitle);
    const previewMatch = html.match(regexPreview);
    const videoMatch = html.match(regexVideo);

    if (!titleMatch || !previewMatch || !videoMatch) {
        throw new Error('Template CapCut tidak ditemukan.');
    }

    return {
        title: titleMatch[1],
        preview: previewMatch[1],
        video: videoMatch[1]
    };
}
