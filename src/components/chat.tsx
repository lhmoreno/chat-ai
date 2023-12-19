"use client";

import { useRef, useState } from "react";
import {
  Paperclip,
  SendHorizonal,
  Clock,
  Check,
  CheckCheck,
} from "lucide-react";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

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
  const inputMessageRef = useRef<HTMLInputElement>(null);

  async function handleSubmitMessage(
    ev: React.FormEvent<HTMLFormElement> & React.FormEvent<HTMLDivElement>
  ) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);
    const message = String(formData.get("message")).trim();

    if (message === "") {
      return;
    }

    const data = {
      createdAt: new Date().toISOString(),
      status: "pending" as "pending" | "sented" | "delivered" | "readed",
      content: message,
    };

    // const messagesRef = ref(database, "messages");
    // const reference = push(messagesRef, data);

    // setMessages((v) => {
    //   const list: Message[] = [
    //     ...v,
    //     {
    //       id: reference.key ?? "",
    //       ...data,
    //       createdAt: new Date(data.createdAt),
    //     },
    //   ];

    //   return list;
    // });

    if (inputMessageRef?.current?.value) {
      inputMessageRef.current.value = "";
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea id="scroll-area" className="flex-1 bg-neutral-700">
        <div className="mx-auto max-w-5xl h-full pb-6 px-3 flex flex-col gap-2 justify-end">
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
                className={`
                    "bg-emerald-200 py-1 px-2 mr-2 rounded-lg flex gap-2 w-fit max-w-xl self-end shadow"
                    ${!message.status && "self-start bg-white"}
                  `}
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
      <div className="p-4 flex items-center gap-4 bg-neutral-800">
        <Button variant="ghost">
          <Paperclip className="w-5 h-5" />
        </Button>
        <form
          className="flex-1 flex items-center gap-4"
          onSubmit={handleSubmitMessage}
        >
          <Input
            ref={inputMessageRef}
            className="text-base"
            name="message"
            placeholder="Type a message"
          />
          <Button type="submit">
            <SendHorizonal className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
