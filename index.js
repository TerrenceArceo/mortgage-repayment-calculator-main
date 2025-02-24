const resultsHtml = document.getElementById('results-section')
const form = document.getElementById('form')
const amount = document.getElementById('amount')
const term = document.getElementById('term')
const rate = document.getElementById('rate')
const repayment = document.getElementById('repayment')
const interest = document.getElementById('interest')
let monthlyPayment = 0
let totalPaymentOvertime = 0
let totalInterestValue = 0
let html = ''
let radioValue = ''

form.addEventListener("submit", (e) => {
    e.preventDefault()
    calculateMonthlyPayment(amount.value, rate.value, term.value)
    repaymentOverTime(term.value)
    calculateTotalInterest(amount.value)
    getRadioValue()
    renderResults()
})

function calculateMonthlyPayment(principal, interestRate, loanTermYears) {
    let convertedPrincipal = principal.replace(/,/g, "")

    const monthlyInterestRate = interestRate / 1200
    const numberOfPayments = loanTermYears * 12
    const payment =
      (convertedPrincipal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
    
    monthlyPayment = payment.toLocaleString()
}

function calculateTotalInterest(principal) {
  let convertedPrincipal = principal.replace(/,/g, "")
  totalInterestValue = totalPaymentOvertime - convertedPrincipal
}

function repaymentOverTime(loanTermYears) {
  let paymentOverTime = (monthlyPayment * 12) * loanTermYears
  totalPaymentOvertime = paymentOverTime
}

function getRadioValue() {
  const radio = document.getElementsByName('mortgagetype')

  for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        radioValue = radio[i].value
      }
  }
}


function renderResults() {
    if (form.checkValidity()) {
      if (radioValue === 'repayment') {
        html = `
          <div class="result-info-section">
            <h2 class="result-title">Your results</h2>
            <p class="result-subtitle">Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
            <div class="result-numbers-container">
              <div class="main-result-section">
                <p>Your monthly repayments</p>
                <h3 class="main-result">£${monthlyPayment}</h3>
              </div>
              <div class="total-payment-section">
                <p>Total you'll repay over the term</p>
                <h4 class="total-payment">£${totalPaymentOvertime.toLocaleString()}</h4>
              </div>
            </div>
          </div>
        `
      } else {
        html = `
          <div class="result-info-section">
            <h2 class="result-title">Your results</h2>
            <p class="result-subtitle">Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
            <div class="result-numbers-container">
              <div class="main-result-section">
                <p>Your total interest payment</p>
                <h3 class="main-result">£${totalInterestValue.toLocaleString()}</h3>
              </div>
              <div class="total-payment-section">
                <p>Total you'll repay over the term</p>
                <h4 class="total-payment">£${totalPaymentOvertime.toLocaleString()}</h4>
              </div>
            </div>
          </div>
        `
      }
    } else {
      html = `
        <div class="empty-result-section">
            <img src="../assets/images/illustration-empty.svg" alt="picture of money, calculator, and a board, illustrating an empty result" class="empty-result-icon">
            <h2 class="result-title">Results shown here</h2>
            <p class="result-subtitle">Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
        </div>
      `
    }

    resultsHtml.innerHTML = html
}

renderResults()