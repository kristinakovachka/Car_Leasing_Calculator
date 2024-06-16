document.addEventListener('DOMContentLoaded', function () {
    const carTypeSelect = document.getElementById('car-type');
    const carValueInput = document.getElementById('car-value');
    const carValueRange = document.getElementById('car-value-range');
    const leasePeriodSelect = document.getElementById('lease-period');
    const downPaymentInput = document.getElementById('down-payment');
    const downPaymentRange = document.getElementById('down-payment-range');

    const totalLeasingCost = document.getElementById('total-leasing-cost');
    const downPaymentAmount = document.getElementById('down-payment-amount');
    const downPaymentPercent = document.getElementById('down-payment-percent');
    const monthlyInstallment = document.getElementById('monthly-installment');
    const interestRate = document.getElementById('interest-rate');

    function updateValues() {
        const carValue = parseFloat(carValueInput.value);
        const leasePeriod = parseInt(leasePeriodSelect.value);
        const downPaymentPercentValue = parseFloat(downPaymentInput.value);
        const downPayment = carValue * (downPaymentPercentValue / 100);
        const interest = carTypeSelect.value === 'new' ? 0.0299 : 0.037;

        const principal = carValue - downPayment;
        const monthlyInterestRate = interest / 12;
        const monthlyInstallmentValue = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, leasePeriod)) / (Math.pow(1 + monthlyInterestRate, leasePeriod) - 1);
        const totalLeasingCostValue = (monthlyInstallmentValue * leasePeriod) + downPayment;

        totalLeasingCost.textContent = `€${totalLeasingCostValue.toFixed(2)}`;
        downPaymentAmount.textContent = `€${downPayment.toFixed(2)}`;
        downPaymentPercent.textContent = `${downPaymentPercentValue}%`;
        monthlyInstallment.textContent = `€${monthlyInstallmentValue.toFixed(2)}`;
        interestRate.textContent = `${(interest * 100).toFixed(2)}%`;
    }

    carValueInput.addEventListener('input', () => {
        carValueRange.value = carValueInput.value;
        updateValues();
    });

    carValueRange.addEventListener('input', () => {
        carValueInput.value = carValueRange.value;
        updateValues();
    });

    leasePeriodSelect.addEventListener('change', updateValues);

    downPaymentInput.addEventListener('input', () => {
        downPaymentRange.value = downPaymentInput.value;
        updateValues();
    });

    downPaymentRange.addEventListener('input', () => {
        downPaymentInput.value = downPaymentRange.value;
        updateValues();
    });

    carTypeSelect.addEventListener('change', updateValues);

    updateValues(); // Initial calculation
});
