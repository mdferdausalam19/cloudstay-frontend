import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CheckoutForm = ({ handleCloseModal, bookingInfo, refetch }) => {
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: clientSecret = "", isLoading } = useQuery({
    queryKey: ["clientSecret", bookingInfo?.price],
    queryFn: async () => {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: bookingInfo?.price,
      });
      return data?.clientSecret;
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
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
      // console.log("[error]", error);
      setCardError(error?.message);
      return;
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // confirm payment
    const { paymentIntent, error: paymentConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });
    if (paymentConfirmError) {
      // console.log(paymentConfirmError?.message);
      setCardError(paymentConfirmError?.message);
      return;
    }
    if (paymentIntent && paymentIntent?.status === "succeeded") {
      // payment info
      const paymentInfo = {
        ...bookingInfo,
        roomId: bookingInfo?._id,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      delete paymentInfo?._id;
      try {
        await axiosSecure.post("/bookings", paymentInfo);
        await axiosSecure.patch(`/rooms/status/${bookingInfo?._id}`, {
          status: true,
        });
        // update ui
        refetch();
        handleCloseModal();
        setProcessing(false);
        toast.success("Room Booked Successfully!");
        navigate("/dashboard/my-bookings");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
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
        <div className="flex mt-2 justify-around">
          <button
            disabled={!stripe || !clientSecret || isLoading}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {processing ? (
              <ImSpinner9
                size={24}
                className="animate-spin m-auto"
              ></ImSpinner9>
            ) : (
              <span>Pay ${bookingInfo?.price}</span>
            )}
          </button>
          <button
            onClick={handleCloseModal}
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-500 mt-1">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
  handleCloseModal: PropTypes.func,
  bookingInfo: PropTypes.object,
  refetch: PropTypes.func,
};
