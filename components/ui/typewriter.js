"use client"
import { useEffect, useState } from "react";

export default function Typewriter({ words, typeSpeed = 200, deleteSpeed = 55, pause = 1100 }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    const tick = () => {
      if (!isDeleting) {
        // typing
        const next = current.slice(0, text.length + 1);
        setText(next);

        if (next === current) {
          // finished word → pause → start deleting
          setTimeout(() => setIsDeleting(true), pause);
          return;
        }
      } else {
        // deleting
        const next = current.slice(0, text.length - 1);
        setText(next);

        if (next === "") {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
          return;
        }
      }
    };

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className="inline-flex items-center">
      {text}
      <span className="ml-1 inline-block w-[2px] h-[1em] bg-current blink" />
    </span>
  );
}
