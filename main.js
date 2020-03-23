const currencyElement_one = document.getElementById('currency-one');
const currencyElement_two = document.getElementById('currency-two');
const amountElement_one = document.getElementById('amount-one');
const amountElement_two = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');


//Fetch exchange rates and update DOM
function calculate() {
    const currency_one = currencyElement_one.value;
    const currency_two = currencyElement_two.value;

    fetch(`https://prime.exchangerate-api.com/v5/5d91b67508d9240a7fb91777/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        const rate = data.conversion_rates[currency_two];
        // console.log(rate)
       
        rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`


        amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
    })
}

//Event listeners
currencyElement_one.addEventListener('change' , calculate);
amountElement_one.addEventListener('input' , calculate);
currencyElement_two.addEventListener('change', calculate);
amountElement_two.addEventListener('input' , calculate);

//Change currency
swap.addEventListener('click', () => {
    const temp = currencyElement_one.value;
    currencyElement_one.value = currencyElement_two.value;
    currencyElement_two.value = temp;
    calculate();
});

calculate();