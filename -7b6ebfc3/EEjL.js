const express = require('express');
const multer = require('multer');
const fs = require('fs');
const PDFParser = require('pdf-parse');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/convert', upload.single('pdfFile'), async (req, res) => {
  const { path: pdfPath } = req.file;

  const dataBuffer = fs.readFileSync(pdfPath);

  PDFParser(dataBuffer).then(function (data) {
    const pageCount = data.numpages;

    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
      // Convert the PDF page to an image
      // Save the image or perform further processing
      console.log(`Processing page ${pageNumber}`);
    }

    res.send('Conversion completed!');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
