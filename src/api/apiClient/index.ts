import axiosInstance from "@/helpers/axios";

const APIs = {
    TOPIC: "/topics",
    TYPE: "/types",
    DEPARTMENT: "/department",
    USER: "/users",
    PRODUCT: "/product",
    TOPICSUB: "/topic-sub"
}

//Topic API
export const getTopicsApi = async () => {
    const data = await axiosInstance.get(APIs.TOPIC);
    return data?.data;
};

export const createTopicApi = async (values: any) => {
    const data = await axiosInstance.post(APIs.TOPIC, values);
    return data?.data;
};

export const getTopicById = async (topicId: any) => {
    const data = await axiosInstance.get(`${APIs.TOPIC}/${topicId}`);
    return data?.data;
};

export const updateTopicApi = async (id: number, values: any) => {
    const data = await axiosInstance.patch(`${APIs.TOPIC}/${id}`, values);
    return data?.data;
};

export const deleteTopicById = async (id: number) => {
    const data = await axiosInstance.delete(`${APIs.TOPIC}/${id}`);
    return data?.data;
};

//Topic sub API 
export const createTopicSub = async (values: any) => {
    const data = await axiosInstance.post(APIs.TOPICSUB, values);
    return data?.data;
};

export const deleteTopicSubById = async (id: any) => {
    const data = await axiosInstance.delete(`${APIs.TOPICSUB}/${id}`);
    return data?.data;
};

export const updateTopicSub = async (id: any, values: any) => {
    const data = await axiosInstance.patch(`${APIs.TOPICSUB}/${id}`, values);
    return data?.data;
};

//Type API
export const getTypesApi = async () => {
    const data = await axiosInstance.get(APIs.TYPE);
    return data?.data;
};

export const createTypeApi = async (values: any) => {
    const data = await axiosInstance.post(APIs.TYPE, values);
    return data?.data;
}

//Department API 
export const createDepartmentApi = async (values: any) => {
    const data = await axiosInstance.post(APIs.DEPARTMENT, values);
    return data?.data;
}

export const getDepartmentApi = async () => {
    const data = await axiosInstance.get(APIs.DEPARTMENT);
    return data?.data;
}

//Product API 
export const createProductApi = async (values: any) => {
    const data = await axiosInstance.post(APIs.PRODUCT, values);
    return data?.data;
}

export const getProductApi = async () => {
    const data = await axiosInstance.get(APIs.PRODUCT);
    return data?.data;
}

//User API
export const getUserApi = async () => {
    const data = await axiosInstance.get(APIs.USER);
    return data?.data;
} 

export const createUserApi = async (values: any) => {
    const data = await axiosInstance.post(APIs.USER, values);
    return data?.data;
}
