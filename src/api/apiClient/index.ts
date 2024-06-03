import axiosInstance from "@/helpers/axios";

const APIs = {
    TOPIC: "/topics",
    TYPE: "/types"
}

export const getTopicsApi = async () => {
    const data = await axiosInstance.get(APIs.TOPIC);
    return data?.data;
};

export const getTypesApi = async () => {
    const data = await axiosInstance.get(APIs.TYPE);
    return data?.data;
};
