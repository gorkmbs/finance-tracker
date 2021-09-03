import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const EditModal = ({
  setCurrencyValue,
  validCurrency,
  currencyValue,
  entranceType,
  entranceAmount,
  setEntranceAmount,
  entranceExplanation,
  setEntranceExplanation,
  submitDisabled,
  showEditModal,
  setShowEditModal,
  editHandler,
}) => {
  return (
    <>
      <Transition appear show={showEditModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShowEditModal(false)}
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
                      editHandler();
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
                        Edit
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

export default EditModal;
