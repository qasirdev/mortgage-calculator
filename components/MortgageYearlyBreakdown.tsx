import { formatCurrency } from '@/utils/formatCurrency';
import React from 'react'
import Table from "react-bootstrap/Table";
type props = {
  yearlyBreakdown: {
    year: number;
    remainingBalance: string;
  }[]
}
const MortgageYearlyBreakdown = ({yearlyBreakdown}:props) => {
  return (
    <>
    {yearlyBreakdown && (
      <Table className="max-w-52" bordered hover size="sm">
        <thead>
          <tr>
            <th>Year</th>
            <th>Remaining Debt</th>
          </tr>
        </thead>
        <tbody>
          {yearlyBreakdown && yearlyBreakdown.map((breakdown) => {
            return (
              <tr key={breakdown.year}>
                <td>{breakdown.year}</td>
                <td>{formatCurrency(parseFloat(breakdown.remainingBalance),0)}</td>
              </tr>
              )
            })
          }
        </tbody>
      </Table>
    )

    }
    </>
  )
}

export default MortgageYearlyBreakdown
