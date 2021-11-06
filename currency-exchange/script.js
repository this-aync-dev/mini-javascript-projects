const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

// Populate dropdowns
fetch("input/rates.json")
  .then(res => res.json())
  .then(rates => {
    const currencies = Object.keys(rates);
    currencies.forEach(currency => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = currency;
      option1.textContent = option2.textContent = currency;

      // Set default selected
      if (currency === "USD") option1.selected = true;
      if (currency === "EUR") option2.selected = true;

      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });
  });

document.getElementById("convertBtn").addEventListener("click", () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (from === to) {
    result.textContent = "Please select two different currencies.";
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  fetch("input/rates.json")
    .then(res => res.json())
    .then(rates => {
      const rate = rates[from][to];
      const final = amount * rate;
      result.textContent = `${amount} ${from} = ${final.toFixed(2)} ${to}`;
    })
    .catch(err => {
      result.textContent = "Error fetching exchange rates.";
      console.error(err);
    });
});
