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
            'X-RapidAPI-Key': '47c1f295admshc122cf9f6c073c1p140759jsncfaac113b26c',
            'X-RapidAPI-Host': 'tourist-attraction.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.results.data)
       return(response.data.results.data);
    } catch (error) {
        console.error(error);
    }
}

