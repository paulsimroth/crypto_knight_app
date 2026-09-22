"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

const STORAGE_KEY = "gamerules_seen_at";
const SHOW_AGAIN_AFTER_MS = 1000 * 60 * 60 * 24 * 3; // 3 days

/**
 * Game rules popup.
 * Shows on the first visit and again once SHOW_AGAIN_AFTER_MS has passed since it was last closed.
 */
export function GameRules() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const seenAt = Number(localStorage.getItem(STORAGE_KEY));
      setOpen(!seenAt || Date.now() - seenAt > SHOW_AGAIN_AFTER_MS);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* storage blocked – rules will just show again next visit */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <Card
      role="dialog"
      aria-labelledby="rules-title"
      className="z-90 fixed mx-auto top-1/2 -translate-y-1/2 left-0 right-0 max-w-[90%] md:max-w-screen-sm text-[17px] flex flex-col"
    >
      <CardHeader>
        <CardTitle>Crypto Knights</CardTitle>
        <CardDescription>Welcome to this Web3 game!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <h2 id="rules-title" className="text-2xl font-bold">
          Rules
        </h2>
        <p>
          Start the game and collect as many coins as you can. When the time
          runs out, your tokens are sent straight to your wallet.
        </p>
        <p>
          Soon you&apos;ll be able to trade coins for special items that boost
          your knight&apos;s abilities.
        </p>
        <p>
          Move the knight with the <strong>arrow keys</strong> or{" "}
          <strong>spacebar</strong>.
        </p>
        <p className="text-lime-500">
          Got an idea for the game? Send it through the contact form or
          contribute on GitHub!
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={close} autoFocus>
          Let&apos;s play
        </Button>
      </CardFooter>
    </Card>
  );
}
