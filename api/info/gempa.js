// api/gempa.js
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';

export default async function handler(req, res) {
    try {
        // Fetch data dari RSS feed BMKG (URL feed gempa BMKG)
        const url = 'https://data.bmkg.go.id/earthquake/earthquake_RSS.xml'; // Ganti dengan URL RSS feed yang benar
        const response = await fetch(url);
        const data = await response.text();

        // Parsing XML ke format JSON
        const parser = new XMLParser();
        const jsonData = parser.parse(data);

        // Menampilkan data terbaru
        const gempaData = jsonData.rss.channel.item;

        // Mengirimkan respons dalam format JSON
        return res.status(200).json({
            status: 'success',
            data: gempaData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan dalam mengambil data gempa.'
        });
    }
}
