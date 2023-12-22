"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ArrowUpIcon, PaperclipIcon } from "lucide-react";

export interface Message {
  id: string;
  type: "user" | "assistant";
  message: string;
}

interface ChatProps {
  chats: Message[];
}

export function Chat({ chats }: ChatProps) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollAreaViewPort = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );

      console.log(scrollAreaViewPort);
      if (scrollAreaViewPort) {
        scrollAreaViewPort.scrollTop = scrollAreaViewPort.scrollHeight;
      }
    }
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <div className="h-14 mb-1.5 p-2 font-semibold" />
      <ScrollArea ref={scrollAreaRef} className="h-full" type="auto">
        <div className="max-w-[48rem] mx-auto px-5 pb-9">
          {chats.map((chat) => {
            return (
              <div key={chat.id} className="px-4 py-6 flex gap-3">
                <Image
                  src={
                    chat.type === "user"
                      ? "https://avatars.githubusercontent.com/u/116765970?v=4"
                      : "/avatar.png"
                  }
                  alt="avatar"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
                <div>
                  <strong className="font-semibold">
                    {chat.type === "user" ? "You" : "Chat AI"}
                  </strong>
                  <div className="flex flex-col gap-3 text-gray-300">
                    {chat.message.split("\n").map((text, index) => {
                      return <p key={index}>{text}</p>;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div>
        <form className="max-w-3xl mx-auto">
          <div className="relative border border-border text-white rounded-2xl">
            <Button className="absolute h-fit p-0 bottom-3 left-4">
              <PaperclipIcon className="w-6 h-6" />
            </Button>
            <Textarea
              className="min-h-0 h-[52px] max-h-[200px] border-0 ring-0 resize-none pl-[55px] pr-12 py-3.5 rounded-2xl focus-visible:ring-0 placeholder-white/50 overflow-y-hidden"
              placeholder="Type a message..."
              // value={input}
              // onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();

                  const form = document.querySelector("form");

                  if (form) {
                    form.requestSubmit();
                  }
                }
              }}
            />
            <Button
              type="submit"
              className="absolute h-fit p-1.5 bottom-3 right-3 rounded-lg text-black transition-colors enabled:bg-white enabled:hover:bg-gray-400 disabled:bg-white disabled:opacity-20 disabled:text-gray-400"
              // disabled
            >
              <ArrowUpIcon className="w-5 h-5" />
            </Button>
          </div>
        </form>
        <div className="w-full px-[60px] py-2 text-center text-xs text-gray-300">
          <span>
            Chat AI can make mistakes. Consider checking important information.
          </span>
        </div>
      </div>
    </div>
  );
}
