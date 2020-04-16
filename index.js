import express from 'express';
import morgan from 'morgan';
import path from 'path';

import { generateUrl } from './helpers.js';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(path.resolve(),'public')));
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.sendFile('./public/index.html');
});

app.post('/shorten', (req,res) => {
    const { url } = req.body;
    const shortUrl = generateUrl(url);
    console.log(shortUrl, '-' , url);

    return res.json({
        url,
        shortUrl,
    })
});

app.get('*',(req,res) => {
    res.sendFile(__dirname+'/public/404.html');
});

app.listen(3000,() => {
    console.log('app is running at port 3000');
});

