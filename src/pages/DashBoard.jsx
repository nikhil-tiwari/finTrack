import React, { useEffect, useCallback, useRef } from 'react';
import Header from '../components/Header/header';
import Cards from '../components/Cards/card';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { addIncome, clearIncome } from '../store/slices/income';
import { addExpense, clearExpense } from '../store/slices/expense';
import { toast } from 'react-toastify';

const DashBoard = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const fetchCalled = useRef(false);

  const fetchTransactionFromFirebase = useCallback(async () => {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let incomeArr = [];
      let expenseArr = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().type === 'income') {
          incomeArr.push(doc.data());
          dispatch(addIncome(doc.data()));
        } else {
          expenseArr.push(doc.data());
          dispatch(addExpense(doc.data()));
        }
      });
      toast.success('Transaction fetched successfully');
      console.log('Income array:', incomeArr);
      console.log('Expense array:', expenseArr);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if(user && !fetchCalled.current) {
      dispatch(clearIncome());
      dispatch(clearExpense());
      fetchTransactionFromFirebase();
      fetchCalled.current = true;
    }
  }, [fetchTransactionFromFirebase, user, dispatch]);

  return (
    <div>
      <Header />
      <Cards />
    </div>
  );
};

export default DashBoard;
