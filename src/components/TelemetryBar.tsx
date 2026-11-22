import { createSignal, onCleanup, onMount } from "solid-js";

const TALLAHASSEE_COORDS = "30.4383° N, 84.2807° W";

export default function TelemetryBar() {
  const [time, setTime] = createSignal("--:--:--");

  onMount(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      );
    };

    updateClock();

    const timer = setInterval(updateClock, 1000);
    onCleanup(() => clearInterval(timer));
  });

  return (
    <div class="font-mono-tech grid grid-cols-[auto_1fr_auto] items-center gap-x-2 sm:gap-x-4 border-y border-[var(--border)] py-2.5 text-[10px] sm:text-[11px] tracking-tight text-[var(--muted)]">
      <span class="whitespace-nowrap">LOC: TLH_FL</span>
      <span class="whitespace-nowrap text-center">{TALLAHASSEE_COORDS}</span>
      <span class="whitespace-nowrap text-right tabular-nums">{time()}</span>
    </div>
  );
}
