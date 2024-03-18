import axios, { CanceledError } from "axios";

export { CanceledError }
const PlacesService = axios.create({
    baseURL: 'https://api.geoapify.com/v2/places',
});

const PlacesDetailsService = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getPlacesByCity = async (city_code:string): Promise <Record<string,string>[]> => {
    const {
        data
    } = await PlacesService.get(`?categories=activity&filter=place:${city_code}&limit=9&apiKey=4dd305d41b3541f4911a3dfd0b6a3237`)
    return data.features
}