import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  const book = useLoaderData();

  const { patient, price, treatmentName, treatmentDate, time } = book;
  const stripePromise = loadStripe(process.env.REACT_APP_stripe);

  return (
    <div>
      <h1 className="text-2xl font-bold ">
        {" "}
        {patient}
        {"-->"} {treatmentName}
      </h1>
      <h1>
        please pay <span className="font-bold">{price}</span> for your
        Appointment <span>{treatmentDate}</span> on <span>{time}</span>
      </h1>

      <div className="w-96 my-6 border py-6 px-3 rounded-lg">
        <Elements stripe={stripePromise}>
          <CheckoutForm book={book} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
