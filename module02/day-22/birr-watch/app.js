
// ==========================================
// ET BIRR WATCH
// REAL CURRENCY CONVERTER
// ==========================================

const API_URL =
    "https://latest.currency-api.pages.dev/v1/currencies/etb.json";

let rates = {};
let currencies = {};


// ==========================================
// HTML ELEMENTS
// ==========================================

const amountInput =
    document.getElementById("amount");

const currencySelect =
    document.getElementById("currency");

const currencySearch =
    document.getElementById("currencySearch");

const convertBtn =
    document.getElementById("convertBtn");

const convertAllBtn =
    document.getElementById("convertAllBtn");

const addWatchBtn =
    document.getElementById("addWatchBtn");

const refreshBtn =
    document.getElementById("refreshBtn");

const result =
    document.getElementById("result");

const allResults =
    document.getElementById("allResults");

const allCurrenciesSection =
    document.getElementById("allCurrenciesSection");

const errorBox =
    document.getElementById("error");

const successBox =
    document.getElementById("success");

const status =
    document.getElementById("status");

const lastUpdated =
    document.getElementById("lastUpdated");

const watchlistItems =
    document.getElementById("watchlistItems");

const watchCount =
    document.getElementById("watchCount");


// ==========================================
// CURRENCY NAMES
// ==========================================

const currencyNames = {

    usd: "US Dollar",
    eur: "Euro",
    gbp: "British Pound",
    sar: "Saudi Riyal",
    aed: "UAE Dirham",
    kes: "Kenyan Shilling",
    jpy: "Japanese Yen",
    cny: "Chinese Yuan",
    inr: "Indian Rupee",
    cad: "Canadian Dollar",
    aud: "Australian Dollar",
    zar: "South African Rand",
    ugx: "Ugandan Shilling",
    tzs: "Tanzanian Shilling",
    ngn: "Nigerian Naira",
    ghc: "Ghanaian Cedi",
    chf: "Swiss Franc",
    sek: "Swedish Krona",
    nok: "Norwegian Krone",
    dkk: "Danish Krone",
    pln: "Polish Zloty",
    brl: "Brazilian Real",
    rub: "Russian Ruble",
    try: "Turkish Lira",
    kwd: "Kuwaiti Dinar",
    qar: "Qatari Riyal",
    bwp: "Botswana Pula",
    zar: "South African Rand",
    rwf: "Rwandan Franc",
    egp: "Egyptian Pound",
    mad: "Moroccan Dirham",
    ils: "Israeli Shekel",
    sgd: "Singapore Dollar",
    hkd: "Hong Kong Dollar",
    nzd: "New Zealand Dollar",
    mxn: "Mexican Peso",
    thb: "Thai Baht",
    php: "Philippine Peso",
    idr: "Indonesian Rupiah",
    myr: "Malaysian Ringgit",
    pkr: "Pakistani Rupee",
    bdt: "Bangladeshi Taka",
    lkr: "Sri Lankan Rupee"
};


// ==========================================
// LOAD REAL EXCHANGE RATES
// ==========================================

async function loadRates() {

    try {

        showStatus(
            "Loading live exchange rates..."
        );

        refreshBtn.disabled = true;

        refreshBtn.textContent =
            "Loading...";


        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                `HTTP Error ${response.status}`
            );

        }


        const data =
            await response.json();


        // Check API response

        if (!data.etb) {

            throw new Error(
                "ETB exchange-rate data was not found."
            );

        }


        rates = data.etb;


        // Remove ETB itself

        delete rates.etb;


        populateCurrencies();


        displayWatchlist();


        const numberOfCurrencies =
            Object.keys(rates).length;


        showStatus(
            `${numberOfCurrencies} currencies loaded`
        );


        lastUpdated.textContent =
            `Last updated: ${new Date().toLocaleString()}`;


        clearError();


        console.log(
            "REAL ETB exchange rates:",
            rates
        );


    } catch (error) {

        console.error(
            "Exchange API error:",
            error
        );


        showError(
            "Unable to load exchange rates. Check your internet connection and try again."
        );


        showStatus(
            "Exchange rates unavailable"
        );

    } finally {

        refreshBtn.disabled = false;

        refreshBtn.textContent =
            "↻ Refresh";

    }
}


// ==========================================
// LOAD CURRENCIES INTO SELECT
// ==========================================

function populateCurrencies(
    search = ""
) {

    const oldValue =
        currencySelect.value;


    currencySelect.innerHTML = "";


    const searchText =
        search.toLowerCase().trim();


    const currencyList =
        Object.keys(rates)
            .filter(code => {

                const name =
                    currencyNames[code]
                    || code.toUpperCase();


                return (
                    code
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    name
                        .toLowerCase()
                        .includes(searchText)
                );

            })
            .sort();


    if (currencyList.length === 0) {

        const option =
            document.createElement("option");

        option.textContent =
            "No currency found";

        option.value = "";

        currencySelect.appendChild(
            option
        );

        return;
    }


    currencyList.forEach(code => {

        const option =
            document.createElement("option");


        option.value =
            code;


        const name =
            currencyNames[code]
            || code.toUpperCase();


        option.textContent =
            `${code.toUpperCase()} - ${name}`;


        currencySelect.appendChild(
            option
        );

    });


    if (
        oldValue &&
        currencyList.includes(oldValue)
    ) {

        currencySelect.value =
            oldValue;

    }

}


// ==========================================
// CONVERT SELECTED CURRENCY
// ==========================================

function convertCurrency() {

    clearMessages();


    const amount =
        Number(amountInput.value);


    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        showError(
            "Please enter an amount greater than 0."
        );

        return;
    }


    const currency =
        currencySelect.value;


    if (
        !currency ||
        rates[currency] === undefined
    ) {

        showError(
            "Please choose a currency."
        );

        return;
    }


    const rate =
        Number(rates[currency]);


    const converted =
        amount * rate;


    const name =
        currencyNames[currency]
        || currency.toUpperCase();


    result.innerHTML = `

        <strong>
            ${formatMoney(amount)} ETB
        </strong>

        =

        <strong>
            ${formatMoney(converted)}
            ${currency.toUpperCase()}
        </strong>

        <small>
            1 ETB =
            ${formatRate(rate)}
            ${currency.toUpperCase()}
            (${name})
        </small>

    `;


    result.classList.remove("hidden");
}


// ==========================================
// CONVERT TO ALL CURRENCIES
// ==========================================

function convertAllCurrencies() {

    clearMessages();


    const amount =
        Number(amountInput.value);


    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        showError(
            "Please enter an amount greater than 0."
        );

        return;
    }


    allResults.innerHTML = "";


    const list =
        Object.keys(rates).sort();


    list.forEach(code => {

        const rate =
            Number(rates[code]);


        const converted =
            amount * rate;


        const name =
            currencyNames[code]
            || code.toUpperCase();


        const item =
            document.createElement("div");


        item.className =
            "currency-result";


        item.innerHTML = `

            <div>

                <div class="currency-code">
                    ${code.toUpperCase()}
                </div>

                <span class="currency-name">
                    ${name}
                </span>

            </div>

            <div class="currency-value">

                ${formatMoney(converted)}

                <div class="currency-name">
                    ${code.toUpperCase()}
                </div>

            </div>

        `;


        allResults.appendChild(item);

    });


    allCurrenciesSection
        .classList
        .remove("hidden");


    allCurrenciesSection
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// WATCHLIST
// ==========================================

function getWatchlist() {

    return JSON.parse(
        localStorage.getItem(
            "etBirrWatchlist"
        )
    ) || [];

}


function saveWatchlist(list) {

    localStorage.setItem(
        "etBirrWatchlist",
        JSON.stringify(list)
    );

}


function addToWatchlist() {

    const currency =
        currencySelect.value;


    if (!currency) {

        showError(
            "Choose a currency first."
        );

        return;
    }


    const list =
        getWatchlist();


    if (list.includes(currency)) {

        showError(
            `${currency.toUpperCase()} is already in your watchlist.`
        );

        return;
    }


    list.push(currency);


    saveWatchlist(list);


    displayWatchlist();


    showSuccess(
        `${currency.toUpperCase()} added to watchlist.`
    );

}


function removeFromWatchlist(
    currency
) {

    let list =
        getWatchlist();


    list =
        list.filter(
            item => item !== currency
        );


    saveWatchlist(list);


    displayWatchlist();

}


// ==========================================
// DISPLAY WATCHLIST
// ==========================================

function displayWatchlist() {

    const list =
        getWatchlist();


    watchlistItems.innerHTML = "";


    watchCount.textContent =
        list.length;


    if (list.length === 0) {

        watchlistItems.innerHTML = `

            <div class="empty-watchlist">
                No currencies in your watchlist.
            </div>

        `;

        return;
    }


    list.forEach(currency => {

        const rate =
            rates[currency];


        const name =
            currencyNames[currency]
            || currency.toUpperCase();


        const item =
            document.createElement("div");


        item.className =
            "watch-item";


        item.innerHTML = `

            <div class="watch-info">

                <strong>
                    ${currency.toUpperCase()}
                </strong>

                <small>
                    ${name}
                </small>

                <small>
                    1 ETB =
                    ${
                        rate
                            ? formatRate(rate)
                            : "N/A"
                    }
                    ${currency.toUpperCase()}
                </small>

            </div>


            <button
                class="remove-btn"
                type="button"
            >
                Remove
            </button>

        `;


        item
            .querySelector(".remove-btn")
            .addEventListener(
                "click",
                () => {
                    removeFromWatchlist(
                        currency
                    );
                }
            );


        watchlistItems.appendChild(item);

    });

}


// ==========================================
// SEARCH
// ==========================================

currencySearch.addEventListener(
    "input",
    () => {

        populateCurrencies(
            currencySearch.value
        );

    }
);


// ==========================================
// BUTTONS
// ==========================================

convertBtn.addEventListener(
    "click",
    convertCurrency
);


convertAllBtn.addEventListener(
    "click",
    convertAllCurrencies
);


addWatchBtn.addEventListener(
    "click",
    addToWatchlist
);


refreshBtn.addEventListener(
    "click",
    loadRates
);


// ==========================================
// ENTER KEY
// ==========================================

amountInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            convertCurrency();

        }

    }
);


// ==========================================
// HELPERS
// ==========================================

function formatMoney(number) {

    return Number(number)
        .toLocaleString(
            undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}


function formatRate(number) {

    if (number >= 1) {

        return number.toFixed(4);

    }


    return number.toFixed(6);

}


function showError(message) {

    errorBox.textContent =
        message;

    errorBox.classList.remove(
        "hidden"
    );

    successBox.classList.add(
        "hidden"
    );

}


function clearError() {

    errorBox.textContent = "";

    errorBox.classList.add(
        "hidden"
    );

}


function showSuccess(message) {

    successBox.textContent =
        message;

    successBox.classList.remove(
        "hidden"
    );

    errorBox.classList.add(
        "hidden"
    );


    setTimeout(() => {

        successBox.classList.add(
            "hidden"
        );

    }, 3000);

}


function clearMessages() {

    clearError();

    successBox.classList.add(
        "hidden"
    );

}


function showStatus(message) {

    status.textContent =
        message;

}


// ==========================================
// START APPLICATION
// ==========================================

loadRates();

displayWatchlist();