//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //hide results
  document.getElementById('results').style.display = 'none';
  //show loader gif
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//calc resuesults fx
function calculateResults() {
  console.log('calcualting');
  //UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

//parseFLoat turns # inot decimal
const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calculatedPayments = parseFloat(years.value) * 12;

//compute monthly payments
const x = Math.pow(1 +calculatedInterest, calculatedPayments);
const monthly = (principal*x*calculatedInterest)/(x-1);

if(isFinite(monthly)){
  //toFixed sets number of decimals you want back
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * calculatedPayments).toFixed(2);
  totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

  //show results
  document.getElementById('results').style.display = 'block';

  //hide loader gif
  document.getElementById('loading').style.display = 'none';
} else {
  showError('Please check your numbers');
}
  
}

//show error
function showError(error) {
  //show results
  document.getElementById('results').style.display = 'none';

  //hide loader gif
  document.getElementById('loading').style.display = 'none';
//create div
  const errorDiv = document.createElement('div');

//get elements card and heading
const card = document.querySelector('.card');
const heading = document.querySelector(".heading");

//add bootstrap class
errorDiv.className = 'alert alert-danger';

//Create text node and append to div
errorDiv.appendChild(document.createTextNode(error));

//insert error above heading using insertBefore method (call on paretn and pass in the element you want to put in and then put where you want to insert before (we want to insert before the heading))
card.insertBefore(errorDiv, heading);

//clear error after 3 secs
setTimeout(clearError, 3000);
}

function clearError(){
  document.querySelector('.alert').remove();
 }