import { LocationType, Response } from "@/types";
import { SearchLocationData } from "@/types/treeSelect";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import Axios, { AxiosResponse } from "axios";
type Options = Omit<UseQueryOptions, "queryKey">;

export const useGetLocations = <
  TData = LocationType | undefined,
  TError = unknown
>(
  options?: Omit<
    UseQueryOptions<LocationType | undefined, TError, TData, QueryKey>,
    "queryKey"
  >
) =>
  useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      const res: AxiosResponse<Response<LocationType>> = await Axios.get(
        "http://localhost:8080/api/v1/location"
      );
      return res.data?.data;
    },
    ...options,
  });

export const useSearchLocations = (
  params: { search: string },
  options?: Options
) =>
  useQuery({
    queryKey: params.search
      ? ["location", "search", params.search]
      : ["location", "search"],
    queryFn: async () => {
      const res: AxiosResponse<Response<SearchLocationData>> = await Axios.get(
        `http://localhost:8080/api/v1/location/search?search=${params.search}`
      );

      return res.data?.data ?? {};
    },
    ...options,
  });
