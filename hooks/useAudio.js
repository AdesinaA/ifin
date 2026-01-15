import { useState, useEffect, useRef } from "react";

export function useAudio(url) {
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(url);
    audioRef.current.loop = true;
    audioRef.current.play().catch((error) => {
      // Autoplay was prevented. We'll need user interaction to start playing.
      setPlaying(false);
    });

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, [url]);

  const toggle = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  return [playing, toggle];
}
