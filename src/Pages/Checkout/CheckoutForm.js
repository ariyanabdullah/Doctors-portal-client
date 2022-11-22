import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ book }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [carderror, setCarderror] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionid, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { email, patient, price, _id } = book;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);

      setCarderror(error.message);
    } else {
      setCarderror("");
    }

    // card conformation
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patient,
            email: email,
          },
        },
      });

    // set confirm error to an state

    if (confirmError) {
      setCarderror(confirmError.message);
      return;
    }
    console.log("payment suc", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      //   setSuccess("Your Payment is SuccessFull");
      //   setTransactionId(paymentIntent.id);
      // store payment data in database

      const payment = {
        price,
        transactionid: paymentIntent.id,
        email,
        bookingId: _id,
      };

      fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("your payment is Successfull");
            setTransactionId(paymentIntent.id);
          }
        });
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",

              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <p className="text-amber-300">{carderror}</p>
      <button
        className="btn btn-sm btn-primary mt-3 "
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        Pay
      </button>

      {success && (
        <>
          <p className="font-bold text-green-500">{success}</p>
          <p>
            {" "}
            Your TransactionId:{" "}
            <span className="font-bold">{transactionid} </span>{" "}
          </p>
        </>
      )}
    </form>
  );
};

export default CheckoutForm;
