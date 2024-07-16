import React, { useState } from "react";
import "./transactionsTable.css";
import { Table, Input, Select, Radio, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { addIncome } from "../../store/slices/income";
import { addExpense } from "../../store/slices/expense";
// import searchSVG from "../../assets/search.svg";

const TransactionsTable = () => {
  const [search, setSearch] = useState("");
  const [transactionFilter, setTransactionFilter] = useState("All");
  const [timeAmountFilter, setTimeAmountFilter] = useState("time");
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
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

  const handleCSVExport = () => {
    const csvData = filteredDataSource.map(transaction => ({
      Name: transaction.name,
      Amount: transaction.amount,
      Date: transaction.date,
      Tag: transaction.tag,
      Type: transaction.type
    }));
  
    const csv = unparse({
      fields: ["Name", "Amount", "Date", "Tag", "Type"],
      data: csvData,
    });
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const handleCSVImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    parse(file, {
      header: true,
      complete: async (results) => {
        const promises = results.data.map(transaction => {
          const date = transaction.Date;
          const name = transaction.Name;
          const amount = transaction.Amount;
          const tag = transaction.Tag;
          let type = transaction.Type;
          if (!date || !name || !amount || !tag || !type) {
            console.warn(`Invalid data for transaction`);
            return null; // Skip invalid transactions
          }
          const reversedDateString = date.split('-').reverse().join('-');
          type = type.toLowerCase();
          let transactionObj = {
            name,
            amount,
            date: reversedDateString,
            tag,
            type
          };
          if(type === "income") {
            dispatch(addIncome(transactionObj));
          } else if(type === "expense") {
            dispatch(addExpense(transactionObj));
          }
          return addTransactionToFirebase(transactionObj);
        });

        try {
          await Promise.all(promises.filter(Boolean));
          toast.success("CSV imported successfully");
        } catch (error) {
          console.error(error);
          toast.error("Error importing CSV");
        }
      },
      error: function (error) {
        console.error(error);
        toast.error("Error importing CSV");
      }
    });
  };

  const addTransactionToFirebase = async (transactionObj) => {
    if(!user) {
      toast.error("User does not exist");
      return;
    }
    try {
      await addDoc(collection(db, `users/${user.uid}/transactions`), transactionObj);
      // toast.success("Transaction added successfully");
    } catch(error) {
      console.log(error);
      toast.error("Couldn't add transaction:", error.message);
    }
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
          <div className="button-wrapper">
            <Button size="large" onClick={handleCSVExport}>Export to CSV</Button>
            <Button size="large" onClick={() => document.getElementById('csv-input').click()}>Import from CSV</Button>
            <input
              type="file"
              id="csv-input"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={handleCSVImport}
            />
          </div>
        </div>
        <Table dataSource={filteredDataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default TransactionsTable;
