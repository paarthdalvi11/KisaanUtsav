const axios = require('axios');


const translate = async (msg) => {
    const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'e215c42899msh486446cdc707906p13c6d5jsn8032c994fa6d',
            'X-RapidAPI-Host': 'google-translator9.p.rapidapi.com'
        },
        data: {
            q: msg,
            source: 'en',
            target: 'hi',
            format: 'text'
        }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response);
        console.log('Text translated to Hindi');
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export default translate