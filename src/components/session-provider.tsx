"use client";

import {
  SessionProvider as Provider,
  SessionProviderProps,
} from "next-auth/react";

export function SessionProvider(props: SessionProviderProps) {
  return <Provider {...props} />;
}
