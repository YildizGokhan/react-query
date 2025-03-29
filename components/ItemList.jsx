"use client";

export default function ItemList({ items, onDelete, onEdit }) {
  return (
    <ul className="space-y-2 mb-4">
      {items.map((item) => (
        <li
          key={item.id}
          className="border p-4 rounded flex justify-between bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 shadow-sm dark:shadow-md"
        >
          <div>
            <strong className="text-gray-800 dark:text-gray-100">{item.title}</strong>{" "}
            <span className="text-gray-600 dark:text-gray-300">- {item.description}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="text-yellow-600 dark:text-yellow-400 hover:underline"
            >
              Düzenle
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-500 dark:text-red-400 hover:underline"
            >
              Sil
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
