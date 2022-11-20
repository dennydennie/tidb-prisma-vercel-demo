import axios from "axios";

export async function Backend({
  payload,
  endPoint,
  action,
  params,
  headers,
}: BackendProps) {
  const baseUrl = "http://localhost:9001";
  try {
    return await axios({
      method: action,
      url: baseUrl + endPoint,
      data: payload,
      params: params,
      headers: headers,
    });
  } catch (error) {
    console.log(error);
  }
}
interface BackendProps {
  payload?: any;
  endPoint: string;
  action: string;
  params?: any;
  headers?: any;
}
