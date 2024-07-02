import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

const authApi = {
  login(params: any) {
    const url = '/user/login-shipper';
    return apiClient.post(url, params);
  },
  getUser() {
    const url = `/user/getUser`;
    return apiClient.get(url);
  },
};

export const useMutationLogin = () => {
  return useMutation((params: any) => authApi.login(params));
};

export const useQueryGetUser = () => {
  return useQuery(['list-user'], authApi.getUser);
};

export default authApi;
