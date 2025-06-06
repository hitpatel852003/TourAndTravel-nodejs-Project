const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.showPaymentPage = (req, res) => {
  res.render("payment", {
    keyId: process.env.RAZORPAY_KEY_ID,
    csrfToken: req.csrfToken(),
  });
};

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: 349900, // amount in paise (₹3499)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1, // automatic capture
    };

    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (err) {
    console.error("Razorpay create order error:", err);
    res.status(500).send("Unable to create order");
  }
};

exports.verifyPayment = (req, res) => {
  // Razorpay sends back razorpay_order_id, razorpay_payment_id, razorpay_signature
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    // Payment is verified
    res.json({ status: "success", message: "Payment verified successfully" });
    // You should update your DB/order status here securely
  } else {
    res.status(400).json({ status: "failure", message: "Payment verification failed" });
  }
};
