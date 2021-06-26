
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import localForage from 'localforage';

const forageStore = localForage.createInstance({
    driver: [
        localForage.INDEXEDDB,
    ],
    name:'my-cache'
})


const cache = setupCache ({

    maxAge: 60*60*1000,  // keep in storage for 60 mins
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

    const api_key = process.env.REACT_APP_API_KEY
    return axiosInstance.get(axiosInstance.baseURL, {
        params: {
            function: 'TIME_SERIES_DAILY',
            symbol,
            apikey: api_key,
        }
    })
};
