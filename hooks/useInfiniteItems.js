"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchItems, addItem, deleteItem, editItem } from "../services/api";
import toast from "react-hot-toast";

export const useInfiniteItems = (search) => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["items-infinite", search],
    queryFn: ({ pageParam = 1 }) => fetchItems(pageParam, search),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    onError: () => toast.error("Veri alınamadı"),
  });

  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items-infinite"] });
      toast.success("Eklendi");
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items-infinite"] });
      toast.success("Silindi");
    },
  });

  const editItemMutation = useMutation({
    mutationFn: editItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items-infinite"] });
      toast.success("Güncellendi");
    },
  });

  return {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    addItem: addItemMutation,
    deleteItem: deleteItemMutation,
    editItem: editItemMutation,
  };
};
