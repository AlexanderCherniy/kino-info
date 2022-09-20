import axios from 'axios'

export const defaultAxios = axios.create({
    headers: {
        'X-API-KEY': '0efe4c48-47e0-4151-b431-d8b4c00e3fa6',
        'Content-Type': 'application/json',
    },
    baseURL: 'https://kinopoiskapiunofficial.tech/'
})

export const FilmsApi = {
    getFilmInfo: (id: number) => defaultAxios.get(`api/v2.2/films/${id}`).then(response => {
        return response.data
    }),
    getSimilars: (id: number) => defaultAxios.get(`api/v2.2/films/${id}/similars`).then(response => {
        return response.data
    }),
    getFilms: (page: number, category: string) => defaultAxios.get(`api/v2.2/films/top?page=${page}&type=${category}`).then(response => {
        return response.data.films
    }),
    getStaff: (filmId: number) => defaultAxios.get(`api/v1/staff?filmId=${filmId}`).then(response => {
        return response.data
    }),
    getFilmByKeyword: (page: number, keyword: string) => defaultAxios.get(`api/v2.1/films/search-by-keyword?page=${page}&keyword=${keyword}`).then(response => {
        return response.data.films
    }),
    getFilmPremieres: () => defaultAxios.get(`api/v2.2/films/premieres?year=2022&month=AUGUST`).then(response => {
        return response.data.items
    }),
    getParticipants: (name: string, page: number) => defaultAxios.get(`api/v1/persons?name=${name}&integer=1`).then(response => {
        console.log(response.data.items);
        
        return response.data.items
    }),
    getInfomationAboutPartipicant: (id: string) => defaultAxios.get(`api/v1/staff/${id}`).then(response => {
        console.log(response.data);        
        return response.data
    }),
    getImages: (id: string) => defaultAxios.get(`api/v2.2/films/${id}/images?type=STILL&page=1`).then(response => {
        return response.data
    })
}
