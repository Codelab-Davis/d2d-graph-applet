import type { VercelRequest, VercelResponse } from '@vercel/node';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { sheetId } = req.query;
    const parser = new PublicGoogleSheetsParser();

    try {
        parser.parse(sheetId)
        .then(data => {
            res.status(200).json(data);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching sheet data");
    }
}