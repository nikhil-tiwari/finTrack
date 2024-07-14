import React, { useState } from "react";
import "./transactionsTable.css";
import { Table, Input, Radio } from "antd";
import { useSelector } from "react-redux";
// import Input from '../Input/input';

const TransactionsTable = () => {
  const [search, setSearch] = useState("");
  const incomeTransactions = useSelector((store) => store.incomeTransaction);
  const expenseTransactions = useSelector((store) => store.expenseTransaction);
  const allTransactions = [...incomeTransactions, ...expenseTransactions];

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

  const filteredDataSource = allTransactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(search.toLowerCase())
  );

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="table-wrapper">
      <div className="input-options">
        <div className="input-wrapper">
          <Input
            style={{ MozBorderRadiusTopleft: "0.75rem" }}
            value={search}
            placeholder=""
            onChange={onChange}
          />
        </div>
        <div className="options-wrapper">
          <Radio.Group defaultValue="date" buttonStyle="solid">
            <Radio.Button value="date">Sort By Date</Radio.Button>
            <Radio.Button value="amount">Sort By Amount</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <Table dataSource={filteredDataSource} columns={columns} />;
    </div>
  );
};

export default TransactionsTable;
