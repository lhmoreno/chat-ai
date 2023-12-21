import { openai } from "@/lib/openai";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SideBar } from "@/components/sidebar";

async function getAssistants() {
  // const { data } = await openai.beta.assistants.list();
  // return data;
}

async function getChats() {
  // return [{ id: "1", title: "Test", assistant: "Assistant AI" }];
}

export default async function Home() {
  const [assistants, chats] = await Promise.all([getAssistants(), getChats()]);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 text-4xl font-bold flex justify-center items-center">
        Chat
      </div>
    </div>
  );
}
