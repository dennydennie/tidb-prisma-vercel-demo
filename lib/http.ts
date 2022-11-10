import axios from "axios";
import {
  ForgotPassword,
  HouseProps,
  ResetPassword,
  Subscription,
  UserType,
} from "const";
import { getCookie } from "cookies-next";

const header = {
  Authorization: getCookie("accessToke"),
};

export async function fetchHouses(data: {
  page?: number;
  size?: number;
  type?: string;
  sort?: string;
}): Promise<{ content: HouseProps[]; total: number; error?: any }> {
  try {
    const queryArray = Object.keys(data).reduce((prev: string[], item) => {
      const value = data[item as keyof typeof data];
      if (value) {
        prev.push(`${item}=${value}`);
      }
      return prev;
    }, []);
    const response = await axios.get(`/houses?${queryArray.join(`&`)}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return { error, content: [], total: 0 };
  }
}

export async function createHouse(
  house: HouseProps,
  user: UserType
): Promise<{
  content?: { data: HouseProps; message: string };
  error?: any;
}> {
  try {
    const response = await axios.post(`/houses`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function fetchHouseDetailsById(id: string): Promise<{
  content: HouseProps;
  error?: any;
}> {
  try {
    const response = await axios.get(`/houses/${id}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data as HouseProps };
  } catch (error) {
    console.error(error);
    return { error, content: {} as HouseProps };
  }
}

export async function updateHouseDetail(
  id: string,
  params: Partial<HouseProps>
): Promise<{
  content?: { data: HouseProps; message: string };
  error?: any;
}> {
  try {
    const response = await axios.put(`/houses/${id}`, params);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function createSubscription(subscription: Subscription): Promise<{
  content?: { data: HouseProps; message: string };
  error?: any;
}> {
  try {
    const data = {
      user: subscription.user,
      paymentReference: subscription.paymentReference,
    };
    const response = await axios.post(`/subscriptions`, data);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function createHouseRequest(
  house: HouseProps,
  user: UserType
): Promise<{
  content?: { data: HouseProps; message: string };
  error?: any;
}> {
  try {
    const response = await axios.post(`/houses`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function verifyPhone(verifyPhoneOTP: string): Promise<{
  content?: { data: HouseProps; message: string };
  error?: any;
}> {
  try {
    const response = await axios.post(`/houses`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function resetPassword(resetPassword: ResetPassword): Promise<{
  content?: { data: HouseProps; message: string };
  error?: any;
}> {
  try {
    const response = await axios.post(`/reset-password`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function forgotPassword(forgotPassword: ForgotPassword): Promise<{
  content?: { data: HouseProps; message: string };
  error?: any;
}> {
  try {
    const response = await axios.post(`/reset-password`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
