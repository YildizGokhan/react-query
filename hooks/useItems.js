"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchItems, addItem, deleteItem, editItem } from "../services/api";
import toast from "react-hot-toast";

export const useItems = (page, search) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["items", page, search],
    queryFn: () => fetchItems(page, search),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    onError: (err) => toast.error("Veri alınamadı"),
  });

  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Eklendi");
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Silindi");
    },
  });

  const editItemMutation = useMutation({
    mutationFn: editItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Güncellendi");
    },
  });

  return {
    data,
    isLoading,
    error,
    addItem: addItemMutation,
    deleteItem: deleteItemMutation,
    editItem: editItemMutation,
  };
};
