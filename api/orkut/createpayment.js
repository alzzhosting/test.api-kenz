module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            status: 'error',
            message: 'Metode HTTP tidak diizinkan.'
        });
    }

    const { apikey, amount, codeqr } = req.query;
    
    if (!apikey || !amount || !codeqr) {
        return res.status(400).json({
            status: 'error',
            message: 'Parameter apikey, amount, dan codeqr wajib diisi.'
        });
    }

    return res.status(200).json({
        status: 'success',
        message: 'QRIS Payment berhasil dibuat!',
        data: {
            amount: amount,
            codeqr: codeqr
        }
    });
};
