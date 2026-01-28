import { PayPalButtons } from "@paypal/react-paypal-js";
import Navbar from "../../components/navbar/Navbar";
import { ShieldCheck } from "lucide-react";

const RecruiterUpgradeConfirm = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-20">
        <div className="bg-white dark:bg-[#111218] border rounded-3xl p-8 text-center">

          <ShieldCheck className="mx-auto text-amber-500" size={42} />

          <h1 className="mt-4 text-2xl font-extrabold">
            Confirm Your Upgrade
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Secure payment powered by PayPal (Sandbox)
          </p>

          <div className="mt-6 border rounded-2xl p-4 bg-slate-50 dark:bg-slate-800 text-left">
            <p className="font-semibold">Pro Plan</p>
            <p className="text-sm text-slate-500">
              Unlimited job postings · Priority listing
            </p>
            <p className="mt-2 text-xl font-extrabold text-amber-600">
              ₹499 / month
            </p>
          </div>

          
          <div className="mt-8">
            <PayPalButtons
              style={{ layout: "vertical", shape: "pill" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "6.00", 
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(() => {
                  alert("Payment successful 🎉 (Sandbox)");
                  
                });
              }}
              onError={() => {
                alert("Payment failed. Try again.");
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecruiterUpgradeConfirm;
