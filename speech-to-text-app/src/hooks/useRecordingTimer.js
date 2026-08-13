import { useEffect, useState } from "react";

export default function useRecordingTimer(active) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    const id = setInterval(() => setSeconds(value => value + 1), 1000);
    return () => clearInterval(id);
  }, [active]);

  return { seconds, reset: () => setSeconds(0) };
}
