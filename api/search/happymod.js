const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            status: 'error',
            message: 'Metode HTTP tidak diizinkan.'
        });
    }

    const { query } = req.query;
    
    if (!query) {
        return res.status(400).json({
            status: 'error',
            message: 'Parameter query wajib diisi.'
        });
    }

    try {
        const url = `https://www.happymod.com/search.html?q=${encodeURIComponent(query)}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results = [];

        $('.app-list .pdt-app-box').each((i, el) => {
            const title = $(el).find('.pdt-app-info h3').text().trim();
            const link = 'https://www.happymod.com' + $(el).find('.pdt-app-info h3 a').attr('href');
            const icon = $(el).find('.pdt-app-img img').attr('src');
            const version = $(el).find('.pdt-app-info .pdt-app-version').text().trim();
            const size = $(el).find('.pdt-app-info .pdt-app-size').text().trim();
            const modInfo = $(el).find('.pdt-app-info .pdt-app-mod').text().trim();

            results.push({ title, link, icon, version, size, modInfo });
        });

        return res.status(200).json({
            status: 'success',
            total: results.length,
            data: results
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Gagal mengambil data dari HappyMod.'
        });
    }
};
