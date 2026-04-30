await Bun.build({
  entrypoints: ['./src/main.ts'],
  outdir: './',
  external: [
    "obsidian",
  ],
  format: "cjs",
  target: 'node',
});
