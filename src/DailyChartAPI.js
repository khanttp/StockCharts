
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import localForage from 'localforage';


const forageStore = localForage.createInstance({
    driver: [
        localForage.INDEXEDDB,
    ],
    name: 'my-chart-cache'
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
    // https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo   
    
    const api_key = process.env.REACT_APP_API_KEY


    const parameters = {
        function: 'TIME_SERIES_INTRADAY',
        symbol,
        interval:'5min',
        apikey: api_key,
    }

    return axiosInstance.get(axiosInstance.baseURL, {
        params: parameters
    })


};
