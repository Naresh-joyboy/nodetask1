const express =require('express')
const path =require('path')
const fs = require('fs')

const app = express()


app.get('/', (req, res) => {
    const folderPath = 'hold'; 
    const fileName = new Date().toISOString().replace(/[:.]/g, '-') + '.txt';
    const filePath = path.join(folderPath, fileName);
  
    fs.writeFile(filePath, new Date().toString(), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating the file.' });
      }
      
      res.status(201).json({ message: 'File created successfully.', filePath });
    });
  });

  app.get('/g', (req, res) => {
    const folderPath = 'hold';
  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error retrieving files.' });
      }
      const textFiles = files.filter(file => file.endsWith('.txt'));
      res.json({ textFiles });
      console.log(textFiles);
    });
  });

app.listen(3500)