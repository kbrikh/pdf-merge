const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

class PDFMerge {

    constructor(documentsURI, destPath) {
        this.documents = documentsURI;
        this.dest = destPath;
    }

    async runUint8Array() {
        try {
            return await this.mergePdf(this.documents, this.dest)
        } catch (error) {
            throw error;
        }
    }

    async runBufferArray() {
        try {
            let res = await this.mergePdf(this.documents, this.dest);
            return res.buffer;
        } catch (error) {
            throw error;
        }
    }

    async runBase64() {
        try {
            let res = await this.mergePdf(this.documents, this.dest)
            return Buffer.from(res).toString('base64');
        } catch (error) {
            throw error;
        }
    }

    async mergePdf(pdfs, destPath) {
        try {
            const mergedPdf = await PDFDocument.create();

            for (const pdf of pdfs) {
                const pdfByte = await PDFDocument.load(fs.readFileSync(pdf));
                const copiedPages = await mergedPdf.copyPages(pdfByte, pdfByte.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedPdfFile = await mergedPdf.save();

            fs.writeFile(destPath, mergedPdfFile, (err) => {
                if (err) {
                    throw err
                }
            });

            return mergedPdfFile;
        } catch (err) {
            throw err
        }

    }
}

module.exports = PDFMerge;
