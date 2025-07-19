//base = using API from github (search on google currency api)
const base = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const div = document.querySelectorAll(".div2 select ");
const button = document.querySelector("form button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of div) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}
const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}
const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amt = amount.value;
    if (amt === "" || amt < 1) {
        amt = 1;
        amount.value = "1";
    }
    //console.log(from.value, to.value);
    const URL = `${base}/${from.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    let final = amt * rate;
    msg.innerText = `${amt}${from.value}=${final}${to.value}`;

};
button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();


});
window.addEventListener("load", () => {
    updateExchangeRate();
})

