import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  NEW_OPERATION,
  CURRENCY_CHANGED,
  SET_TOTAL_AMOUNT,
  DELETE_OPERATION,
  EDIT_OPERATION,
} from "../actions/actionsForFinance";
import Sidebar from "../components/Sidebar";
import EntranceModal from "../components/EntranceModal";
import EditModal from "../components/EditModal";
import Operations from "../components/Operations";

const Dashboard = ({
  rates,
  operations,
  currency,
  setCurrency,
  setNewOperation,
  setTotal,
  deleteOperation,
  editOperation,
}) => {
  const [currencyValue, setCurrencyValue] = useState(currency);
  const [filteredOperations, setFilteredOperations] = useState(operations);
  const [validCurrency, setValidCurrency] = useState(true);
  const [filterValidCurrency, setFilterValidCurrency] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showEntranceModal, setShowEntranceModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [incomesTotal, setIncomesTotal] = useState(0);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [entranceType, setEntranceType] = useState("");
  const [entranceAmount, setEntranceAmount] = useState("");
  const [entranceExplanation, setEntranceExplanation] = useState("");
  const [optionsState, setOptionsState] = useState("None");
  const [filterCurrencyValue, setFilterCurrencyValue] = useState("None");
  const [editId, setEditId] = useState(0);

  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    let ops = [...operations];
    if (optionsState !== "None") {
      ops = ops.filter((item) => item[1] === optionsState);
    }
    if (filterValidCurrency && filterCurrencyValue !== "None") {
      ops = ops.filter((item) => item[3] === filterCurrencyValue);
    }
    setFilteredOperations(ops);
    // eslint-disable-next-line
  }, [showEditModal, operations, optionsState, filterCurrencyValue]);

  useEffect(() => {
    // console.log(rates);
    let totalIncome = operations.reduce((total, item) => {
      if (item[1] === "Income") {
        let itemRate = String(
          rates.filter((rate) => rate[0] === String(item[3]))
        ).split(",")[1];
        let baseRate = String(
          rates.filter((rate) => rate[0] === String(currency))
        ).split(",")[1];
        // console.log("item:" + itemRate + " base:" + baseRate);
        total += (item[2] * Number(baseRate)) / Number(itemRate);
      }
      return total;
    }, 0);
    let totalExpense = operations.reduce((total, item) => {
      if (item[1] === "Expense") {
        let itemRate = String(
          rates.filter((rate) => rate[0] === String(item[3]))
        ).split(",")[1];
        let baseRate = String(
          rates.filter((rate) => rate[0] === String(currency))
        ).split(",")[1];
        // console.log("item:" + itemRate + " base:" + baseRate);
        total += (item[2] * Number(baseRate)) / Number(itemRate);
      }
      return total;
    }, 0);
    setIncomesTotal(totalIncome);
    setExpensesTotal(totalExpense);
    setTotal(totalIncome - totalExpense);
    // eslint-disable-next-line
  }, [operations, currency, showEditModal]);

  useEffect(() => {
    let valid = true;

    if (entranceAmount > 1000000 || entranceAmount <= 0) {
      valid = false;
    }
    if (!validCurrency) {
      valid = false;
    }
    if (entranceExplanation.length < 1 || entranceExplanation.length > 30) {
      valid = false;
    }
    setSubmitDisabled(!valid);
  }, [entranceAmount, validCurrency, entranceExplanation]);

  const submitHandler = () => {
    setNewOperation(
      entranceType,
      Number(entranceAmount),
      currency,
      entranceExplanation
    );
    setEntranceAmount("");
    setEntranceExplanation("");
    setShowEntranceModal(false);
  };

  const editHandler = () => {
    editOperation(
      editId,
      entranceType,
      entranceAmount,
      currency,
      entranceExplanation
    );
    setEntranceAmount("");
    setEntranceExplanation("");
    setShowEditModal(false);
  };

  useEffect(() => {
    if (!loading) {
      let items = rates.filter((item) => item[0] === currencyValue);
      let filterItems = rates.filter((item) => item[0] === filterCurrencyValue);
      if (items.length === 1) {
        setValidCurrency(true);

        setCurrency(currencyValue);
      } else {
        setValidCurrency(false);
      }
      if (filterItems.length === 1) {
        setFilterValidCurrency(true);
      } else {
        if (filterCurrencyValue === "None") {
          setFilterValidCurrency(true);
        } else {
          setFilterValidCurrency(false);
        }
      }
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [currencyValue]);

  useEffect(() => {
    setCurrencyValue(currency);
  }, [currency]);

  return (
    <>
      <div
        className="flex flex-col md:flex-row bg-blue-100 m-0 p-0 pt-16 items-scretch justify-stretch"
        style={{ minHeight: "100vh" }}
      >
        <Sidebar
          setShowEntranceModal={setShowEntranceModal}
          setEntranceType={setEntranceType}
          setCurrencyValue={setCurrencyValue}
          validCurrency={validCurrency}
          currencyValue={currencyValue}
          rates={rates}
          incomesTotal={incomesTotal}
          currency={currency}
          expensesTotal={expensesTotal}
        />
        <Operations
          optionsState={optionsState}
          setOptionsState={setOptionsState}
          setFilterCurrencyValue={setFilterCurrencyValue}
          filterCurrencyValue={filterCurrencyValue}
          filteredOperations={filteredOperations}
          setShowEditModal={setShowEditModal}
          setEditId={setEditId}
          setEntranceType={setEntranceType}
          setEntranceAmount={setEntranceAmount}
          setCurrencyValue={setCurrencyValue}
          setEntranceExplanation={setEntranceExplanation}
          AiOutlineEdit={AiOutlineEdit}
          deleteOperation={deleteOperation}
          RiDeleteBin2Line={RiDeleteBin2Line}
        />
      </div>
      <EntranceModal
        setShowEntranceModal={setShowEntranceModal}
        setCurrencyValue={setCurrencyValue}
        validCurrency={validCurrency}
        currencyValue={currencyValue}
        showEntranceModal={showEntranceModal}
        entranceType={entranceType}
        submitHandler={submitHandler}
        entranceAmount={entranceAmount}
        setEntranceAmount={setEntranceAmount}
        entranceExplanation={entranceExplanation}
        setEntranceExplanation={setEntranceExplanation}
        submitDisabled={submitDisabled}
      />
      <EditModal
        setCurrencyValue={setCurrencyValue}
        validCurrency={validCurrency}
        currencyValue={currencyValue}
        entranceType={entranceType}
        entranceAmount={entranceAmount}
        setEntranceAmount={setEntranceAmount}
        entranceExplanation={entranceExplanation}
        setEntranceExplanation={setEntranceExplanation}
        submitDisabled={submitDisabled}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editHandler={editHandler}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const { rates, operations, currency } = state.finance;
  return { rates, operations, currency };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currency) => {
      dispatch({ type: CURRENCY_CHANGED, payload: { currency } });
    },
    setTotal: (total) => {
      dispatch({ type: SET_TOTAL_AMOUNT, payload: { total } });
    },
    deleteOperation: (id) => {
      dispatch({ type: DELETE_OPERATION, payload: { id } });
    },
    editOperation: (
      id,
      entranceType,
      entranceAmount,
      currency,
      entranceExplanation
    ) => {
      dispatch({
        type: EDIT_OPERATION,
        payload: {
          id,
          entranceType,
          entranceAmount,
          currency,
          entranceExplanation,
        },
      });
    },
    setNewOperation: (
      entranceType,
      entranceAmount,
      currency,
      entranceExplanation
    ) => {
      dispatch({
        type: NEW_OPERATION,
        payload: {
          entranceType,
          entranceAmount,
          entranceExplanation,
          currency,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
