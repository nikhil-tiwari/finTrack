import { Card, Row, Button } from "antd";
import React, { useEffect, useState } from "react";
import MainModal from "../Modal/modal";
import "./card.css";
import { useSelector } from "react-redux";

const Cards = () => {

  const incomeTransactions = useSelector((store) => store.incomeTransaction);
  const expenseTransactions = useSelector((store) => store.expenseTransaction);
  const [balance, setBalance] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");

  useEffect(() => {
    const incomeAmount = incomeTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    const expenseAmount = expenseTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
    const totalAmount = incomeAmount - expenseAmount;
    console.log("Income Transactions:", incomeTransactions);
    console.log("Expense Transactions:", expenseTransactions);
    setIncome(incomeAmount);
    setExpense(expenseAmount);
    setBalance(totalAmount);
  }, [incomeTransactions, expenseTransactions])

  const handleReset = () => {
    setBalance("0");
  }

  return (
    <div>
      <Row>
        <Card title="Current Balance" hoverable bordered={true}>
          <p className="amount-container">{`Rs. ${balance}`}</p>
          <Button type="primary" onClick={handleReset}>Reset Balance</Button>
        </Card>
        <Card title="Total Income" hoverable bordered={true}>
          <p className="amount-container">{`Rs. ${income}`}</p>
          <MainModal text={"Add Income"} dispatchFnc={"addIncome"} modalName={"Income Modal"}/>
        </Card>
        <Card title="Total Expenses" hoverable bordered={true}>
          <p className="amount-container">{`Rs. ${expense}`}</p>
          <MainModal text={"Add Expense"} dispatchFnc={"addExpense"} modalName={"Expense Modal"}/>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
