const express = require('express');
const multer = require('multer');
const { fromPath } = require('pdf2pic');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/convert', upload.single('pdfFile'), async (req, res) => {
  const { path: pdfPath } = req.file;

  const options = {
    density: 200,             // DPI (default: 72)
    savePath: './images/',   // Output directory
    saveFilename: 'page',    // File name prefix
    format: 'jpeg',          // Output image format
    width: 1024,             // Image width (default: 768)
    height: 768,             // Image height (default: 1024)
  };

  const pdf2pic = fromPath(pdfPath, options);
  const pageCount = await pdf2pic.getPageCount();

  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
    const pagePath = await pdf2pic.save(pageNumber);
    console.log(`Page ${pageNumber} converted: ${pagePath}`);
  }

  res.send('Conversion completed!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
