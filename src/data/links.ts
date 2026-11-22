export interface LinkItem {
  id: string;
  syntax: string;
  label: string;
  tag: string;
  url: string;
  featured?: boolean;
}

export const PROFILE = {
  handle: "michael.",
  alias: "mykull",
  location: "tallahassee, fl",
  status: "building embedded systems, cli tools & house sets",
  bio: "hi im michael & i like to make things on my computer. currently working as an embedded engineer.",
  email: "hi@msjr.dev",
};

export const ROUTES: LinkItem[] = [
  {
    id: "01",
    syntax: '.open("drako").cli()',
    label: "rust project scaffolding cli (2k+ devs)",
    tag: "REL_DRAKO_V2 // nid-101",
    url: "https://github.com/0mykull/drako",
    featured: true,
  },
  {
    id: "02",
    syntax: '.inspect("nvim-fountain").lua()',
    label: "treesitter screenwriting plugin for neovim",
    tag: "LUA_TS_OPT // nid-102",
    url: "https://github.com/0mykull/nvim-fountain",
  },
  {
    id: "03",
    syntax: '.play("fastbreak").tcg()',
    label: "5x5 cyberpunk grid card game prototype",
    tag: "GDD_BUILD_05 // nid-103",
    url: "https://msjr.dev",
  },
  {
    id: "04",
    syntax: '.listen("bedroom-mix-01").wav()',
    label: "late night progressive & melodic house draft",
    tag: "REC_2026_11 // nid-104",
    url: "https://soundcloud.com",
    featured: true,
  },
];

export const SOCIALS = [
  // add discorddiscord, youtube, pinterest, strava, personal site
  { name: "instagram", handle: "@0mykull", url: "https://www.instagram.com/0mykull/" },
  { name: "github", handle: "@0mykull", url: "https://github.com/0mykull" },
  { name: "spotify", handle: "m", url: "https://open.spotify.com/user/313gkwr3ogb54j2ckh3qybx4vvxm?si=cbde27ef6f5a48e1" },
  { name: "discord", handle: "@0mykull", url: "https://discord.com/users/164604000853950464" },
  { name: "email", handle: "hi@msjr.dev", url: "mailto:hi@msjr.dev" },
];
