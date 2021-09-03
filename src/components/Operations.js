import React from "react";

const Operations = ({
  optionsState,
  setOptionsState,
  setFilterCurrencyValue,
  filterCurrencyValue,
  filteredOperations,
  setShowEditModal,
  setEditId,
  setEntranceType,
  setEntranceAmount,
  setCurrencyValue,
  setEntranceExplanation,
  AiOutlineEdit,
  deleteOperation,
  RiDeleteBin2Line,
}) => {
  return (
    <>
      <div className="m-0 w-full md:h-auto md:w-3/4  ">
        <div className="flex w-full justify-end mt-4 pr-2 md:pr-8">
          <div className="mr-4 py-2">Filters:</div>
          <div className="mr-4">
            <select
              value={optionsState}
              className="py-2"
              onChange={(e) => {
                setOptionsState(e.target.value);
              }}
            >
              <option value="None">None</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className="mr-4">
            <input
              onClick={() => {
                setFilterCurrencyValue("");
              }}
              list="currencies"
              name="currency"
              id="currency"
              className={`text-center py-2 text-gray-900 w-16 cursor-pointer select-all`}
              value={filterCurrencyValue}
              onChange={(e) => {
                setFilterCurrencyValue(e.target.value.toUpperCase());
              }}
            />
          </div>
          <div className="mr-4">
            <button
              className="bg-red-600 rounded-lg px-4 py-2 text-gray-100 hover:bg-red-500"
              onClick={() => {
                setOptionsState("None");
                setFilterCurrencyValue("None");
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center w-full mt-4">
          <div>
            {filteredOperations.length === 0 ? (
              <>
                <h4 className="text-2xl">No match...</h4>
              </>
            ) : (
              <></>
            )}
            {filteredOperations
              .slice(0)
              .reverse()
              .map((item) => {
                return (
                  <div
                    key={item[0]}
                    className={`${
                      item[1] === "Income" ? "bg-green-200" : "bg-red-200"
                    } text-gray-900 p-4 rounded-xl my-4 flex justify-between`}
                    style={{ maxWidth: "80vw", width: "500px" }}
                  >
                    <div>
                      <div>
                        Type: {item[1]}, Amount: {item[2]}
                        {item[3]}, Explanation: {item[4]}
                      </div>
                      <div className="opacity-50">{`${new Date(item[0])}`}</div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <div
                        className="m-1 text-lg cursor-pointer"
                        onClick={() => {
                          setShowEditModal(true);
                          setEditId(item[0]);
                          setEntranceType(item[1]);
                          setEntranceAmount(item[2]);
                          setCurrencyValue(item[3]);
                          setEntranceExplanation(item[4]);
                        }}
                      >
                        <AiOutlineEdit />
                      </div>
                      <div
                        className="m-1 text-lg cursor-pointer"
                        onClick={() => {
                          deleteOperation(item[0]);
                        }}
                      >
                        <RiDeleteBin2Line />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Operations;
