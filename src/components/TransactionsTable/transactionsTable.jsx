import React, { useState } from "react";
import "./transactionsTable.css";
import { Table, Input, Select, Radio } from "antd";
import { useSelector } from "react-redux";

const TransactionsTable = () => {
  const [search, setSearch] = useState("");
  const [transactionFilter, setTransactionFilter] = useState("All");
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

  if(transactionFilter === "Income" || transactionFilter === "Expense") {
    filteredDataSource = filteredDataSource.filter((transaction) =>
      transaction.type.toLowerCase() === transactionFilter.toLowerCase()
    );
  }

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeFilter = (value) => {
    setTransactionFilter(value);
  }

  const onChangeTimeAmount = () => {

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
          <Radio.Group onChange={onChangeTimeAmount} defaultValue="time">
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
