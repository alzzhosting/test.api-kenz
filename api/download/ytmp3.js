export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ 
        status: 'Error',
        message: 'Silahkan isi parameter'
      });
    }

    try {
      // Ganti dengan logika untuk mengunduh MP3 dari YouTube
      const mp3Link = await getMP3FromYouTube(url); // fungsi ini hanya contoh, sesuaikan dengan implementasi kamu

      res.status(200).json({
        success: true,
        message: 'MP3 ready to download',
        downloadUrl: mp3Link, // URL untuk download MP3
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch MP3', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

// Fungsi untuk mendapatkan link MP3 dari YouTube (contoh)
async function getMP3FromYouTube(url) {
  return 'https://example.com/path/to/mp3-file.mp3'; // Ganti dengan logika download yang sesuai
}
