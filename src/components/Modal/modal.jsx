import React, { useState } from "react";
import { Button, Modal, DatePicker, Select } from "antd";
import "./modal.css";
import Input from "../Input/input";
import { useDispatch } from "react-redux";
import { addIncome } from "../../store/slices/income";
import { addExpense } from "../../store/slices/expense";
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const MainModal = ({ text, dispatchFnc, modalName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(null);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [tagOptionsIncome] = useState([
    { value: "Salary", label: "Salary", },
    { value: "Investment", label: "Investment", },
    { value: "Freelance", label: "Freelance", },
  ]);
  const [tagOptionsExpense] = useState([
    { value: "Rent", label: "Rent", },
    { value: "Food", label: "Food", },
    { value: "Travel", label: "Travel", },
    { value: "Other", label: "Other", },
  ]);
  

  const showModal = () => {
    setIsModalOpen(true);
    setAmount("");
    setDate(null);
    setName("");
    setTag("");
  };

  const handleOk = () => {

    // console.log("Amount:", amount);
    // console.log("Date:", date);
    // console.log("Name:", name);
    // console.log("Tag:", tag);

    if (amount !== "" && date !== null && name !== "" && tag!== "") {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      const transactionObj = {
        name: name, 
        amount: amount, 
        date: formattedDate, 
        tag: tag
      }
      if (dispatchFnc === "addIncome") {
        dispatch(addIncome(transactionObj));
        addTransactionToFirebase(transactionObj, "income");
      } else {
        dispatch(addExpense(transactionObj));
        addTransactionToFirebase(transactionObj, "expense");
      }
      setIsModalOpen(false);
      setAmount("");
      setDate(null);
      setName("");
      setTag("");
    } else {
      toast.error("All fields are required");
    }
  };

  const addTransactionToFirebase = async (transactionObj, type) => {
    if(!user) {
      toast.error("User does not exist");
      return;
    }
    transactionObj = {...transactionObj, type: type};
    try {
      await addDoc(collection(db, `users/${user.uid}/transactions`), transactionObj);
      toast.success("Transaction added successfully");
    } catch(error) {
      console.log(error);
      toast.error("Couldn't add transaction:", error.message);
    }
    // console.log(transactionObj);
    // console.log(`Add ${transactionObj.name} as an ${type} of Rs.${transactionObj.amount}`);
  }

  const onChange = (date, dateString) => {
    setDate(date);
    // console.log(date, dateString);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAmount("");
    setDate(null);
    setName("");
    setTag("");
  };

  const onChangeSelect = (value) => {
    setTag(value);
  };

  const onSearchSelect = (value) => {
    console.log('search:', value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {text}
      </Button>
      <Modal 
        title={modalName} 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} style={{ margin: 0 }}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} style={{ margin: 0 }}>
            Submit
          </Button>,
        ]}
      >
        <Input label={"Name"} type={"text"} state={name} setState={setName} />
        <Input label={"Amount"} type={"number"} state={amount} setState={setAmount} />
        <Input label={"Select Date"} show={false} />
        <DatePicker onChange={onChange} value={date}/>
        <Input label={"Select Tag"} show={false} />
        <Select
          showSearch
          placeholder="Select a tag"
          optionFilterProp="label"
          onChange={onChangeSelect}
          onSearch={onSearchSelect}
          options={dispatchFnc === "addIncome" ? tagOptionsIncome : tagOptionsExpense}
          value={tag}
        />
      </Modal>
    </>
  );
};
export default MainModal;
