"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "phosphor-react";
import { useRouter } from "next/navigation";

const updateValue = async (key: string, selectedRating: boolean) => {
  await fetch("/api/rate", {
    method: "POST",
    body: JSON.stringify({
      sessionKey: key,
      rating: selectedRating,
    }),
  });
};
export const Thumbs = ({ sessionKey }: { sessionKey: string }) => {
  const [selected, setSelected] = useState<"up" | "down" | null>(null);
  const router = useRouter();

  const handleThumbsUp = () => {
    updateValue(sessionKey, true);
    setSelected("up");
    window.location.reload();
  };
  const handleThumbsDown = () => {
    updateValue(sessionKey, false);
    setSelected("down");
    window.location.reload();
  };

  return (
    <div className="flex space-x-4 items-center">
      <button
        onClick={handleThumbsUp}
        className={`flex items-center space-x-2 px-4 py-2 rounded ${
          selected === "up" ? "bg-green-500 text-white" : "bg-green-500"
        }`}
      >
        <ThumbsUp size={24} />
        <span>Thumbs Up</span>
      </button>
      <button
        onClick={handleThumbsDown}
        className={`flex items-center space-x-2 px-4 py-2 rounded ${
          selected === "down" ? "bg-red-500 text-white" : "bg-red-800"
        }`}
      >
        <ThumbsDown size={24} />
        <span>Thumbs Down</span>
      </button>
    </div>
  );
};
