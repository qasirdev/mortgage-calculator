
export interface MortgageInput {
  propertyPrice: number;
  deposit: number;
  mortgageTermInYears: number;
  annualInterestRate: number;
}

export interface MortgageResults {
  monthlyPayment: string;
  totalRepayment: string;
  capital: string;
  interest: string;
  affordabilityCheck: string;
  yearlyBreakdown: Array<{ year: number; remainingBalance: string }>;
}

const calculateMortgage = ({
  propertyPrice,
  deposit,
  mortgageTermInYears,
  annualInterestRate
}: MortgageInput): MortgageResults  => {
  let isPaymentdone = propertyPrice <= deposit ? true : false;

  if(isPaymentdone){
    const yearlyBreakdown:any = [];
    for (let year = 0; year <= mortgageTermInYears; year++) {
        yearlyBreakdown.push({ year, remainingBalance:0 });
    }
    return {
      monthlyPayment: '0',
      totalRepayment: '0',
      capital: '0',
      interest: '0',
      affordabilityCheck: '0',
      yearlyBreakdown,
      }
  }
  // Capital
  const adjustedLoanAmount = propertyPrice - deposit;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = mortgageTermInYears * 12;

      let monthlyPayment =0;
      if (monthlyInterestRate === 0) {
        monthlyPayment = adjustedLoanAmount / numberOfPayments;
      } else {
        monthlyPayment =
        (adjustedLoanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      }
  
  // Total Repayment
  const totalRepayment = monthlyPayment * numberOfPayments;

  // Interest
  const interest = totalRepayment - adjustedLoanAmount;

  // Affordability Check
  const affordabilityInterestRate = annualInterestRate + 3; // add 3%
  const affordabilityMonthlyInterestRate = affordabilityInterestRate / 100 / 12;
  const affordabilityMonthlyPayment =
  (adjustedLoanAmount *
    affordabilityMonthlyInterestRate *
    Math.pow(1 + affordabilityMonthlyInterestRate, numberOfPayments)) /
  (Math.pow(1 + affordabilityMonthlyInterestRate, numberOfPayments) - 1);

    // Yearly Breakdown
    let remainingBalance = propertyPrice - deposit;
    const yearlyBreakdown:any = [];
    for (let year = 0; year <= mortgageTermInYears; year++) {
      if(year === 0) {
        yearlyBreakdown.push({ year, remainingBalance });
        continue;
      }
      const yearlyInterest = remainingBalance * (annualInterestRate / 100);
      let yearlyPrincipal = monthlyPayment * 12 - yearlyInterest;
      if (year === mortgageTermInYears) {
        yearlyPrincipal = remainingBalance; // Pay off remaining amount
      }
      remainingBalance -= yearlyPrincipal;
      yearlyBreakdown.push({ year, remainingBalance });
    }
  
  const result:  MortgageResults = {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalRepayment: totalRepayment.toFixed(2),
    capital: adjustedLoanAmount.toFixed(2),
    interest: interest.toFixed(2),
    affordabilityCheck: affordabilityMonthlyPayment.toFixed(2),
    yearlyBreakdown,
  };
  return result;
}

export default calculateMortgage;
