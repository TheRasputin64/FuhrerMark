const express = require('express');
const fs = require('fs');
const { compileFührerMark } = require('./FührerMarkCompiler');

const app = express();
const port = 3000;

app.get('/:filename.fm', (req, res) => {
    const filename = req.params.filename;
    const fmFilePath = `./FührerMark/${filename}.fm`;
    if (fs.existsSync(fmFilePath)) {
        const FührerMarkCode = fs.readFileSync(fmFilePath, 'utf8');
        const { htmlCode, _ } = compileFührerMark(FührerMarkCode);
        res.send(htmlCode);}
    else { res.status(404).send('File not found');}
});

app.use(express.static('FührerMark'));
app.get('/', (req, res) => {res.send('Welcome to FührerMark!');});
app.listen(port, () => {console.log(`Server is running on http://localhost:${port}`);});
