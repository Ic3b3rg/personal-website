import { createSignal, onMount, onCleanup } from "solid-js";
import { formatTimeForItaly, getCurrentTimeInItaly } from "../../lib/helpers";

export default function TimeZone() {
  const [time, setTime] = createSignal(formatTimeForItaly(getCurrentTimeInItaly()));

  function updateClock() {
    const now = new Date();
    setTime(formatTimeForItaly(now));
  }

  onMount(() => {
    const interval = setInterval(updateClock, 1000);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <time
      id="timeDisplay"
      datetime={new Date().toISOString()}
      class="text-2xl xl:text-5xl xl:whitespace-nowrap w-50 xl:w-100 h-[calc(100%-28px)] font-serif flex justify-center items-center"
    >
      {time()}
    </time>
  );
}