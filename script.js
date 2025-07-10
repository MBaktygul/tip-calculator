// --- HTML Elements ---
const billValue = document.getElementById('billValue');
const peopleContent = document.getElementById('peopleContent');
const peopleValue = document.getElementById('peopleValue'); 
const peopleError = document.querySelector('.person-header-error'); 
const resetBtn = document.querySelector('.reset-button'); 
const buttons = document.querySelectorAll('.tips-item'); 
const customValue = document.getElementById('customValue'); 
const sumTipValue = document.getElementById('sumTipValue'); 
const sumTotalValue = document.getElementById('sumTotalValue'); 

// --- Helper Functions ---
const isPositive = n => n > 0; // Checks if number is positive

const toggleResetButton = () => {
  resetBtn.classList.toggle('reset-button--disabled', !(isPositive(Number(billValue.value)) || isPositive(Number(customValue.value)) || isPositive(Number(peopleValue.value)) || billValue.value === '0' || customValue.value === '0' || peopleValue.value === '0'));
};

// --- Event Listeners ---
[ billValue, customValue, peopleValue ].forEach(input => {
  input.addEventListener('input', () => {
    toggleResetButton();
    calculateTipAndTotal();
  });
});

// --- Tip Calculation ---
let selectedTipPercentage = 0;

buttons.forEach(btn => btn.addEventListener('click', () => {
  buttons.forEach(item => item.classList.remove('tips-item--active')); // Remove focus from buttons
  btn.classList.add('tips-item--active'); // Add a focus to clicked button
  selectedTipPercentage = parseFloat(btn.textContent) / 100; // Save the percentage from a button of a chosen tip
  customValue.value = ''; // Clear customValue
  calculateTipAndTotal(); // Calculate tip and total amount of tips
}));

// --- Function to calculate tip and total amount of tips ---
const calculateTipAndTotal = () => {
  const billAmount = parseFloat(billValue.value) || 0; // Sum of bill
  const customTipAmount = parseFloat(customValue.value) || 0; // Sum of custom typed tips 
  const numOfPeople = parseFloat(peopleValue.value) || 1; // Number of people

  // If 0 or ' ' in peopleValue, give error and delete all sum data
  if (numOfPeople === 0 || peopleValue.value === '') {
    sumTipValue.textContent = sumTotalValue.textContent = `$0.00`;
    peopleError.classList.add('person-header-error--active'); // Show error
    peopleContent.classList.add('person-content-error');
    return; // Stop the calculation
  }

  // If more than > 0 then delete error
  peopleError.classList.remove('person-header-error--active');
  peopleContent.classList.remove('person-content-error');

  // Calculate tip for one person
  let tipAmount = 0;

  if (customTipAmount > 0) {
    // If customValue is not empty, use typed number as a percent to calculate tip
    tipAmount = billAmount * customTipAmount / 100; 
  } else {
    // if customValue is empty, use percent from clicked button
    tipAmount = billAmount * selectedTipPercentage;
  }

  const totalTipAmount = tipAmount * numOfPeople; // Total sum of tips for typed amount of people
  const totalAmount = totalTipAmount; 

  // Update tips value
  sumTipValue.textContent = `$${tipAmount.toFixed(2)}`;
  sumTotalValue.textContent = `$${totalAmount.toFixed(2)}`;
};

// --- Reset Button ---
resetBtn.addEventListener('click', () => {
  [billValue, customValue, peopleValue].forEach(input => input.value = ''); // Clear all inputs
  sumTipValue.textContent = sumTotalValue.textContent = `$0.00`; // Clear sums
  resetBtn.classList.add('reset-button--disabled'); // Deactivate the resetBtn after clearing everything
});

// --- Remove the focus from button when clicked on customValue ---
customValue.addEventListener('input', () => {
  buttons.forEach(item => item.classList.remove('tips-item--active')); //
});
