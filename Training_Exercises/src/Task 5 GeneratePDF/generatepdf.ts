
import fs from 'fs';
import { Request, Response } from "express"
import puppeteer from 'puppeteer';
import path from 'path';
import handlebars from 'handlebars';

export const generatePDF = async (req: Request, res: Response) => {
    const { name, address, bets } = req.body;

    try {
        // Read the HTML template
        const templatePath = path.join(__dirname, './index.html');
        const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

        // Compile the template with handlebars
        const template = handlebars.compile(htmlTemplate);
        const html = template({ name, address: JSON.stringify(address), bets });

        // Launch puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set the HTML content
        await page.setContent(html);

        // Define the PDF options
        const pdfOptions = {
            format: 'A4',
            margin: {
                top: '100px',
                bottom: '100px',
                left: '50px',
                right: '50px',
            },
            displayHeaderFooter: true,
            headerTemplate: `
                <div style="font-size:12px; text-align:center; width:100%; padding-top:10px;">
                    <span>${name}</span><br/>
                    <span>${JSON.stringify(address)}</span>
                </div>
            `,
            footerTemplate: `
                <div style="font-size:12px; text-align:center; width:100%; padding-bottom:10px;">
                    <span class="pageNumber"></span> / <span class="totalPages"></span>
                </div>
            `,
        };

        // Generate the PDF
        const pdf = await page.pdf(pdfOptions as any);

        // Close puppeteer
        await browser.close();

        // Define the PDF filename
        const filename = `${name.replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

        // Send the PDF as response
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${filename}`,
        });
        res.send(pdf);
    } catch (error) {
        error instanceof Error && res.status(500).json({ error: error.message });
    }
}