import { useMutation, useQuery } from 'react-query';
import apiClient from './apiClient';

const orderApi = {
  getAllOrder(statusOrder: any) {
    const url = '/order/list-order-by-status';
    return apiClient.post(url, statusOrder);
  },
  delivering(params: any) {
    const url = `/order/delivering`;
    return apiClient.post(url, params);
  },
  changeDelivery(orderId: any) {
    const url = 'order/change-delivery';
    return apiClient.post(url, orderId);
  },
  getOrder(orderId: any) {
    const url = `/order/${orderId}`;
    return apiClient.get(url);
  },
  onDelivered(orderId: any) {
    const url = 'order/delivered';
    return apiClient.post(url, orderId);
  },
};

export const useMutationGetAllOrder = () => {
  return useMutation((statusOrder: any) => orderApi.getAllOrder(statusOrder));
};

export const useMutationDelivering = () => {
  return useMutation((params: any) => orderApi.delivering(params));
};

export const useMutationChangeDelivery = () => {
  return useMutation((orderId: any) => orderApi.changeDelivery(orderId));
};

export const useQueryGetOrder = (orderId: any) => {
  return useQuery(['get-order'], () => orderApi.getOrder(orderId));
};

export const useMutationOnDelivered = () => {
  return useMutation((orderId: any) => orderApi.onDelivered(orderId));
};

export default orderApi;
