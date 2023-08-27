const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/convert', upload.single('pdfFile'), async (req, res) => {
  const { path: pdfPath } = req.file;

  const outputDir = './images/';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  exec(`pdftoppm ${pdfPath} ${outputDir}page -png`, (error, stdout, stderr) => {
    if (error) {
      console.error(`PDF to Image conversion error: ${error}`);
      res.status(500).send('Error converting PDF to images.');
      return;
    }

    console.log('PDF converted to images successfully!');
    res.send('Conversion completed!');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
