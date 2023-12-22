"use client";

import {
  LogOutIcon,
  PlusIcon,
  TestTube2Icon,
  UserRoundIcon,
  WorkflowIcon,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface Chat {
  id: string;
  title: string;
}

const chats: Chat[] = Array.from({ length: 5 }).map((v, i) => {
  const id = i + 1;

  return {
    id: String(id),
    title: `Your chat here ${id}`,
  };
});

export function SideBar() {
  const { data, status } = useSession();
  const pathname = usePathname();

  return (
    <div className="w-[260px] bg-black">
      <nav className="flex h-full w-full flex-col px-3 pb-3.5">
        <div className="flex-1 flex flex-col">
          <Link
            href="/"
            className="my-3.5 text-xl text-center font-bold transition-all duration-500 hover:text-accent-foreground hover:underline"
          >
            Chat AI
          </Link>
          <Link
            href="/ai"
            className="group h-10 px-2 flex items-center gap-2 rounded-lg transition-opacity duration-500 hover:bg-accent"
          >
            <Image
              src="/avatar.png"
              alt="AI"
              width={28}
              height={28}
              className="rounded-full"
            />
            <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium group-hover:text-accent-foreground">
              My AI
            </div>
          </Link>
          <Link
            href="/ai-test"
            className="group h-10 px-2 flex items-center gap-2 rounded-lg transition-opacity duration-500 hover:bg-accent"
          >
            <div className="w-7 h-7 p-1.5 flex justify-center items-center bg-white text-black rounded-full">
              <TestTube2Icon />
            </div>
            <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium group-hover:text-accent-foreground">
              Test AI
            </div>
          </Link>
          <div className="my-2 ml-2 h-px w-7 bg-zinc-800"></div>
          <Link
            href="/chat"
            className="group h-10 px-2 flex items-center gap-2 rounded-lg transition-opacity duration-500 hover:bg-accent"
          >
            <div className="w-7 h-7 p-1.5 flex justify-center items-center bg-white text-black rounded-full">
              <PlusIcon />
            </div>
            <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium group-hover:text-accent-foreground">
              New chat
            </div>
          </Link>
          <div className="mt-5">
            <h3 className="h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis overflow-hidden break-all bg-black text-zinc-500">
              Your chats
            </h3>
            <ScrollArea>
              {chats.map((chat) => {
                const url = `/chat/${chat.id}`;

                return (
                  <Link
                    key={chat.id}
                    href={url}
                    className="group h-10 p-2 flex items-center gap-2 rounded-lg transition-opacity duration-500 hover:bg-accent aria-checked:bg-accent"
                    aria-checked={pathname === url}
                  >
                    <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium group-hover:text-accent-foreground">
                      {chat.title}
                    </div>
                  </Link>
                );
              })}
            </ScrollArea>
          </div>
        </div>

        {status === "authenticated" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="mt-2 p-2 flex justify-start items-center gap-2 rounded-lg transition-opacity duration-500 ring-0 hover:bg-accent data-[state=open]:bg-accent">
                <Image
                  src={data?.user?.image ?? ""}
                  alt={data?.user?.name ?? ""}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="text-sm -top-px grow -space-y-px overflow-hidden text-ellipsis whitespace-nowrap text-gray-700 text-white text-left font-semibold">
                  {data?.user?.name}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[236px] p-0 py-1 bg-accent text-accent-foreground border-gray-800"
              hideWhenDetached
            >
              <DropdownMenuItem className="p-0">
                <button className="z-50 w-full flex px-3 min-h-[44px] py-1 items-center gap-3 cursor-pointer hover:bg-gray-800">
                  <UserRoundIcon size={18} />
                  My account
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <button className="w-full flex px-3 min-h-[44px] py-1 items-center gap-3 cursor-pointer hover:bg-gray-800">
                  <WorkflowIcon size={18} />
                  Integrations
                </button>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="h-px bg-white/10" />

              <DropdownMenuItem className="p-0">
                <button className="w-full flex px-3 min-h-[44px] py-1 items-center gap-3 cursor-pointer hover:bg-gray-800">
                  <LogOutIcon size={18} />
                  Log out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </div>
  );
}
