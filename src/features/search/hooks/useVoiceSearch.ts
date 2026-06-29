"use client";

import { useState, useCallback } from "react";

interface VoiceSearchOptions {
  onResult: (transcript: string) => void;
  onOpen: () => void;
}

export function useVoiceSearch({ onResult, onOpen }: VoiceSearchOptions) {
  const [isListening, setIsListening] = useState(false);

  const isSupported =
    typeof window !== "undefined" &&
    ("webkitSpeechRecognition" in window || "speechRecognition" in window);

  const startVoiceSearch = useCallback(() => {
    if (!isSupported) return;

    const win = window as any;
    const SpeechRecognition =
      win.webkitSpeechRecognition || win.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "bn-BD";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      onResult(event.results[0][0].transcript);
      setIsListening(false);
      onOpen();
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  }, [isSupported, onResult, onOpen]);

  return { isListening, isSupported, startVoiceSearch };
}
