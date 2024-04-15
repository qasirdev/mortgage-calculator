import { 
  expectedResultDefault,
  expectedResultDifferentTerms,
  expectedResultForCurrentRate,
  expectedResultForMoreDeposit,
  expectedResultForZero
} from "../mockData";
import mortgageCalculator from "./mortgageCalculator";

describe("calculateMonthlyPayment", () => {
  test("should calculate the correct monthly payment with interest", () => {
    const input ={
      propertyPrice:300000,
      deposit:60000,
      mortgageTermInYears: 30,
      annualInterestRate: 3.5
    }

    const result = mortgageCalculator(input);
    expect(result).toEqual(expectedResultDefault);
  });
  test("should calculate the correct monthly payment with interest 5.25", () => {
    const input ={
      propertyPrice:228000,
      deposit:57000,
      mortgageTermInYears: 15,
      annualInterestRate: 5.25
    }

    const result = mortgageCalculator(input);
    expect(result).toEqual(expectedResultForCurrentRate);
  });
  test("should calculate the correct monthly payment without interest", () => {
    const input ={
      propertyPrice:300000,
      deposit:60000,
      mortgageTermInYears: 30,
      annualInterestRate: 0
    }

    const result = mortgageCalculator(input);
    expect(result).toEqual(expectedResultForZero);
  });
  test("should calculate the correct monthly payment with a different term", () => {
    const input ={
      propertyPrice:300000,
      deposit:60000,
      mortgageTermInYears: 15,
      annualInterestRate: 3.5
    }

    const result = mortgageCalculator(input);
    expect(result).toEqual(expectedResultDifferentTerms);
  });
  test("should calculate the correct monthly payment deposit is more than property price", () => {
    const input ={
      propertyPrice:10000,
      deposit:60000,
      mortgageTermInYears: 15,
      annualInterestRate: 3.5
    }

    const result = mortgageCalculator(input);
    expect(result).toEqual(expectedResultForMoreDeposit);
  });
});
