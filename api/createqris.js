import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { amount, orderId, customerDetails } = req.body;

        // Validasi inputan
        if (!amount || !orderId || !customerDetails) {
            return res.status(400).json({
                status: 'error',
                message: 'Inputan gak lengkap! Harus ada amount, orderId, dan customerDetails.'
            });
        }

        try {
            // Kirim ke API Midtrans atau penyedia QRIS lain
            const response = await axios.post('https://api.midtrans.com/v2/charge', {
                transaction_details: {
                    order_id: orderId,
                    gross_amount: amount,
                },
                customer_details: {
                    first_name: customerDetails.firstName,
                    last_name: customerDetails.lastName,
                    email: customerDetails.email,
                    phone: customerDetails.phone
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${process.env.MIDTRANS_SERVER_KEY}`, // Gunakan MIDTRANS_SERVER_KEY dari env variables
                }
            });

            const qrCodeUrl = response.data.actions[0].url;  // Dapetin URL QR-nya

            // Kirim response dengan URL QR
            return res.status(200).json({
                status: 'success',
                message: 'QRIS berhasil dibuat!',
                data: {
                    qr_code_url: qrCodeUrl
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 'error',
                message: 'Gagal bikin QRIS!',
                error: error.response ? error.response.data : error.message
            });
        }
    } else {
        return res.status(405).json({
            status: 'error',
            message: 'Method POST yang dibutuhkan!'
        });
    }
}
