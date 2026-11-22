import { createSignal, For, onMount } from "solid-js";

interface Note {
  text: string;
  from: string;
  ts: string;
}

const DEFAULT_NOTES: Note[] = [
  { text: "see you at the next set", from: "anon", ts: "2026-11-20" },
  { text: "drako saved me 10 mins today", from: "dev", ts: "2026-11-18" },
];

export default function Guestbook(props: { email: string }) {
  const [notes, setNotes] = createSignal<Note[]>(DEFAULT_NOTES);
  const [message, setMessage] = createSignal("");
  const [author, setAuthor] = createSignal("");
  const [copied, setCopied] = createSignal(false);

  onMount(() => {
    const saved = localStorage.getItem("bio_guestbook_v1");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch {
        // ignore malformed local storage
      }
    }
  });

  const addNote = (e: Event) => {
    e.preventDefault();
    const clean = message().trim();
    if (!clean) return;

    const next: Note[] = [
      {
        text: clean.slice(0, 90),
        from: (author().trim() || "guest").slice(0, 18),
        ts: new Date().toISOString().slice(0, 10),
      },
      ...notes(),
    ].slice(0, 6);

    setNotes(next);
    localStorage.setItem("bio_guestbook_v1", JSON.stringify(next));
    setMessage("");
    setAuthor("");
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(props.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2 border border-[var(--border)] bg-white px-3 py-2.5">
        <span class="font-mono-tech text-xs">{props.email}</span>
        <button
          type="button"
          onClick={copyEmail}
          class="font-mono-tech cursor-pointer border border-[#111111] px-2.5 py-1 text-[11px] uppercase transition-colors hover:bg-[#111111] hover:text-white"
        >
          {copied() ? "copied ✓" : "copy email"}
        </button>
      </div>

      <form onSubmit={addNote} class="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
          placeholder="drop a quick note..."
          maxLength={90}
          class="font-mono-tech flex-1 border border-[var(--border)] bg-white px-3 py-2 text-xs outline-none focus:border-[#111111]"
        />
        <input
          type="text"
          value={author()}
          onInput={(e) => setAuthor(e.currentTarget.value)}
          placeholder="name"
          maxLength={18}
          class="font-mono-tech w-full border border-[var(--border)] bg-white px-3 py-2 text-xs outline-none focus:border-[#111111] sm:w-28"
        />
        <button
          type="submit"
          class="font-mono-tech cursor-pointer bg-[#111111] px-4 py-2 text-xs text-white transition-opacity hover:opacity-85"
        >
          post ↗
        </button>
      </form>

      <ul class="divide-y divide-[var(--border)] border-t border-[var(--border)]">
        <For each={notes()}>
          {(note) => (
            <li class="flex items-baseline justify-between gap-4 py-2 text-xs">
              <span class="lowercase text-[#111111]">“{note.text}”</span>
              <span class="font-mono-tech shrink-0 text-[11px] text-[var(--muted)]">
                — {note.from} ({note.ts})
              </span>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
