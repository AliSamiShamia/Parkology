import axios from 'axios';
import { API_BASE } from '@env';

const instance = axios.create({
  baseURL: API_BASE,
});

type ResponseType = {
  status: boolean;
  message: string;
  status_code: number;
  data: any;
  page?: number;
  perPage?: number;
  total?: number;
};

const get = async (
  url: string,
  token: any,
  params?: any,
  lang = 'en',
): Promise<ResponseType | null> => {
  let res;
  try {
    res = await instance.get(url, {
      params: params,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Accept-Language': lang,
      },
    });
  } catch (error: any) {
    console.log(JSON.stringify(error?.response));
    return null;
  }

  return res?.data;
};

const post = async (
  url: string,
  form_data: any,
  token: any,
  lang = 'en',
): Promise<ResponseType | null> => {
  let res;
  try {
    res = await instance.post(url, form_data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Accept-Language': lang,
      },
    });
  } catch (error: any) {
    console.log(JSON.stringify(error?.response));
    console.log(JSON.stringify(error));

    return null;
  }

  return res?.data;
};

const put = async (
  url: string,
  form_data: any,
  token: any,
  lang = 'en',
): Promise<ResponseType | null> => {
  let res;
  try {
    res = await instance.put(url, form_data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Accept-Language': lang,
      },
    });
  } catch (error) {
    return null;
  }

  return res?.data;
};

const multipart = async (
  url: string,
  form_data: any,
  token: any,
  lang = 'en',
): Promise<ResponseType | null> => {
  let res;
  console.log(JSON.stringify(API_BASE));
  try {
    res = await instance.post(url, form_data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
        'Accept-Language': lang,
      },
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
  return res?.data;
};

const destroy = async (
  url: string,
  token: any,
  lang = 'en',
): Promise<ResponseType | null> => {
  let res;
  try {
    res = await instance.delete(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Accept-Language': lang,
      },
    });
  } catch (error) {
    return null;
  }
  return res?.data;
};

export { get, post, put, multipart, destroy };
