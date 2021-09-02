import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { NEW_OPERATION, CURRENCY_CHANGED } from "../actions/actionsForFinance";

const Dashboard = ({
  rates,
  operations,
  currency,
  setCurrency,
  setNewOperation,
}) => {
  const [currencyValue, setCurrencyValue] = useState(currency);
  const [validCurrency, setValidCurrency] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showEntranceModal, setShowEntranceModal] = useState(true);
  const [incomesTotal, setIncomesTotal] = useState(0);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [entranceType, setEntranceType] = useState("");
  const [entranceAmount, setEntranceAmount] = useState(0);
  const [entranceExplanation, setEntranceExplanation] = useState("");

  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    let valid = true;

    if (entranceAmount > 1000000 || entranceAmount <= 0) {
      valid = false;
    }
    if (!validCurrency) {
      valid = false;
    }
    if (entranceExplanation.length < 1) {
      valid = false;
    }
    setSubmitDisabled(!valid);
  }, [entranceAmount, validCurrency, entranceExplanation]);

  const submitHandler = () => {
    setNewOperation(
      entranceType,
      entranceAmount,
      currency,
      entranceExplanation
    );
    setEntranceAmount(0);
    setEntranceExplanation("");
  };

  useEffect(() => {
    if (!loading) {
      let items = rates.filter((item) => item[0] === currencyValue);
      if (items.length === 1) {
        setValidCurrency(true);
        setCurrency(currencyValue);
      } else {
        setValidCurrency(false);
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
        <div className="flex flex-col justify-between m-0 w-full md:h-auto md:w-1/4 bg-gray-900 ">
          <div>
            <div className="flex justify-around my-4">
              <button
                className="w-auto  px-4 py-2 bg-green-500 text-gray-100 rounded-xl hover:bg-green-400"
                onClick={() => {
                  setShowEntranceModal(true);
                  setEntranceType("Income");
                }}
              >
                Income
              </button>
              <button
                className="w-auto  px-4 py-2 bg-red-500 text-gray-100 rounded-xl hover:bg-red-400"
                onClick={() => {
                  setShowEntranceModal(true);
                  setEntranceType("Expense");
                }}
              >
                Expense
              </button>
            </div>
            <div>
              <h4 className="text-white text-center font-mono">
                Base Currency:{" "}
                <span className="text-blue-400">
                  <input
                    list="currencies"
                    name="currency"
                    id="currency"
                    className={`text-center ${
                      validCurrency ? "bg-green-600" : "bg-red-600"
                    } text-white w-16 cursor-pointer select-all`}
                    value={currencyValue}
                    onChange={(e) => {
                      setCurrencyValue(e.target.value.toUpperCase());
                    }}
                  />
                  <datalist id="currencies">
                    {rates.map((rate, index) => {
                      return (
                        <option
                          key={index}
                          value={rate[0]}
                          selected={rate[0] === "EUR" ? true : false}
                        />
                      );
                    })}
                  </datalist>
                </span>
              </h4>
            </div>
            <div className="flex flex-wrap justify-around items-center my-4">
              <div>
                <p className="text-center text-gray-100 font-mono">
                  Total Incomes: {incomesTotal}
                  {currency}
                </p>
              </div>
              <div>
                <p className="text-center text-gray-100 font-mono">
                  Total Expenses: {expensesTotal}
                  {currency}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-gray-100 text-center mb-4 font-serif cursor-default hidden md:block">
              Finance Tracker
            </h4>
          </div>
        </div>
        <div className="m-0 w-full md:h-auto md:w-3/4  "></div>
      </div>
      <Transition appear show={showEntranceModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShowEntranceModal(false)}
        >
          <div className="min-h-screen px-4 text-center bg-gray-900 bg-opacity-75">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block bg-gray-900 w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-100 text-center mt-4"
                >
                  {entranceType}
                </Dialog.Title>
                <div className="mt-2 flex w-full justify-center">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitHandler();
                    }}
                  >
                    <div className="mt-12 ">
                      <label
                        htmlFor="amount"
                        className="text-gray-200 my-2 text-xl"
                      >
                        Amount
                      </label>
                      <br />
                      <input
                        type="number"
                        id="amount"
                        value={entranceAmount}
                        placeholder="Money Amount"
                        onChange={(e) => setEntranceAmount(e.target.value)}
                        className="p-2 my-2 placeholder-yellow-100 
                        bg-gray-500
                       text-xl text-yellow-200 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-blue-700 smooth-transition-2"
                      />
                    </div>
                    <div className="mt-12 ">
                      <label
                        htmlFor="user-username"
                        className="text-gray-200 my-2 text-xl"
                      >
                        Currency Type
                      </label>
                      <br />
                      <div className="flex justify-center mt-2">
                        <input
                          list="currencies"
                          name="currency"
                          id="currency"
                          className={`text-center ${
                            validCurrency ? "bg-green-600" : "bg-red-600"
                          } text-white w-16 cursor-pointer select-all`}
                          value={currencyValue}
                          onChange={(e) => {
                            setCurrencyValue(e.target.value.toUpperCase());
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-12 ">
                      <label
                        htmlFor="explanation"
                        className="text-gray-200 my-2 text-xl"
                      >
                        Explanation
                      </label>
                      <br />
                      <input
                        type="text"
                        id="explanation"
                        value={entranceExplanation}
                        placeholder="Detail"
                        onChange={(e) => setEntranceExplanation(e.target.value)}
                        className="p-2 my-2 placeholder-yellow-100 
                        bg-gray-500
                       text-xl text-yellow-200 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-blue-700 smooth-transition-2"
                      />
                    </div>
                    <div className="flex justify-center items-center my-4">
                      <button
                        disabled={submitDisabled}
                        type="submit"
                        className={`${
                          submitDisabled ? "bg-opacity-50" : "hover:bg-blue-500"
                        } bg-blue-600 text-gray-100 rounded-xl px-4 py-2`}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-4"></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
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
