"use client";

import { useState, useEffect, useCallback } from "react";
import { useItems } from "../hooks/useItems";
import { useUIStore } from "../store/uiStore";
import SearchInput from "@/components/SearchInput";
import ItemForm from "@/components/ItemForm";
import ItemList from "@/components/ItemList";
import Pagination from "@/components/Pagination";
import { debounce } from "lodash";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { isModalOpen, toggleModal } = useUIStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editItemData, setEditItemData] = useState(null);

  const { data, isLoading, addItem, deleteItem, editItem } = useItems(page, debouncedSearch);

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

  const handleSubmit = () => {
    if (editItemData) {
      editItem.mutate(
        { id: editItemData.id, title, description },
        {
          onSuccess: () => {
            resetForm();
          },
        }
      );
    } else {
      addItem.mutate(
        { title, description },
        {
          onSuccess: () => {
            resetForm();
          },
        }
      );
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditItemData(null);
    toggleModal();
  };

  if (isLoading) return <div className="p-4">Yükleniyor...</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">React Query CRUD + Dark Mode</h1>

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
          onSubmit={handleSubmit}
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
