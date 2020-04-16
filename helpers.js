

export const generateUrl = (url) => {
    const genstring = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    if (url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)){
        let urlGen = '';
        for(let i=0;i<7;i++)
            urlGen+=genstring[Math.floor(Math.random()*genstring.length)];
        return `http://localhost:3000/${url}`;
    }
    return false;
};
