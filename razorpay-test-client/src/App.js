import React, { useEffect, useRef, useState } from "react";

function App() {
  const [result, setResult] = useState({});
  const [token, setToken] = useState("");
  const [addressId, setAddressId] = useState("");
  const [api, setApi] = useState("cart");

  const [cart, setCart] = useState([]);
  const ref = useRef(null);
  async function cartItems(method = "GET") {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/${api}`, {
        method: method,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }),
        mode: "cors",
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function checkoutCart(method = "POST") {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/cart/checkout`,
        {
          method: method,
          body: JSON.stringify({
            addressId: addressId,
          }),
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          }),
          mode: "cors",
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  function updateTransaction(tid, body) {
    return fetch(`http://localhost:8080/api/v1/transaction/${tid}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
      mode: "cors",
    }).then((response) => response.json());
  }

  async function handleCheckout() {
    try {
      const response = await checkoutCart();
      setResult({ ...result, order: response.data });
    } catch (error) {
      console.log({ error });
      setResult({ ...result, error });
    }
  }

  function handleTransaction(e) {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    const data = result.order;
    if (!data || !data.razorpayOptions) {
      return;
    }

    function onSuccess(response) {
      console.log({ response });
      updateTransaction(data.id, {
        paymentOrderId: response.razorpay_order_id,
        paymentSignature: response.razorpay_signature,
        paymentId: response.razorpay_payment_id,
      }).then((response) => {
        console.log({ response });
        setResult({ status: response.data.status, order: response.data });
      });
    }

    function onError(response) {
      setResult({ ...result, error: response });
      console.log({ response });
    }

    // eslint-disable-next-line no-undef
    ref.current = new Razorpay({
      handler: onSuccess,
      ...data.razorpayOptions,
    });
    ref.current.on("payment.failed", onError);
    ref.current.open();
  }

  return (
    <div className="app form-group">
      <header className="header form-group">
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "20px",
          }}
        >
          <span>Auth Token</span>
          <input
            className="form-control"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "20px",
          }}
        >
          <span>AddressId</span>
          <input
            className="form-control"
            value={addressId}
            onChange={(e) => {
              setAddressId(e.target.value);
            }}
          />
        </label>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "20px",
          }}
        >
          <span>API</span>
          <input
            className="form-control"
            value={api}
            onChange={(e) => {
              setApi(e.target.value);
            }}
          />
        </label>
      </header>
      <div
        className="container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <button
          disabled={!token}
          className="btn btn-primary"
          onClick={() => {
            cartItems().then((response) => {
              console.log(response);
              setCart(response.data);
            });
          }}
        >
          Fetch {api}
        </button>
        <table className="table">
          <thead>
            <tr>
              {cart[0] && Object.keys(cart[0])?.map((key) => (
                <th scope="col">{key}</th>
              ))}
            </tr>
          </thead>
          {cart?.map((item) => {
            return (
              <tr className="active" key={item.id} style={{ maxWidth: "60px" }}>
                {Object.keys(item).map((key) => {
                  return <td className="info">{item[key]}</td>;
                })}
              </tr>
            );
          })}
        </table>
      </div>

      <section className="main">
        <button
          disabled={!token}
          className="btn btn-primary"
          onClick={handleCheckout}
        >
          Checkout
        </button>
        {result?.order?.grandTotal && (
          <button className="btn btn-default" onClick={handleTransaction}>
            Pay {result?.order?.grandTotal}
          </button>
        )}
      </section>
      <section className={"container"} style={{ justifyContent: "center" }}>
        {result?.status}
      </section>
      <section className="container">
        <div className="code">
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "20px",
            }}
          >
            <span>Order</span>
            <textarea
              title="order"
              className="form-control flex-1"
              readOnly
              rows={20}
              value={JSON.stringify(result?.order, null, 4)}
            />
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "20px",
            }}
          >
            <span>Error</span>
            <textarea
              title="error"
              className="form-control flex-1"
              rows={20}
              readOnly
              value={JSON.stringify(result?.error, null, 4)}
            />
          </label>
        </div>
      </section>
    </div>
  );
}

export default App;
