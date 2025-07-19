"use client";

import { useState, useRef, useEffect } from "react";
import { useGetPostsQuery } from "@/services/postsApi";
import type { IPost } from "@/services/postsApi";
import Card from "./Card";
import { Spin } from "antd";

const LIMIT = 10;
export default function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const { data, isLoading } = useGetPostsQuery({ limit: LIMIT, skip });

  useEffect(() => {
    if (data?.posts?.length) {
      setPosts((prev) => [...prev, ...data.posts]);
      setHasMore(data.posts.length === LIMIT);
    }
  }, [data]);

  useEffect(() => {
    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setSkip((prev) => prev + LIMIT);
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [hasMore, isLoading]);

  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.id}
          title={post.title}
          body={post.body}
          tags={post.tags}
          reactions={post.reactions}
        />
      )) || []}
      <div ref={loaderRef} className="flex justify-center p-4">
        {isLoading && <Spin />}
        {!hasMore && <p>No more posts</p>}
      </div>
    </>
  );
}
