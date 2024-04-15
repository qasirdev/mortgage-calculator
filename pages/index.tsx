import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {  useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { MortgageResults} from "@/utils/MortgageCalculator/mortgageCalculator";
import MortgageCalculatorForm from "@/components/MortgageCalculatorForm";
import MortgageResultsComponent from "@/components/MortgageResults";
import MortgageYearlyBreakdown from "@/components/MortgageYearlyBreakdown";
import { useGetInterestRatesQuery } from "@/store/api/interestRateApiSlice";
import { formatDate, getPreviousMonthDate } from "@/utils/formatDate";
import getLastReading from "@/utils/getLastReading";

export default function MortgageCalculator() {
  const [mortgageResults, setMortgageResults] = useState<MortgageResults | null>(null)

// Usage
const currentDate = new Date();
const formattedDateto = formatDate(currentDate);

const previousMonthDate = getPreviousMonthDate(currentDate); 
const formattedDatefrom = formatDate(previousMonthDate);

  const params:any = {
    'csv.x': 'yes', 
    Datefrom: formattedDatefrom,
    Dateto: formattedDateto,
    SeriesCodes: 'IUMABEDR'
  };
  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  
  const { data, isLoading, error, isError } = useGetInterestRatesQuery(queryString);

  if(isError){
    return <Container>
      <h2>Some thing went wrong</h2>
    </Container>
  }
  if(isLoading){
    return <Container>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  }

  return (
    <Container>
      <title>Mortgage Calculator Test</title>
      <Row className="gap-x-10 pt-3">
        <Col className="border-r" md="auto">
          <MortgageCalculatorForm setMortgageResults={setMortgageResults} baseRate={getLastReading(data)}/>
        </Col>
        <Col md="auto">
          {mortgageResults && (
            <>
              <h2 className="pb-3">Results</h2>
              <MortgageResultsComponent mortgageResults={mortgageResults}/>
            </>
          )}
        </Col>
        <Col md="auto">
          {mortgageResults && (
            <>
              <h2 className="pb-3">Yearly Breakdown</h2>
              <MortgageYearlyBreakdown yearlyBreakdown={mortgageResults.yearlyBreakdown} />
            </>
          )}
        </Col>          
      </Row>
    </Container>
  );
}
