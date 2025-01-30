const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            status: 'error',
            message: 'Metode HTTP tidak diizinkan.'
        });
    }

    const { url } = req.query;
    if (!url || !url.includes('soundcloud.com')) {
        return res.status(400).json({
            status: 'error',
            message: 'URL SoundCloud tidak valid.'
        });
    }

    try {
        const downloadData = await scrapeSoundCloud(url);
        return res.status(200).json({
            status: 'success',
            data: downloadData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Gagal mengambil data SoundCloud.'
        });
    }
};

async function scrapeSoundCloud(url) {
    const response = await axios.get(`https://www.klickaud.co/download?url=${encodeURIComponent(url)}`);
    const $ = cheerio.load(response.data);

    const downloadUrl = $('#dlLink').attr('href');
    const title = $('title').text().trim();

    if (!downloadUrl) {
        throw new Error('Gagal menemukan link download.');
    }

    return {
        source_url: url,
        title: title,
        download_url: downloadUrl
    };
}
