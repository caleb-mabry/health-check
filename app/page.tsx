"use client";

import { getSessionKey } from "@/utils/network/getSessionKey";
import Vapi from "@vapi-ai/web";
import { useState, useEffect } from "react";

// Define the type for a message
interface Message {
  timestamp: string;
  role: string;
  transcriptType: "partial";
  transcript: string;
  status: "stopped" | "started";
  type: "conversation-update" | "transcript";
  conversation?: {
    role: "assistant" | "user";
    content: string;
  }[];
}
console.log(process.env.TADA);
const vapi = new Vapi("82895e5e-4551-409e-bd42-931a04b35913");

export default function Home() {
  const [sessionKey, setSessionkey] = useState("");
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getSessionKey();
      setSessionkey(response);
    }
    fetchData();
  }, []);
  const [isTalking, setIsTalking] = useState(false);
  const [messages, setMessages] = useState<
    {
      role: "assistant" | "user";
      content: string;
    }[]
  >();
  const [currentMessage, setCurrentMessage] = useState("");
  useEffect(() => {
    const onMessage = (message: Message) => {
      if (message.transcriptType === "partial") {
        setCurrentMessage(message.transcript);
      } else if (message.type === "conversation-update") {
        fetch;
        setMessages(message.conversation);
        setCurrentMessage("");
      }
    };
    vapi.on("message", onMessage);

    return () => {
      vapi.off("message", onMessage);
    };
  }, [currentMessage]);

  return (
    <div className="flex flex-col items-center justify-center">
      {sessionKey}

      <div className="chat-log bg-gray-200 p-4 rounded-md w-full max-w-md mb-4">
        {currentMessage}
      </div>

      {isTalking ? (
        <button
          className="border-r-4 bg-gray-500 px-4 py-2 rounded"
          onClick={() => {
            vapi.stop();
            setIsTalking(false);
          }}
        >
          Stop Chatting
        </button>
      ) : (
        <button
          className="border-r-4 bg-gray-500 px-4 py-2 rounded"
          onClick={() => {
            vapi.start("82f2877d-a2e8-4641-9b78-00e8b7665f28");
            setIsTalking(true);
          }}
        >
          Start Chatting
        </button>
      )}
    </div>
  );
}
