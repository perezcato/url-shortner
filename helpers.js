import fs from 'fs-extra';

export const checkUrlDuplicate = async (genUrl) => {
    const {urls} = await fs.readJson('./.data.json');
    return !!urls.find(data => data.shortUrl === genUrl);
};

export const addurl = async (url) => {
    try{
        const {urls} = await fs.readJson('./.data.json');
        urls.push(url);
        await fs.writeJson('./.data.json',{urls});
        return true;
    }catch (e) {
        return false;
    }
};

export const generateUrl = async (url) => {
    const genstring = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    if (url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)){
        let urlGen = '';
        for(let i=0;i<7;i++)
            urlGen+=genstring[Math.floor(Math.random()*genstring.length)];
        if(await checkUrlDuplicate(urlGen)){
            let newUrl = await this.generateUrl(url);
            return `http://localhost:3000/${newUrl}`;
        }
        if(!await addurl({site: url,shorten: urlGen}))
            return false;
        return `http://localhost:3000/${urlGen}`;
    }
    return false;
};

