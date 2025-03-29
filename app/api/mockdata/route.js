let data = [
  { id: 1, title: "React Query", description: "Data Fetching Library" },
  { id: 2, title: "Next.js", description: "React Framework" },
  { id: 3, title: "Zustand", description: "State Management" },
  { id: 4, title: "Tailwind CSS", description: "CSS Framework" },
  { id: 5, title: "Tanstack Query", description: "React Query Library" },
  { id: 6, title: "Vercel", description: "Hosting platform" },
  { id: 7, title: "Node.js", description: "Backend Runtime" },
  { id: 8, title: "Express", description: "Minimal backend framework" },
  { id: 9, title: "MongoDB", description: "NoSQL Database" },
  { id: 10, title: "Firebase", description: "Backend as a Service" },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 3;
  const search = searchParams.get("search") || "";

  let filteredData = data;
  if (search) {
    filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const pagedData = filteredData.slice(start, end);

  return Response.json({
    data: pagedData,
    total: filteredData.length,
    page,
    totalPages: Math.ceil(filteredData.length / limit),
  });
}


  
  export async function POST(req) {
    const body = await req.json();
    const newItem = { id: Date.now(), ...body };
    data.push(newItem);
    return Response.json(newItem, { status: 201 });
  }
  
  export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id"));
    data = data.filter((item) => item.id !== id);
    return Response.json({ message: "Deleted" });
  }

  export async function PUT(req) {
    const body = await req.json();
    data = data.map((item) =>
      item.id === body.id ? { ...item, ...body } : item
    );
    return Response.json({ message: "Updated" });
  }
  
  