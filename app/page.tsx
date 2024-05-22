"use client";

import Modal from "@/components/modal";
import { Thumbs } from "@/components/thumbs";
import { getSessionKey } from "@/utils/network/getSessionKey";
import { Button } from "@radix-ui/themes";
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

const vapi = new Vapi("82895e5e-4551-409e-bd42-931a04b35913");

export default function Home() {
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      const response = await getSessionKey();
      setSessionKey(response);
    }
    fetchData();
  }, []);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[] | undefined
  >([]);

  const [currentMessage, setCurrentMessage] = useState("");
  useEffect(() => {
    const onMessage = (message: Message) => {
      if (message.transcriptType === "partial") {
        setCurrentMessage(message.transcript);
      } else if (message.type === "conversation-update") {
        setMessages(message.conversation);
        setCurrentMessage("");
      }
    };
    const onCallStart = () => {
      setIsTalking(true);
      setIsLoading(false);
    };
    vapi.on("call-start", onCallStart);
    vapi.on("message", onMessage);

    return () => {
      vapi.off("message", onMessage);
      vapi.off("call-start", onCallStart);
    };
  }, [currentMessage]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-x-hidden overflow-y-auto">
      <Modal
        show={showModal}
        onClose={toggleModal}
        title="Was this conversation helpful?"
      >
        {sessionKey && <Thumbs sessionKey={sessionKey} />}
        <div className="flex"></div>
      </Modal>
      <h1 className="text-5xl">Health Check</h1>
      <h1 className="text-xl">Let&apos;s take care of you</h1>
      <div className="chat-log bg-gray-200 text-cyan-800 p-4 rounded-md w-full max-w-md mb-4">
        {currentMessage}
      </div>
      <div className="w-[100%] max-h-[50vh] overflow-auto">
        <div className="m-auto w-[75%]  flex flex-col-reverse">
          <div className="flex flex-col">
            {messages?.map((message) => (
              <div
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                } w-[100%] my-2`}
                key={message.content}
              >
                <div
                  className={`bg-slate-300 w-[48%] max-w-[48%] inline-block rounded-md p-4 text-black ${
                    message.role === "assistant" ? "text-left" : "text-right"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isTalking ? (
        <Button
          size={"4"}
          loading={isLoading}
          onClick={() => {
            vapi.stop();
            setIsTalking(false);
            toggleModal();
            fetch("/api/collectConversation", {
              method: "POST",
              body: JSON.stringify({
                sessionKey,
                conversation: JSON.stringify(messages),
              }),
            });
          }}
        >
          Stop Chatting
        </Button>
      ) : (
        <Button
          size={"4"}
          loading={isLoading}
          onClick={() => {
            vapi.start("82f2877d-a2e8-4641-9b78-00e8b7665f28");
            setIsLoading(true);
          }}
        >
          Start Chatting
        </Button>
      )}
      <footer className="w-[50%]">
        <div className="flex flex-col text-center gap-5">
          <p>&copy; {new Date().getFullYear()} Caleb Mabry</p>
          <div>
            Powered by
            <p className="flex w-full flex-row justify-between underline">
              <a href="https://www.outerbase.com/" target="_blank">
                Outerbase
              </a>
              <a href="https://vapi.ai/" target="_blank">
                Vapi
              </a>
              <a href="https://deepgram.com/" target="_blank">
                Deepgram
              </a>
              <a href="https://groq.com/" target="_blank">
                Groq
              </a>
            </p>
          </div>
          <hr className="w-[9999px] translate-x-[-500px]" />
          <p className="flex w-full flex-row justify-between underline">
            {/* <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a> */}
          </p>
        </div>
      </footer>
    </div>
  );
}
