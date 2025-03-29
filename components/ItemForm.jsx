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
    <div className="flex flex-col gap-2 mb-4 bg-white dark:bg-gray-800 p-4 rounded shadow dark:shadow-md">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-2 rounded"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-2 rounded"
      />
      <button
        onClick={onSubmit}
        disabled={!title || !description}
        className="bg-primary text-white p-2 rounded disabled:opacity-50 hover:bg-primary-dark transition dark:bg-primary-dark dark:hover:bg-primary"
      >
        {editMode ? "Güncelle" : "Kaydet"}
      </button>
    </div>
  );
}
