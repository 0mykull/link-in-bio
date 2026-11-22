import { createSignal } from "solid-js";

export const AUDIO_SRC = "/places-to-be.mp3";

const [isPlaying, setIsPlaying] = createSignal(false);
const [isReady, setIsReady] = createSignal(false);

let audio: HTMLAudioElement | undefined;
let ctx: AudioContext | undefined;
let analyser: AnalyserNode | undefined;
let source: MediaElementAudioSourceNode | undefined;
let data: Uint8Array<ArrayBuffer> | undefined;

function ensureAudio() {
  if (typeof window === "undefined") return;
  if (audio) return;

  audio = new Audio(AUDIO_SRC);
  audio.preload = "none";
  audio.loop = true;
  audio.crossOrigin = "anonymous";

  audio.addEventListener("play", () => setIsPlaying(true));
  audio.addEventListener("pause", () => setIsPlaying(false));
  audio.addEventListener("ended", () => setIsPlaying(false));
}

function ensureContext() {
  if (typeof window === "undefined") return;
  ensureAudio();
  if (!audio) return;
  if (ctx) return;

  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new Ctx();
  analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  analyser.smoothingTimeConstant = 0.8;
  data = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;

  source = ctx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(ctx.destination);
  setIsReady(true);
}

async function startPlayback() {
  ensureAudio();
  if (!audio || !audio.paused) return;

  ensureContext();
  if (ctx?.state === "suspended") {
    await ctx.resume();
  }
  await audio.play();
}

export async function togglePlayback() {
  if (!audio) ensureAudio();
  if (!audio) return;

  if (audio.paused) {
    try {
      await startPlayback();
    } catch {
      setIsPlaying(false);
    }
  } else {
    audio.pause();
  }
}

export async function attemptAutoplay() {
  try {
    await startPlayback();
  } catch {
    const resume = async () => {
      cleanup();
      try {
        await startPlayback();
      } catch {
        setIsPlaying(false);
      }
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
      window.removeEventListener("touchstart", resume);
    };
    window.addEventListener("pointerdown", resume, { passive: true });
    window.addEventListener("keydown", resume);
    window.addEventListener("touchstart", resume, { passive: true });
  }
}

export function getFrequencyData(): Uint8Array<ArrayBuffer> | undefined {
  if (!analyser || !data) return undefined;
  analyser.getByteFrequencyData(data);
  return data;
}

export { isPlaying, isReady };
