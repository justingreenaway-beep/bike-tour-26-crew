# Bike Tour 26: Crew Edition (PWA)

Static site for GitHub Pages, with Firebase (free plan) for logins and shared crew data.

Files you edit:
- `config.js`: paste the Firebase web config and each rider's email.
- `firestore.rules`: paste into Firebase > Firestore > Rules, with the same emails in lowercase.

Files you don't touch: `index.html`, `firebase-bundle.js` (Firebase JS SDK 10.14, bundled so the app works offline), `sw.js`, `manifest.webmanifest`, `icons/`, `fonts/`.

Updating: upload a new `index.html` or `config.js` and phones pick it up next time they open with signal.
If you replace fonts, icons or `firebase-bundle.js`, change `VERSION` at the top of `sw.js`.
Don't rename the repo once the crew has installed it.
