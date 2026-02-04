import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Toast from "../../components/ui/Toast";
import { ShieldCheck } from "lucide-react";
import api from "../../api/axios";

const RecruiterUpgradeConfirm = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (type, message) =>
    setToast({ show: true, type, message });

  const handlePayment = async () => {
    try {
      const res = await api.post("/payments/razorpay/order");
      const { order } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "HireSynnefo",
        description: "Pro Plan Subscription",
        order_id: order.id,
        handler: async function (response) {
          await api.post("/payments/razorpay/verify", response);
          showToast("success", "Payment successful");
          setTimeout(() => navigate("/recruiter/dashboard"), 800);
        },
        theme: {
          color: "#f59e0b",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      showToast("error", "Payment initialization failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0F]">
      <Navbar />
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((p) => ({ ...p, show: false }))}
      />

      <div className="max-w-xl mx-auto px-4 py-16 sm:py-20">
        <div className="bg-white dark:bg-[#111218] border rounded-3xl p-6 sm:p-8 text-center">
          <ShieldCheck className="mx-auto text-amber-500" size={42} />

          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold">
            Confirm Your Upgrade
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Secure payment powered by Razorpay
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

          <button
            onClick={handlePayment}
            className="mt-8 w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 font-extrabold"
          >
            Pay ₹499 & Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterUpgradeConfirm;
