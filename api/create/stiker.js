import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    // Mengecek apakah request adalah POST
    if (req.method === 'POST') {
        const { imageUrl } = req.body; // Ambil URL gambar dari body request

        if (!imageUrl) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'URL gambar tidak ditemukan!' 
            });
        }

        try {
            // Ambil gambar dari URL
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(response.data, 'binary');

            // Path untuk menyimpan stiker sementara
            const stickerPath = path.join('/tmp', 'sticker.webp');

            // Proses gambar menjadi stiker (resize dan convert ke .webp)
            await sharp(imageBuffer)
                .resize(512, 512)  // Ukuran maksimal stiker WhatsApp
                .webp({ quality: 90 })
                .toFile(stickerPath);

            // Kirim file stiker dalam response
            res.setHeader('Content-Type', 'image/webp');
            res.sendFile(stickerPath, (err) => {
                if (err) {
                    return res.status(500).json({ status: 'error', message: 'Gagal mengirim stiker' });
                }

                // Hapus file setelah dikirim
                fs.unlinkSync(stickerPath);
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'error', message: 'Gagal memproses gambar' });
        }
    } else {
        // Kalau bukan POST, kirimkan error method
        res.status(405).json({ 
            status: 'error', 
            message: 'Method tidak diizinkan, hanya POST yang diperbolehkan' 
        });
    }
    }
