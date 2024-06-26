import { user_token_key } from "@/constant/ls-key";
import useCookies from "@/hook/utils/use-cookies";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  Method,
  ResponseType,
} from "axios";

interface AxiosAPI {
  url: string;
  method: Method;
  data?: any;
  headers?: any;
  params?: string;
  isAuthentication?: boolean;
  contentType?: string;
  responseType?: ResponseType;
  isDownload?: boolean;
  onUploadProgress?: () => void;
}

interface ErrorDataType {
  errorCode: number;
  errorMessage: string;
}



const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`;

const useAxios = async <T>(props: AxiosAPI): Promise<T> => {
  const { getStorageData } = useCookies();
  const {
    url,
    method,
    data,
    isDownload,
    headers,
    params,
    responseType,
    onUploadProgress,
  } = props;

  const token = await getStorageData(user_token_key);

  const config: AxiosRequestConfig = {
    method: method || "GET",
    url: `${baseUrl}${url}`,
    headers: {
      "Content-Type": props.contentType || "application/json",
      accept: "application/json",
      Authorization: token !== null ? `Bearer ${token}` : "",
      ...headers,
    },
    data,
    params,
    responseType,
    onUploadProgress,
    timeout: 0,
  };

  if (
    props.contentType === "multipart/form-data" ||
    (config?.headers?.["Content-Type"] &&
      config.headers["Content-Type"].includes("multipart/form-data"))
  ) {
    if (data instanceof Object && !(data instanceof FormData)) {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file, index) => {
            formData.append(`${key}[${index}]`, file);
          });
        } else {
          formData.append(key, value as string);
        }
      });

      config.data = formData;
    } else {
      throw new Error("Invalid data format for multipart/form-data");
    }
  }

  try {
    const response = await axios(config);
    return isDownload ? (response as any) : (response?.data as T);
  } catch (error: any) {
    const err: any = error as AxiosError<ErrorDataType>;
    throw new Error(err?.response?.data?.message || err || "");
  }
};

export default useAxios;
