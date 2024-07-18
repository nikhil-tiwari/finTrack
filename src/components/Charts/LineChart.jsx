import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryScatter,
  VictoryVoronoiContainer,
} from "victory";
import { Select } from "antd";
import "./chart.css";

const LineChart = ({ filteredData, setFilteredData }) => {
  const [transactionFilter, setTransactionFilter] = useState("Income");
  const [selectedMonth, setSelectedMonth] = useState("January");
//   const [filteredData, setFilteredData] = useState([]);
  const incomeTransactions = useSelector((store) => store.incomeTransaction);
  const expenseTransactions = useSelector((store) => store.expenseTransaction);

  const options = [
    { label: "Income", value: "Income" },
    { label: "Expense", value: "Expense" },
  ];

  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const { Option } = Select;

  useEffect(() => {
    const getFilteredData = () => {
      const transactions =
        transactionFilter === "Income"
          ? incomeTransactions
          : expenseTransactions;
      //console.log("Transactions", transactions);
      const filteredTransactions = filterTransactionsByMonth(
        transactions,
        selectedMonth
      );
      //console.log("Filtered Transactions", filteredTransactions);
      return filteredTransactions.map((transaction, index) => ({
        x: transaction.date,
        y: transaction.amount,
        tag: transaction.tag,
        label: `Name: ${transaction.name}\nAmount: ${transaction.amount}\nDate: ${transaction.date}`,
      }));
    };

    const filterTransactionsByMonth = (transactions, month) => {
      const monthIndex = months.indexOf(month); // Get the index of the month
      //console.log("Month Index", monthIndex);
      return transactions.filter((transaction) => {
        const transactionMonth = new Date(transaction.date).getMonth();
        //console.log("Transactions Month", transactionMonth);
        return transactionMonth === monthIndex;
      });
    };

    setFilteredData(getFilteredData());
  }, [
    transactionFilter,
    selectedMonth,
    incomeTransactions,
    expenseTransactions,
    months,
    setFilteredData
  ]);

  const handleChangeFilter = (value) => {
    setTransactionFilter(value);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  return (
    <div className="line-wrapper">
      <div className="line-filter-wrapper">
        <Select
          size="large"
          defaultValue="Income"
          onChange={handleChangeFilter}
          options={options}
          value={transactionFilter}
        />
        <Select
          size="large"
          defaultValue="January"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month) => (
            <Option key={month} value={month}>
              {month}
            </Option>
          ))}
        </Select>
      </div>
      <VictoryChart
        theme={VictoryTheme.material}
        height={350}
        width={600}
        domainPadding={{ y: 25 }}
        containerComponent={<VictoryVoronoiContainer />}
      >
        {filteredData.length === 1 ? (
          <VictoryScatter
            data={filteredData}
            // interpolation="natural"
            style={{
              data: { stroke: "#var(--theme)", strokeWidth: 1.5 }, // Adjust stroke width here
              labels: { fontSize: 10, fill: "#333" }, // Adjust label styles
            }}
            labelComponent={<VictoryTooltip />} // Enable tooltips
          />
        ) : (
          <VictoryLine
            data={filteredData}
            // interpolation="natural"
            style={{
              data: { stroke: "var(--theme)", strokeWidth: 1.5 }, // Adjust stroke width here
              labels: { fontSize: 10, fill: "var(--theme)", lineHeight: 1.2 }, // Adjust label styles
            }}
            labelComponent={<VictoryTooltip />}
          />
        )}
        <VictoryAxis
          style={{
            tickLabels: { fontSize: 8, padding: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 8, padding: 5 },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default LineChart;
