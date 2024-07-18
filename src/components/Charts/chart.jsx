import { useState } from "react";
import { useSelector } from "react-redux";
import transactionsvg from "../../assets/transactions.svg";
import "./chart.css";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

const Chart = () => {
  const [filteredData, setFilteredData] = useState([]);
  const incomeTransactions = useSelector((store) => store.incomeTransaction);
  const expenseTransactions = useSelector((store) => store.expenseTransaction);
  const allTransactions = [...incomeTransactions, ...expenseTransactions];

  return (
    <div>
      {allTransactions.length === 0 ? (
        <>
          <div className="svg-wrapper">
            <img
              className="transaction-svg"
              src={transactionsvg}
              alt="no-transactions"
            />
          </div>
          <p className="transaction-text">You have no Transactions Currently</p>
        </>
      ) : (
        <div className="chart-wrapper">
          <LineChart filteredData={filteredData} setFilteredData={setFilteredData} />
          <PieChart filteredData={filteredData} setFilteredData={setFilteredData} />
        </div>
      )}
    </div>
  );
};

export default Chart;
