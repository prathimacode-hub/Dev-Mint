function calculateTip() {
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercent = parseFloat(document.getElementById('tipPercent').value);
    const people = parseInt(document.getElementById('people').value);
  //input
    if (isNaN(billAmount) || isNaN(tipPercent) || isNaN(people) || people <= 0) {
      alert('Please enter valid inputs.');
      return;
    }
  
    const totalTip = (billAmount * tipPercent) / 100;
    const totalAmount = billAmount + totalTip;
    const tipPerPerson = totalTip / people;
    const totalPerPerson = totalAmount / people;
  
    document.getElementById('tipAmount').textContent = `$${tipPerPerson.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${totalPerPerson.toFixed(2)}`;
    document.getElementById('totalBill').textContent = `$${totalAmount.toFixed(2)}`;
  }
  
  function resetCalculator() {
    document.getElementById('billAmount').value = '';
    document.getElementById('tipPercent').value = '';
    document.getElementById('people').value = '';
    document.getElementById('tipAmount').textContent = '$0.00';
    document.getElementById('totalAmount').textContent = '$0.00';
    document.getElementById('totalBill').textContent = '$0.00';
  }