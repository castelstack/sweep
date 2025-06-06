import axiosInstance from '@/services/axiosConfig';
import { useQuery } from '@tanstack/react-query';

import { useMutation } from '@tanstack/react-query';

/**
 * GET /api/v1/suiper
 */
export const useGetSuiper = () => {
  return useQuery({
    queryKey: ['SUIPER'],
    queryFn: async () => {
      const response = await axiosInstance.get('suiper');
      return response.data;
    },
  });
};
export const useGetNFtCollection = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ['COLLECTION', id],
    queryFn: async () => {
      const response = await axiosInstance.get('suiper/nft/collection'+`/${id}`);
      console.log('Response data:', response.data.data.value);
      return response.data.data.value;
    },
    enabled: !!id,
    refetchInterval: 1000 * 30, // 30 seconds 
  });
};

/**
 * POST suiper/trade-config
 */
export const useCreateTradeConfig = () => {
  return useMutation({
    mutationFn: async (payload: {
      walletAddress: string;
      collectionId: string;
      buyingPercentage: number;
      listPercentage: number;
      rankingPercentage: number;
      privateKey: string;
      password: string;
    }) => {
      const response = await axiosInstance.post('suiper/trade-config/create', payload);
      return response.data;
    },
  });
};

/**
 * GET suiper/trade-config?walletAddress=...&password=...
 */
export const useGetTradeConfig = (walletAddress: string, password: string) => {
  return useQuery({
    queryKey: ['TRADE_CONFIG', walletAddress],
    queryFn: async () => {
      const response = await axiosInstance.post('suiper/trade-config', {
        walletAddress,
        password,
      });
      return response.data.data;
    },
    enabled: !!walletAddress && !!password,
  });
};

/**
 * PATCH suiper/trade-config
 */
export const useUpdateTradeConfig = () => {
  return useMutation({
    mutationFn: async (payload: {
      walletAddress: string;
      collectionId: string;
      buyingPercentage: number;
      listPercentage: number;
      rankingPercentage: number;
      isActive: boolean;
      password: string;
    }) => {
      const response = await axiosInstance.patch(
        'suiper/trade-config',
        payload
      );
      return response.data;
    },
  });
};

/**
 * PATCH suiper/trade-config/wallet
 */
export const useUpdateWalletConfig = () => {
  return useMutation({
    mutationFn: async (payload: {
      walletAddress: string;
      privateKey: string;
      password: string;
    }) => {
      const response = await axiosInstance.patch(
        'suiper/trade-config/wallet',
        payload
      );
      return response.data;
    },
  });
};

/**
 * PATCH suiper/trade-config/password
 */
export const useUpdateTradePassword = () => {
  return useMutation({
    mutationFn: async (payload: {
      walletAddress: string;
      currentPassword: string;
      newPassword: string;
    }) => {
      const response = await axiosInstance.patch(
        'suiper/trade-config/password',
        payload
      );
      return response.data;
    },
  });
};
