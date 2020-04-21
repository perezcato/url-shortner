import express from 'express';
import morgan from 'morgan';
import path from 'path';

import { generateUrl,getUrl } from './helpers.js';

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(path.resolve(),'public')));
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.sendFile('./public/index.html');
});

app.post('/shorten',async (req,res) => {
    const { url } = req.body;
    const shortUrl = await generateUrl(url);
    console.log(shortUrl, '-' , url);

    if( !shortUrl ) {
        return res.status(422).json({
            'error': 'Invalid Url'
        });
    }
    return res.json({
        url,
        shortUrl,
    })
});

app.get('/:link',async (req,res) => {
    const urlLink = await getUrl(req.params.link);
    if(urlLink){
        return res.redirect(urlLink.site);
    }
    res.status(404).sendFile(__dirname+'/public/404.html');
});

app.get('*',(req,res) => {
    return res.sendFile(__dirname+'/public/404.html');
});


export default app;
