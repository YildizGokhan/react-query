let data = [
    { id: 1, title: "React Query", description: "Data Fetching Library" },
    { id: 2, title: "Next.js", description: "React Framework" }
  ];
  
  export default function handler(req, res) {
    if (req.method === "GET") {
      res.status(200).json(data);
    } else if (req.method === "POST") {
      const newItem = { id: Date.now(), ...req.body };
      data.push(newItem);
      res.status(201).json(newItem);
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      data = data.filter((item) => item.id !== parseInt(id));
      res.status(200).json({ message: "Deleted" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  