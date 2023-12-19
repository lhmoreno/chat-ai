"use client";

import { useState } from "react";
import { SendHorizonal, Clock, Check, CheckCheck } from "lucide-react";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface Ai {
  name: string;
  avatar: string;
}

const ai: Ai = {
  name: "Assistant AI",
  avatar: "/avatar.png",
};

interface Message {
  id: string;
  timestamp: Date;
  content: string;
  status?: "pending" | "sented" | "delivered" | "readed";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello",
      timestamp: new Date(),
    },
    {
      id: "2",
      content: "Hi",
      timestamp: new Date(),
      status: "pending",
    },
  ]);
  const [message, setMessage] = useState("");

  async function handleSubmitMessage(
    ev: React.FormEvent<HTMLFormElement> & React.FormEvent<HTMLDivElement>
  ) {
    ev.preventDefault();

    sendMessage();
  }

  async function sendMessage() {
    if (message.trim() === "") {
      return;
    }

    setMessages((v) => {
      const list: Message[] = [
        ...v,
        {
          id: String(Math.random() * 10000),
          content: message,
          status: "pending",
          timestamp: new Date(),
        },
      ];

      return list;
    });

    window.setTimeout(() => {
      setMessages((v) => {
        const list = [...v];

        list[list.length - 1] = {
          ...list[list.length - 1],
          status: "sented",
        };

        return list;
      });
    }, 500);

    window.setTimeout(() => {
      setMessages((v) => {
        const list = [...v];

        list[list.length - 1] = {
          ...list[list.length - 1],
          status: "delivered",
        };

        return list;
      });
    }, 1200);

    window.setTimeout(() => {
      setMessages((v) => {
        const list = [...v];

        list[list.length - 1] = {
          ...list[list.length - 1],
          status: "readed",
        };

        return list;
      });
    }, 1500);

    setMessage("");
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="w-full max-w-4xl mx-auto px-4 py-2 flex items-center border-b border-border">
        <Avatar className="w-10 h-10">
          <AvatarImage src={ai.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="ml-4 font-bold">{ai.name}</h2>
      </header>
      <ScrollArea id="scroll-area" className="flex-1 w-full max-w-4xl mx-auto">
        <div className="py-3 px-4 flex flex-col gap-2 justify-end">
          {messages.map((message) => {
            const Icon = () => {
              if (message.status === "pending") {
                return <Clock className="w-3 h-3" />;
              }
              if (message.status === "sented") {
                return <Check className="w-4 h-4" />;
              }
              if (message.status === "delivered") {
                return <CheckCheck className="w-4 h-4" />;
              }
              if (message.status === "readed") {
                return <CheckCheck className="w-4 h-4 text-blue-500" />;
              }
              return null;
            };

            return (
              <div
                key={message.id}
                className={cn(
                  "bg-secondary py-1 px-2 mr-2 rounded-lg flex gap-2 w-fit max-w-xl shadow",
                  message.status && "self-end bg-foreground text-card"
                )}
              >
                <p className="break-words overflow-hidden">{message.content}</p>
                <span className="-mb-0.5 self-end text-xs text-stone-500 flex items-center gap-1">
                  {dayjs(message.timestamp).format("HH[:]mm")}
                  <Icon />
                </span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="w-full max-w-4xl mx-auto px-4 py-2">
        <form
          className="flex items-center gap-4"
          onSubmit={handleSubmitMessage}
        >
          <div className="w-full p-1.5 flex items-center gap-3 rounded-lg border border-input ring-offset-background  focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:outline-none">
            <Textarea
              className="min-h-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Type a message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button type="submit" className="p-2 w-10 h-10">
              <SendHorizonal className="w-full h-full" />
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Create by lhmoreno
        </p>
      </div>
    </div>
  );
}
