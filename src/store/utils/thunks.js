import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const URL_SERVER = "http://localhost:3001";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page = 1, order = "asc", limit = "10" }, { getState }) => {
    try {
      const response = await axios.get(
        `${URL_SERVER}/posts?_page=${page}&_limit=${limit}&_order=${order}&_sort=id`
      );

      const prevState = getState().posts;
      return {
        items: [...prevState.articles.items, ...response.data],
        page: page,
        end: response.data.length === 0 ? true : false,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id) => {
    try {
      const response = await axios.get(`${URL_SERVER}/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
