"use client";

import { useState } from "react";
import {
  SendHorizonal,
  Clock,
  Check,
  CheckCheck,
  Sun,
  Moon,
} from "lucide-react";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useChat } from "ai/react";

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
  const { setTheme } = useTheme();
  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    api: "/api/chat",
  });

  return (
    <div className="h-screen flex flex-col">
      <header className="w-full max-w-4xl mx-auto px-4 py-2 flex justify-between items-center border-b border-border">
        <div className="flex items-center">
          <Avatar className="w-10 h-10">
            <AvatarImage src={ai.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="ml-4 font-bold">{ai.name}</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <ScrollArea id="scroll-area" className="flex-1 w-full max-w-4xl mx-auto">
        <div className="py-3 px-4 flex flex-col gap-2 justify-end">
          {messages.map((message) => {
            const Icon = () => {
              // if (message.status === "pending") {
              //   return <Clock className="w-3 h-3" />;
              // }
              // if (message.status === "sented") {
              //   return <Check className="w-4 h-4" />;
              // }
              // if (message.status === "delivered") {
              //   return <CheckCheck className="w-4 h-4" />;
              // }
              // if (message.status === "readed") {
              //   return <CheckCheck className="w-4 h-4 text-blue-500" />;
              // }
              return null;
            };

            return (
              <div
                key={message.id}
                className={cn(
                  "bg-secondary py-1 px-2 mr-2 rounded-lg flex gap-2 w-fit max-w-xl shadow",
                  message.role === "user" && "self-end bg-foreground text-card"
                )}
              >
                <p className="break-words overflow-hidden">{message.content}</p>
                <span className="-mb-0.5 self-end text-xs text-stone-500 flex items-center gap-1">
                  {dayjs(message.createdAt).format("HH[:]mm")}
                  <Icon />
                </span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="w-full max-w-4xl mx-auto px-4 py-2">
        <form className="flex items-center gap-4" onSubmit={handleSubmit}>
          <div className="w-full p-1.5 flex items-center gap-3 rounded-lg border border-input ring-offset-background  focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:outline-none">
            <Textarea
              className="min-h-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
              placeholder="Type a message"
              value={input}
              onChange={handleInputChange}
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
