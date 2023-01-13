import axios from 'axios';
import Cookies from 'universal-cookie';

const baseApiClient = axios.create({
  baseURL: `${process.env.BACKEND_SERVER_URL}`,
});

async function axiosInterceptor({ ...options }): Promise<any> {
  baseApiClient.interceptors.request.use((request) => {
    const cookies = new Cookies();
    const token = cookies.get(process.env.JWT_COOKIE_NAME);

    if (!request.headers['x-jwt']) {
      request.headers['x-jwt'] = token || '';
    }

    return request;
  });

  const onSuccess = (response: any) => response;

  const onError = (error: any) => {
    return Promise.reject(error);
  };

  try {
    const response = await baseApiClient(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

export default axiosInterceptor;
