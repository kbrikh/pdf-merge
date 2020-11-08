const PDFMerge = require('../lib/PDFMerge.class')

const documents = ['./pdf/pdf-1.pdf', './pdf/pdf-2.pdf'];
let dest = './toto.pdf';


const pdfMerge = new PDFMerge(documents, dest);

pdfMerge.runBufferArray()
    .then((res) => {
        console.log(res);
        // code ...
    });
