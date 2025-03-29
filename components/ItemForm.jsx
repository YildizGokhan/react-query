"use client";

export default function ItemForm({
    title,
    description,
    setTitle,
    setDescription,
    onSubmit,
    editMode,
  }) {
    return (
      <div className="flex flex-col gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Başlık"
          className="border p-2 rounded"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama"
          className="border p-2 rounded"
        />
        <button
          onClick={onSubmit}
          disabled={!title || !description}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {editMode ? "Güncelle" : "Ekle"}
        </button>
      </div>
    );
  }
  