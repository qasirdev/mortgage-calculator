import React from 'react'
import Table from "react-bootstrap/Table";
import { formatCurrency } from '@/utils/formatCurrency';
import { MortgageResults } from '@/utils/MortgageCalculator/mortgageCalculator';

type props ={
  mortgageResults: MortgageResults | null
}
const MortgageResultsComponent = ({mortgageResults} : props) => {
  return (
    <>
      {mortgageResults?.monthlyPayment && (
        <Table striped="columns">
          <tbody>
            <tr className="border-b border-t">
              <td>Monthly Payment</td>
              <td className="text-right">{formatCurrency(parseFloat(mortgageResults.monthlyPayment))}</td>
            </tr>
            <tr className="border-b">
              <td>Total Repayment</td>
              <td className="text-right">{formatCurrency(parseFloat(mortgageResults.totalRepayment))}</td>
            </tr>
            <tr className="border-b">
              <td>Capital</td>
              <td className="text-right">{formatCurrency(parseFloat(mortgageResults.capital))}</td>
            </tr>
            <tr className="border-b">
              <td>Interest</td>
              <td className="text-right">{formatCurrency(parseFloat(mortgageResults.interest))}</td>
            </tr>
            <tr className="border-b">
              <td>Affordability check</td>
              <td className="text-right">{formatCurrency(parseFloat(mortgageResults.affordabilityCheck))}</td>
            </tr>
          </tbody>
        </Table>
      )}    
    </>

  )
}

export default MortgageResultsComponent
