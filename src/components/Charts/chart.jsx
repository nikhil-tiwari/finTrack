import React from 'react'
import { useSelector } from 'react-redux';
import transactionsvg from "../../assets/transactions.svg";
import { VictoryChart, VictoryLine } from 'victory';
import "./chart.css";

const LineChart = () => {

  const incomeTransactions = useSelector((store) => store.incomeTransaction);
  const expenseTransactions = useSelector((store) => store.expenseTransaction);
  const allTransactions = [...incomeTransactions, ...expenseTransactions];

  return (
    <div>
      {allTransactions.length === 0 ? 
        ( 
          <>
            <div className='svg-wrapper'>
              <img className='transaction-svg' src={transactionsvg} alt='no-transactions'/> 
            </div>
            <p className='transaction-text' >No Transactions added</p>
          </>
        ) 
        : 
        ( 
          <VictoryChart>
            <VictoryLine
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 6 }
              ]}
            />
          </VictoryChart> 
        )
      }
    </div>
  )
}

export default LineChart;