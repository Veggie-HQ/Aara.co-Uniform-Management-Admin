import React from "react";
import InWords from "@/utils/InWords";
import InvoiceDate from "@/utils/InvoiceDate";
import { useStateContext } from "@/lib/context";

const Invoice = ({ INV }) => {
  const { orderToConfirm, balance } = useStateContext();

  return (
    <>
      <div className="white">
        {/* Display Order Details */}
        <div id="contents">
          <div className="invoiceheader" id="invoiceheader">
            <p className="tax_invoice">TAX INVOICE</p>
            <img src={"/assets/header.png"} alt="invoiceheader" />
          </div>

          <div className="billto">
            <div className="left left_bill">
              <p class="date bold">Invoice No.: {INV}</p>
              <p className="bold">BILL TO</p>

              <p>{orderToConfirm.order.studentDetails.name}</p>
              <p>
                Going to Class:{" "}
                {orderToConfirm.order.studentDetails.goingToClass}
              </p>

              <p>Bangalore</p>
            </div>
            <div className="right right_bill">
              <InvoiceDate />
            </div>
          </div>

          <table className="table order_details" id="contentsTable">
            <thead>
              <tr>
                <th>Item</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {orderToConfirm.order.cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.size}</td>
                  <td isNumeric>{item.quantity}</td>
                  <td isNumeric>{item.price}</td>
                  <td isNumeric>{item.quantity * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="info">
            <div className="left">
              <div className="terms">
                <p className="bold">Terms and Conditions</p>
                <p id="words">
                  1. Goods once sold will not be taken back or exchanged <br />
                  2. All disputes are subject to Bangalore jurisdiction only
                </p>
              </div>
            </div>
            <div className="right">
              <div className="taxes">
                <div className="left">
                  <p>Taxable Amount</p>
                  <p>CGST @2.5%</p>
                  <p>SGST @2.5%</p>
                  <p>CGST @6%</p>
                  <p>SGST @6%</p>
                  <p>Round Off</p>
                </div>

                <div className="right taxes_right">
                  <p class="row">
                    <img
                      src={"/assets/re.png"}
                      className="resymbol"
                      alt="rupee"
                    />
                    {/* <MdCurrencyRupee /> */}
                    {orderToConfirm.order.subtotal}
                  </p>

                  <p class="row">
                    <img
                      src={"/assets/re.png"}
                      className="resymbol"
                      alt="rupee"
                    />
                    {/* <MdCurrencyRupee /> */}

                    {orderToConfirm.order.gst5Total / 2}
                  </p>
                  <p class="row">
                    <img
                      src={"/assets/re.png"}
                      className="resymbol"
                      alt="rupee"
                    />
                    {orderToConfirm.order.gst5Total / 2}
                  </p>
                  <p class="row">
                    <img
                      src={"/assets/re.png"}
                      className="resymbol"
                      alt="rupee"
                    />
                    {orderToConfirm.order.gst12Total / 2}
                  </p>
                  <p class="row">
                    <img
                      src={"/assets/re.png"}
                      className="resymbol"
                      alt="rupee"
                    />
                    {orderToConfirm.order.gst12Total / 2}
                  </p>
                  <p class="row">{orderToConfirm.order.roundOff}</p>
                </div>
              </div>

              <p className="row total bold">
                TOTAL AMOUNT: <span className="spacer2" />
                <img
                  src={"/assets/re.png"}
                  className="resymbol"
                  alt="rupee"
                />{" "}
                {orderToConfirm.order.total}
              </p>
              <div className="taxes">
                <div className="left">
                  <p>Received Amount</p>
                  <p>Balance</p>
                </div>
                <div className="right">
                  <p class="row">
                    <img
                      src={"/assets/re.png"}
                      className="resymbol"
                      alt="rupee"
                    />
                    {balance}
                  </p>
                  <p class="row">
                    <img
                      src={"/assets/re.png"}
                      className="resymbol"
                      alt="rupee"
                    />{" "}
                    {orderToConfirm.order.total - balance}
                  </p>
                </div>
              </div>

              <div className="total_words">
                <p className="bold">Total Amount (in words)</p>
                <InWords amount={orderToConfirm.order.total} />
              </div>

              <div className="sign">
                <img
                  src={"/assets/sign.jpeg"}
                  className="sign_img"
                  alt="Authorised Sign"
                />
                <p className="bold">Authorised Signatory For</p>
                <p id="words">Aara.co</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
