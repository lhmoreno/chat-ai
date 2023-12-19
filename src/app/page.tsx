import Chat from "@/components/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Ai {
  name: string;
  avatar: string;
}

const ai: Ai = {
  name: "Assistant AI",
  avatar: "/avatar.png",
};

export default function Home() {
  return (
    <div className="max-w-4xl h-screen mx-auto flex flex-col">
      <header className="px-4 py-2 flex items-center bg-neutral-800">
        <Avatar className="w-10 h-10">
          <AvatarImage src={ai.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="ml-4 font-bold">{ai.name}</h2>
      </header>
      <Chat />
    </div>
  );
}
