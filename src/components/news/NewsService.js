import AxiosInstance from "../helpers/AxiosInstance";

export const getNews = async () => {
    const response = await AxiosInstance().get("/articles")
    return response.data
}

export const getNewsDetail = async (id) => {
    const response = await AxiosInstance().get(`/articles/${id}/detail`)
    return response.data
}

// upload image
export const uploadImage = async (form) => {
    const response = await AxiosInstance('multipart/form-data')
        .post('/media/upload', form);
    return response.data;
}

// add news
export const addNews = async (data) => {
    const response = await AxiosInstance().post('/articles', data);
    return response.data;
}

export const searchNews = async (title) => {
    const response = await AxiosInstance().get(`/articles/search?title=${title}`)
    return response.data
}

export const getMyNews = async () => {
    const response = await AxiosInstance().get("/articles/my-articles")
    return response.data
}

export const updateProfile = async (data) => {
    const response = await AxiosInstance().post('/users/update-profile', data);
    return response.data
}