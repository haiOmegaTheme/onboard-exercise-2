import { LocationType, Response } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import Axios, { AxiosResponse } from "axios";
type Options = Omit<UseQueryOptions, "queryKey">;

export const useGetLocations = (options?: Options) =>
  useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      const res: AxiosResponse<Response<LocationType>> = await Axios.get(
        "http://localhost:8080/api/v1/location"
      );

      return res.data?.data ?? {};
    },
    ...options,
  });
