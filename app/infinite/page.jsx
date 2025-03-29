"use client";

import { useInfiniteItems } from "../../hooks/useInfiniteItems";
import { useRef, useEffect } from "react";

export default function InfinitePage() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteItems();
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <div className="p-4">Yükleniyor...</div>;
  if (isError) return <div className="p-4">Hata oluştu</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Infinite Scroll Örneği</h1>
      <ul className="space-y-2 mb-4">
        {data.pages.map((page) =>
          page.data.map((item) => (
            <li key={item.id} className="border p-2 rounded">
              <strong>{item.title}</strong> - {item.description}
            </li>
          ))
        )}
      </ul>
      <div ref={observerRef} className="h-10 flex justify-center items-center">
        {isFetchingNextPage && <span>Yükleniyor...</span>}
        {!hasNextPage && <span>Tüm veriler yüklendi.</span>}
      </div>
    </div>
  );
}
