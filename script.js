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

// --- Prevent Invalid Characters (e.g. +, -, e) ---
const preventInvalidChars = (e) => {
  const invalidChars = ['+', '-', 'e' , '^' ,'*']; // List of invalid characters
  if (invalidChars.includes(e.key)) {
    e.preventDefault(); // Prevent entering these characters
  }
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

// --- Calculate Tip and Total ---
const calculateTipAndTotal = () => {
  const billAmount = parseFloat(billValue.value) || 0; 
  const customTipAmount = parseFloat(customValue.value) || 0;
  const numOfPeople = parseFloat(peopleValue.value) || 1; 

  if (numOfPeople === 0 || peopleValue.value === '') {
    sumTipValue.textContent = sumTotalValue.textContent = `$0.00`;
    peopleError.classList.add('person-header-error--active'); // Show error
    peopleContent.classList.add('person-content-error');
    return; 
  }

  peopleError.classList.remove('person-header-error--active');
  peopleContent.classList.remove('person-content-error');

  let tipAmount = 0;

  if (customTipAmount > 0) {
    tipAmount = billAmount * customTipAmount / 100;
  } else {
    tipAmount = billAmount * selectedTipPercentage;
  }

  const totalTipAmount = tipAmount * numOfPeople; 
  const totalAmount = totalTipAmount; 

  sumTipValue.textContent = `$${tipAmount.toFixed(2)}`;
  sumTotalValue.textContent = `$${totalAmount.toFixed(2)}`;
};


// --- Reset Button Functionality ---
resetBtn.addEventListener('click', () => {
  // Clear all input fields
  [billValue, customValue, peopleValue].forEach(input => input.value = '');
  
  // Reset the displayed values to $0.00
  sumTipValue.textContent = sumTotalValue.textContent = `$0.00`;

  // Disable the reset button and add the disabled class
  resetBtn.classList.add('reset-button--disabled');
});

// --- Remove the focus from button when clicked on customValue ---
customValue.addEventListener('input', () => {
  buttons.forEach(item => item.classList.remove('tips-item--active')); //
});
