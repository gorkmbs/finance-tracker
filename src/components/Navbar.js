import React from "react";
import { connect } from "react-redux";

const Navbar = ({ rates, operations, currency, total }) => {
  return (
    <>
      <div
        className="bg-blue-700 h-16 flex justify-between px-8 items-center"
        style={{ width: "100%", position: "fixed", top: "0", left: "0" }}
      >
        <div>
          <h4 className="text-blue-100 text-xl font-serif">Finance Tracker</h4>
        </div>
        <div>
          <p
            className={`${
              Number(total) >= 0 ? "text-green-200" : "text-red-200"
            } text-lg font-mono`}
          >
            Balance: {total}
            {currency}
          </p>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { rates, operations, currency, total } = state.finance;
  return { rates, operations, currency, total };
};

export default connect(mapStateToProps)(Navbar);
