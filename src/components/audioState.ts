import { createSignal } from "solid-js";

export const AUDIO_SRC = "/children.mp3";
export const AUDIO_TITLE = "robert miles — children (inst.)";

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

export async function togglePlayback() {
  ensureAudio();
  if (!audio) return;

  if (audio.paused) {
    ensureContext();
    if (ctx?.state === "suspended") {
      await ctx.resume();
    }
    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  } else {
    audio.pause();
  }
}

export function getFrequencyData(): Uint8Array<ArrayBuffer> | undefined {
  if (!analyser || !data) return undefined;
  analyser.getByteFrequencyData(data);
  return data;
}

export { isPlaying, isReady };
