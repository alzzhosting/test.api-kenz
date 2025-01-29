import ytdl from 'ytdl-core';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({ "status": 'error' });
        }

        try {
            if (!ytdl.validateURL(url)) {
                return res.status(400).json({ error: 'Invalid YouTube URL' });
            }

            const info = await ytdl.getInfo(url);

            res.setHeader('Content-Type', 'video/mp4');
            res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);

            ytdl(url, { format: 'mp4' }).pipe(res);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch video', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
