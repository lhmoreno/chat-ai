import { Chat, Message } from "@/components/chat";
import { faker } from "@faker-js/faker";

export async function getChat() {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const messages: Message[] = Array.from({ length: 2 }).map((_, index) => {
    if (index % 2 === 0) {
      return {
        id: faker.string.uuid(),
        type: "user",
        message: faker.lorem.paragraphs(1),
      };
    }

    return {
      id: faker.string.uuid(),
      type: "assistant",
      message: faker.lorem.paragraphs({ min: 2, max: 5 }),
    };
  });

  return messages;
}

export default async function ChatPage() {
  const chats = await getChat();

  return <Chat chats={chats} />;
}
