import { useState } from "react";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Tag } from "antd";

interface PostCardProps {
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
}

export default function Card({ title, body, tags, reactions }: PostCardProps) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => setShowFullText((prev) => !prev);

  return (
    <div
      className="border rounded-xl p-4 shadow-sm max-w-[500px] w-full flex flex-col gap-2"
      style={{ backgroundColor: "#fff" }}
    >
      <h2 className="text-lg font-semibold">{title}</h2>

      <p
        className={`text-gray-700 text-sm transition-all duration-300 ${
          showFullText ? "" : "line-clamp-3"
        }`}
      >
        {body}
      </p>

      {body.split(" ").length > 30 && (
        <button
          onClick={toggleText}
          className="text-blue-500 text-xs self-start hover:underline"
        >
          {showFullText ? "Hide" : "Show more"}
        </button>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <Tag color="blue" key={index}>
            #{tag}
          </Tag>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <LikeOutlined /> {reactions.likes}
        </span>
        <span className="flex items-center gap-1">
          <DislikeOutlined /> {reactions.dislikes}
        </span>
      </div>
    </div>
  );
}
