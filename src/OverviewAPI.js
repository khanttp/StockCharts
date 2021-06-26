import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import localForage from 'localforage';


const forageStore = localForage.createInstance({
    driver: [
        localForage.INDEXEDDB,
    ],
    name: 'company-overview-cache'
})


const cache = setupCache({
    maxAge: 60 * 60 * 1000,
    store: forageStore,
    exclude: {
        query: false
    }
})

const axiosInstance = axios.create({
    baseURL: 'https://www.alphavantage.co/query',
    adapter: cache.adapter,
});

export const makeRequest = (symbol) => {

// https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
    
    const api_key = process.env.REACT_APP_API_KEY

    const parameters = {
        function: 'OVERVIEW',
        symbol,
        apikey: api_key,
    }

    return axiosInstance.get(axiosInstance.baseURL, {
        params: parameters
    })


};








