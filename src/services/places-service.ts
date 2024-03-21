import axios from "axios";

export const getPlacesByCity = async (city: string): Promise <Record<string,string>[]> => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('location_id', city);
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'USD');
    encodedParams.set('offset', '9');

    const options = {
        method: 'POST',
        url: 'https://tourist-attraction.p.rapidapi.com/search',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'fc5456f01dmshfade6783aa531b5p1d7f3ejsn6c80eca77c36',
            'X-RapidAPI-Host': 'tourist-attraction.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
       return(response.data.results.data);
    } catch (error) {
        console.error(error);
    }
}

