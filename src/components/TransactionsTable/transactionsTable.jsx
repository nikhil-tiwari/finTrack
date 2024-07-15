import React, { useState } from "react";
import "./transactionsTable.css";
import { Table, Input, Select, Radio } from "antd";
import { useSelector } from "react-redux";
// import searchSVG from "../../assets/search.svg";

const TransactionsTable = () => {
  const [search, setSearch] = useState("");
  const [transactionFilter, setTransactionFilter] = useState("All");
  const [timeAmountFilter, setTimeAmountFilter] = useState("time");
  const incomeTransactions = useSelector((store) => store.incomeTransaction);
  const expenseTransactions = useSelector((store) => store.expenseTransaction);
  const allTransactions = [...incomeTransactions, ...expenseTransactions];
  const options = [
    { label: "All", value: "All" },
    { label: "Income", value: "Income" },
    { label: "Expense", value: "Expense" }
  ];
  let filteredDataSource = [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  filteredDataSource = allTransactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(search.toLowerCase())
  );

  if(transactionFilter === "Income") {
    filteredDataSource = [...incomeTransactions];
  } else if(transactionFilter === "Expense") {
    filteredDataSource = [...expenseTransactions];
  }

  if (timeAmountFilter === "time") {
    filteredDataSource.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (timeAmountFilter === "amount") {
    filteredDataSource.sort((a, b) => b.amount - a.amount);
  }

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeFilter = (value) => {
    setTransactionFilter(value);
  }

  const onChangeTimeAmount = (event) => {
    setTimeAmountFilter(event.target.value);
  }

  return (
    <div className="table-input-options">
      <div className="input-options">
        <div className="input-wrapper">
          <Input
            style={{ MozBorderRadiusTopleft: "0.75rem" }}
            size="large"
            value={search}
            placeholder="Search by name"
            onChange={onChange}
          />
        </div>
        <div className="options-wrapper">
          <Select
            size="large"
            defaultValue="All"
            onChange={handleChangeFilter}
            options={options}
            value={transactionFilter}
          />
        </div>
      </div>
      <div className="table-wrapper">
        <div className="table-options">
          <h2 className="table-text">My Transactions</h2>
          <Radio.Group  size="large" onChange={onChangeTimeAmount} defaultValue="time">
            <Radio.Button value="time">Sort by Time</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
        </div>
        <Table dataSource={filteredDataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default TransactionsTable;
