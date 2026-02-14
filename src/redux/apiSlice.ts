import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Product", "Category"],
  endpoints: (builder) => ({
    // Categories
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    // Products
    getProducts: builder.query<
      { products: Product[]; totalPages: number; currentPage: number },
      {
        page?: number;
        limit?: number;
        category?: string;
        search?: string;
        sort?: string;
      }
    >({
      query: (params) => ({
        url: "/products",
        params,
      }),
      providesTags: ["Product"],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = apiSlice;
