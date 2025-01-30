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
            message: 'URL Google Drive tidak ditemukan.'
        });
    }

    try {
        const driveData = await getDirectLink(url);
        return res.status(200).json({
            status: 'success',
            data: driveData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Gagal mengambil direct link Google Drive.'
        });
    }
};

async function getDirectLink(url) {
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = url.match(regex);
    
    if (!match) {
        throw new Error('Format URL Google Drive tidak valid.');
    }

    const fileId = match[1];
    return {
        file_id: fileId,
        direct_link: `https://drive.google.com/uc?export=download&id=${fileId}`
    };
}
