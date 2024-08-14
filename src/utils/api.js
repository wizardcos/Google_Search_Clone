import axios from "axios";

const BASE_URL = "https://www.googleapis.com/customsearch/v1";

const params = {
    key: 'AIzaSyBNnHTafQMXoLaA58pijeUisbKAMc5CIJU',
    cx: '9461942e43df64860',
};

export const fetchDataFromApi = async (payload) => {
    try {
        const { data } = await axios.get(BASE_URL, {
            params: { ...params, ...payload },
        });
        return data;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error;
    }
};
