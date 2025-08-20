import axiosInstance from "./httpClientInstance";

export const fetchData = async (uri: string) => {
  try {
    const response = await axiosInstance.get(`${uri}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postData = async (data: any) => {
  try {
    const response = await axiosInstance.post("/data", data);
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
