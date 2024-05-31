import axiosInstance from "@/helpers/axios";
import { getUser, setAccessToken, setUser } from "@/helpers/localAuth";

const APIs = {
    SIGNIN: "/auth/login"
}
export const signin = async ({ code, password }: any) => {
    const data = await axiosInstance.post(APIs.SIGNIN, { code, password });
    setAccessToken(data.data?.token);
    setUser(data.data?.user);
    return data?.data;
};
