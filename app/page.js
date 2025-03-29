"use client";

import { useState, useEffect, useCallback } from "react";
import { useItems } from "../hooks/useItems";
import { useUIStore } from "../store/uiStore";
import SearchInput from "@/components/SearchInput";
import ItemForm from "@/components/ItemForm";
import ItemList from "@/components/ItemList";
import Pagination from "@/components/Pagination";
import SkeletonCard from "@/components/SkeletonCard";
import { debounce } from "lodash";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading, addItem, deleteItem, editItem } = useItems(page, debouncedSearch);
  const { isModalOpen, toggleModal } = useUIStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editItemData, setEditItemData] = useState(null);

  const handleSearch = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
    }, 500),
    []
  );

  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleAdd = () => {
    addItem.mutate(
      { title, description },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          toggleModal();
        },
      }
    );
  };

  const handleEdit = () => {
    editItem.mutate(
      { id: editItemData.id, title, description },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setEditItemData(null);
          toggleModal();
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">React Query + Filter + Pagination</h1>

      <SearchInput search={search} setSearch={setSearch} />

      <button
        onClick={() => {
          setEditItemData(null);
          setTitle("");
          setDescription("");
          toggleModal();
        }}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        {isModalOpen ? "Kapat" : "Yeni Ekle"}
      </button>

      {isModalOpen && (
        <ItemForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          onSubmit={() => {
            editItemData ? handleEdit() : handleAdd();
          }}
          editMode={!!editItemData}
        />
      )}

      <ItemList
        items={data.data}
        onDelete={(id) => deleteItem.mutate(id)}
        onEdit={(item) => {
          setEditItemData(item);
          setTitle(item.title);
          setDescription(item.description);
          toggleModal();
        }}
      />

      {!debouncedSearch && (
        <Pagination page={page} totalPages={data.totalPages} setPage={setPage} />
      )}
    </div>
  );
}
