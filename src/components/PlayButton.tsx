import { isPlaying, togglePlayback } from "./audioState";

export default function PlayButton() {
  return (
    <button
      type="button"
      onClick={() => void togglePlayback()}
      aria-label={isPlaying() ? "Pause song" : "Play song"}
      aria-pressed={isPlaying()}
      class="font-mono-tech inline-flex h-7 shrink-0 items-center gap-1.5 border border-[#111111] bg-[#111111] px-2.5 text-[10px] uppercase tracking-wider text-white transition-opacity hover:opacity-85 sm:h-8 sm:px-3 sm:text-[11px]"
    >
      <span class="inline-block w-3 text-center text-[10px] leading-none sm:text-xs" aria-hidden="true">
        {isPlaying() ? "■" : "▶"}
      </span>
      <span>{isPlaying() ? "pause" : "play"}</span>
    </button>
  );
}
