import { createSignal, onCleanup, onMount } from "solid-js";
import { getFrequencyData, isPlaying, isReady } from "./audioState";

export default function AsciiArt() {
  let containerRef: HTMLDivElement | undefined;
  let raf = 0;
  const [cols, setCols] = createSignal(24);
  const [levels, setLevels] = createSignal<number[]>([]);

  onMount(() => {
    const measure = () => {
      if (!containerRef) return;
      const vw = window.innerWidth;
      // Responsive bar count by viewport, capped at 32
      const next = vw < 480 ? 14 : vw < 640 ? 18 : vw < 768 ? 22 : vw < 1024 ? 28 : 32;
      setCols(next);
    };

    measure();
    window.addEventListener("resize", measure, { passive: true });

    let tick = 0;
    const draw = () => {
      tick += 1;
      const count = cols();
      const freq = getFrequencyData();
      const next: number[] = new Array(count).fill(0);

      if (freq && isReady() && isPlaying()) {
        const usable = Math.floor(freq.length * 0.8);
        for (let i = 0; i < count; i++) {
          const start = Math.floor((i / count) * usable);
          const end = Math.max(start + 1, Math.floor(((i + 1) / count) * usable));
          let sum = 0;
          for (let j = start; j < end; j++) sum += freq[j];
          const avg = sum / (end - start);
          next[i] = Math.pow(avg / 255, 0.82);
        }
      } else {
        for (let i = 0; i < count; i++) {
          const a = Math.sin((i + tick * 0.06) * 0.28) * 0.5 + 0.5;
          const b = Math.sin((i * 0.7 - tick * 0.04) * 0.18) * 0.5 + 0.5;
          next[i] = (a * 0.6 + b * 0.4) * 0.35;
        }
      }

      setLevels(next);
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    onCleanup(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    });
  });

  return (
    <div
      ref={containerRef}
      class="mb-10 w-full overflow-hidden border border-[var(--border)] bg-white px-3 py-3 sm:px-4"
      aria-hidden="true"
    >
      <div class="font-mono-tech mb-3 flex items-center justify-between text-[10px] uppercase tracking-wider text-[var(--muted)]">
        <span>{isPlaying() ? "live" : "idle"}</span>
        <span class="tabular-nums">{cols()} bars</span>
      </div>
      <div class="flex h-24 items-end gap-[3px] sm:h-28 sm:gap-1">
        {levels().map((level) => (
          <div class="flex h-full flex-1 items-end">
            <div
              class="w-full bg-[#111111] transition-[height] duration-75"
              style={{ height: `${Math.max(4, Math.round(level * 100))}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
