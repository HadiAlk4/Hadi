# Hadi

My personal website: a retro Mac on a grassy hill whose sky follows your local time of day, from dawn to night.

Each section has its own entrance:

- **Projects**: the camera dives into the Mac's screen.
- **Writing**: a sheet of paper feeds out of the floppy slot.
- **About me**: a terminal on the screen runs `whoami` and lifts off the glass.
- **Contact**: dandelion seeds blow in and spell "say hello" in the sky.

## Resume and transcript

- [Resume](docu/resume.pdf)
- [Unofficial transcript](docu/transcript.pdf)

## Running it

Open `index.html` in a browser. There's no build step for the page itself.

Add `?time=dawn`, `day`, `sunset` or `night` to the URL to preview a time of day (`?time=auto` goes back to the clock).

## Writing a post

1. Add `writing/<slug>.md`, starting with:

   ```
   ---
   title: My post
   date: 2026-11-01
   ---
   ```

2. Push. A GitHub Action builds the post page and adds it to the Writing list.

Optional front matter: `summary:` (used for the page description) and `draft: true` (keeps it unpublished). See `writing/_template.md`.

To build locally instead: `npm install`, then `npm run build`.
