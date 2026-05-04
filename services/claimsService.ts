import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";
import type { UseClaimsParams } from "@/types/claims";

export const getClaims = async (params: UseClaimsParams) => {
  return await axiosInstance.get(API_ROUTES.CLAIMS, {
    params,
  });
};

export const getClaimById = async (id: string) => {
  return await axiosInstance.get(API_ROUTES.CLAIM_DETAILS(id));
};