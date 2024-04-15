'use client'

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import calculateMortgage, {MortgageInput, MortgageResults} from "@/utils/MortgageCalculator/mortgageCalculator";

const MortgageCalculatorForm = ({
  baseRate,
  setMortgageResults
  }:{
    baseRate: string,
    setMortgageResults: React.Dispatch<React.SetStateAction<MortgageResults | null>>  
  }) => {
  const [validated, setValidated] = useState(false);
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [term, setTerm] = useState("15");
  const [interest, setInterest] = useState("");

  useEffect(() => {
    setInterest(baseRate);
  }, [baseRate])

  //@ts-ignore
  const handleChange = (e: ChangeEvent<FormControlElement>) => {
    const {name, value} = e.target;
    const intValue =parseFloat(value);
    if(!isNaN(intValue)){
      switch (name) {
        case "price":
          setPrice(value);
          break;
        case "deposit":
          setDeposit(value);
          break;
        case "term":
          setTerm(value);
          break;
        case "interest":
          setInterest(value);
          break;
      }
    }
  }

  const submitHandle = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    const propertyPrice=parseFloat(price);
    const mortgageTermInYears=parseFloat(term);
    const annualInterestRate=parseFloat(interest);

    if(isNaN(propertyPrice) || isNaN(mortgageTermInYears) || isNaN(annualInterestRate)){
      return
    }
    const input: MortgageInput = {
      propertyPrice:parseFloat(price),
      deposit:parseFloat(deposit) | 0,
      mortgageTermInYears: parseFloat(term) | 0,
      annualInterestRate: parseFloat(interest) | 0
    }
    const result = calculateMortgage(input);
    setMortgageResults(result);
  }

  return (
    <Form noValidate validated={validated} onSubmit={submitHandle} method="POST">
      <Form.Label htmlFor="price">Property Price</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text>£</InputGroup.Text>
        <Form.Control
          id="price"
          name="price"
          type="number"
          required
          value={price}
          className="no-spinner"
          onChange={(e) => handleChange(e)}
          step="any"
        />
        <Form.Control.Feedback type="invalid">
          Enter a property price, for example £200,000.
        </Form.Control.Feedback>
      </InputGroup>
      <Form.Label htmlFor="deposit">Deposit</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text>£</InputGroup.Text>
        <Form.Control
          id="deposit"
          name="deposit"
          type="number"
          value={deposit}
          className="no-spinner"
          onChange={(e) => handleChange(e)}
          step="any"
        />
      </InputGroup>

      <Form.Label htmlFor="term">Mortgage Term</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          id="term"
          name="term"
          type="number"
          required
          value={term}
          onChange={(e) => handleChange(e)}
          step="any"
        />
        <InputGroup.Text>years</InputGroup.Text>
      </InputGroup>
      <Form.Label htmlFor="interest">Interest rate</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          id="interest"
          name="interest"
          type="number"
          required
          value={interest}
          step="any"
          className="no-spinner"
          onChange={(e) => handleChange(e)}                
        />
        <InputGroup.Text>%</InputGroup.Text>
      </InputGroup>
      <Button className="w-full" variant="primary" type="submit">
        Calculate
      </Button>
    </Form>
  )
}

export default MortgageCalculatorForm
