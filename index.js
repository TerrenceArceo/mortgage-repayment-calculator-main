const resultsHtml = document.getElementById('results-section')
const form = document.getElementById('form')
const amount = document.getElementById('amount')
const term = document.getElementById('term')
const rate = document.getElementById('rate')
const repayment = document.getElementById('repayment')
const interest = document.getElementById('interest')

form.addEventListener("submit", (e) => {
    e.preventDefault()
    calculateMonthlyPayment(amount.value, rate.value, term.value)
    getRadioValue()
})

function calculateMonthlyPayment(principal, interestRate, loanTermYears) {
    let convertedPrincipal = principal.replace(/,/g, "")

    const monthlyInterestRate = interestRate / 1200
    const numberOfPayments = loanTermYears * 12
    const monthlyPayment =
      (convertedPrincipal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
    
    console.log(monthlyPayment.toFixed(2))
    return monthlyPayment.toFixed(2)
  }

  function getRadioValue() {
    const radio = document.getElementsByName('mortgagetype')

    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            console.log(radio[i].value)
        }
    }
  }


function renderResults() {
    let html = `
        <img src="../assets/images/illustration-empty.svg" alt="picture of money, calculator, and a board, illustrating an empty result" class="empty-result-icon">
        <h2 class="result-title">Results shown here</h2>
        <p class="result-subtitle">Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
    `

    resultsHtml.innerHTML = html
}

renderResults()