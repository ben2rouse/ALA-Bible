# Memory Verse Practice

Simple single-page app to practice memory verses. Built with Vite + React. Verses are stored in `src/data/verses.json` and selectable by version.

Quick start

```bash
# install dependencies
npm install

# run dev server
npm run dev
```

How it works

- Choose a verse and a Bible version.
- Pick a difficulty (1-5) which controls how many words are hidden.
- Hidden words become input fields. Type your answer and press Enter or leave the field to submit.
- Immediate feedback: correct entries are shown in green; incorrect entries show the correct word and are shown in red. No retries are available for attempted blanks.

Notes

- Add or edit verses in `src/data/verses.json`. Each verse has an `id`, `reference`, and `versions` map.
- This intentionally has no authentication or progress tracking.

Deployment note: This line exists solely as a trivial change to trigger a new GitHub Pages deploy.

## Working Style (Direct-to-Main for Prototype)

This project is in an experimental phase, so changes are committed straight to `main` instead of using feature branches / pull requests. That's fine for a solo prototype. If it breaks, just commit another fix.

Quick rules adopted:
- Commit only source (no `dist/`). CI/Actions builds and deploys.
- Small, frequent commits with clear messages.
- If a bad commit ships, push a follow-up fix (no need to revert unless desired).

Later (if this grows or others join) you can switch to branches + PRs without rewriting history.
