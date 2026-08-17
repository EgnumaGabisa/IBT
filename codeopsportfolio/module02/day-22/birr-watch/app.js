
// 1. STATE
const state = {
    rates: {},
    currencies: {},
    watchlist: [],
    loading: false,
    error: null
};
// 2. DOM ELEMENTS
const statusEl = document.getElementById("status");
const currencyEl = document.getElementById("currency");
const convertForm = document.getElementById("convertForm");
const amountEl = document.getElementById("amount");
const resultEl = document.getElementById("result");
const watchlistEl = document.getElementById("watchlist");

// 3. LOAD WATCHLIST FROM STORAGE

function loadWatchlist() {

    const saved = localStorage.getItem("birrWatchlist");

    if (saved) {
        state.watchlist = JSON.parse(saved);
    }

}

// 4. SAVE WATCHLIST

function saveWatchlist() {

    localStorage.setItem(
        "birrWatchlist",
        JSON.stringify(state.watchlist)
    );

}


// ===============================
// 5. FETCH RATES
// ===============================

async function fetchRates() {

    state.loading = true;
    state.error = null;

    statusEl.textContent = "Loading exchange rates...";

    try {

        const response = await fetch(
            "https://api.frankfurter.app/latest?from=EUR"
        );

        if (!response.ok) {
            throw new Error("Failed to load exchange rates");
        }

        const data = await response.json();

        /*
         * Frankfurter gives rates based on EUR.
         *
         * We need ETB as our base currency.
         *
         * Therefore we fetch EUR -> ETB and
         * calculate the other currencies relative to ETB.
         */

        const etbRate = data.rates.ETB;

        state.rates = {};

        for (const currency in data.rates) {

            if (currency === "ETB") {
                continue;
            }

            state.rates[currency] =
                data.rates[currency] / etbRate;
        }

        state.rates["EUR"] = 1 / etbRate;

        state.rates["ETB"] = 1;

        createCurrencyDropdown();

        state.loading = false;

        statusEl.textContent =
            "Exchange rates loaded successfully.";

    } catch (error) {

        state.loading = false;
        state.error = error.message;

        statusEl.textContent =
            "Error: Could not load exchange rates.";

        console.error(error);
    }
}


// ===============================
// 6. CREATE CURRENCY DROPDOWN
// ===============================

function createCurrencyDropdown() {

    currencyEl.innerHTML = "";

    for (const currency in state.rates) {

        const option = document.createElement("option");

        option.value = currency;
        option.textContent = currency;

        currencyEl.appendChild(option);
    }

}


// ===============================
// 7. CONVERT FORM
// ===============================

convertForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const amount = Number(amountEl.value);
    const currency = currencyEl.value;

    // Validate amount

    if (!amount || amount <= 0) {

        resultEl.textContent =
            "Please enter a valid amount.";

        return;
    }

    // Check currency

    if (!currency || !state.rates[currency]) {

        resultEl.textContent =
            "Please choose a valid currency.";

        return;
    }

    // Calculate

    const rate = state.rates[currency];

    const converted = amount * rate;

    resultEl.textContent =
        `${amount.toFixed(2)} ETB = ${converted.toFixed(2)} ${currency}`;

});


// ===============================
// 8. ADD TO WATCHLIST
// ===============================

function addToWatchlist(currency) {

    // Prevent duplicates

    if (state.watchlist.includes(currency)) {

        return;
    }

    state.watchlist.push(currency);

    saveWatchlist();

    renderWatchlist();

}


// ===============================
// 9. RENDER WATCHLIST
// ===============================

function renderWatchlist() {

    watchlistEl.innerHTML = "";

    if (state.watchlist.length === 0) {

        const empty = document.createElement("li");

        empty.textContent = "Your watchlist is empty.";

        watchlistEl.appendChild(empty);

        return;
    }

    state.watchlist.forEach(currency => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${currency}</span>

            <button
                class="delete-btn"
                data-currency="${currency}">
                Delete
            </button>
        `;

        watchlistEl.appendChild(li);
    });

}


// ===============================
// 10. WATCHLIST DELEGATION
// ===============================

watchlistEl.addEventListener("click", function (event) {

    if (!event.target.classList.contains("delete-btn")) {
        return;
    }

    const currency =
        event.target.dataset.currency;

    state.watchlist =
        state.watchlist.filter(
            item => item !== currency
        );

    saveWatchlist();

    renderWatchlist();

});


// ===============================
// 11. ADD WATCH BUTTON
// ===============================

const watchButton = document.createElement("button");

watchButton.textContent =
    "Add Currency to Watchlist";

watchButton.type = "button";

currencyEl.parentElement.appendChild(watchButton);

watchButton.addEventListener("click", function () {

    const currency = currencyEl.value;

    if (currency) {
        addToWatchlist(currency);
    }

});


// ===============================
// 12. START APPLICATION
// ===============================

loadWatchlist();

renderWatchlist();

fetchRates();