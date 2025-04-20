const currencyURL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropbox = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#convertBtn");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");



for(let select of dropbox){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

let updateFlag = (element) => {
    let Code = element.value;
    let countryCode = countryList[Code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`

    let parent = element.parentElement;
    let img = parent.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#amount");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value ="1";
    }
    
    let newURL = `${currencyURL}/${toCurr.value}_${fromCurr.value}.json`;
    let response = await fetch(newURL);
    let data = await response.json();
    
    let rate = data.rate;
    let finalAmount = amtVal * rate;
    const convAmt = document.querySelector("#convertedAmount");
    convAmt.value = finalAmount;

});