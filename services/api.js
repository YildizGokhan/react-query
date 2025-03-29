export const fetchItems = async (page = 1, search = "") => {
    const limit = search ? 1000 : 3; // Search varsa tüm veriyi çek
    const res = await fetch(`/api/mockdata?page=${page}&limit=${limit}&search=${search}`);
    if (!res.ok) throw new Error("Veri alınamadı!");
    return res.json();
  };
  
  
  export const addItem = async (newItem) => {
    const res = await fetch("/api/mockdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    if (!res.ok) throw new Error("Ekleme başarısız!");
    return res.json();
  };
  
  export const deleteItem = async (id) => {
    const res = await fetch(`/api/mockdata?id=${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Silme başarısız!");
    return res.json();
  };
  
  export const editItem = async (updatedItem) => {
    const res = await fetch("/api/mockdata", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });
    if (!res.ok) throw new Error("Güncelleme başarısız!");
    return res.json();
  };
  