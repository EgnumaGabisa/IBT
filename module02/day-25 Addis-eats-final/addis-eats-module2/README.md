# Addis Eats — Module 2 Project Core

Addis Eats is a responsive Ethiopian food ordering web app built as a Module 2 project core.

## Features

- Semantic, responsive HTML structure
- Menu data stored in `data/menu.json`
- Async `fetch()` loads menu data into JavaScript state
- Dynamic `renderMenu()` renders menu cards from state
- Live text search
- Category filtering
- Add items to cart
- Increase/decrease quantity
- Remove items
- Automatic cart subtotal
- Cart persistence with `localStorage`
- Responsive mobile layout
- Demo checkout interaction

## Data model

Each menu item has:

```json
{
  "id": 1,
  "name": "Doro Wot",
  "category": "main",
  "price": 280,
  "description": "Spicy chicken stew with egg, served with injera.",
  "image": "https://..."
}
```

## How to run

Because the app uses `fetch()` to read JSON, use a local web server.

### VS Code + Live Server

1. Open this folder in VS Code.
2. Install/enable the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. The browser should open the Addis Eats app.

Do not open `index.html` directly with `file://`, because browser security can block the JSON request.

## Project structure

```text
addis-eats-module2/
├── index.html
├── styles.css
├── app.js
├── data/
│   └── menu.json
└── README.md
```

## Module 2 requirements mapped

| Requirement | Implementation |
|---|---|
| Semantic responsive shell | `index.html` + `styles.css` |
| Data model | `data/menu.json` |
| Load data into state | `fetch()` in `app.js` |
| Render main view | `renderMenu()` |
| Core interaction | Search + category filter |
| Second interaction | Cart |
| Persistence | `localStorage` |
| GitHub | Commit and push the project |

## Suggested Git commands

```bash
git init
git add .
git commit -m "Build Addis Eats Module 2 project core"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```


## Final additions

- Delivery location
- Customer name and phone
- Delivery address / landmark
- Demo payment method
- Processing payment state
- Payment Successful confirmation
- Automatic order number
- Last order saved to localStorage

**Payment is a simulation only. No real money is charged.**
