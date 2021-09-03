import React from "react";

const Sidebar = ({
  setShowEntranceModal,
  setEntranceType,
  setCurrencyValue,
  validCurrency,
  currencyValue,
  rates,
  incomesTotal,
  currency,
  expensesTotal,
}) => {
  return (
    <>
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
                  onClick={() => {
                    setCurrencyValue("");
                  }}
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
                    return <option key={index} value={rate[0]} />;
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
    </>
  );
};

export default Sidebar;
