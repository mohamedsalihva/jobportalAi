import razorpay from "../utils/razorpay.js";

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 499 * 100, // ₹499 in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};
