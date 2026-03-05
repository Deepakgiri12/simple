
import express from "express";
const router = express.Router();
import nodemailer from "nodemailer";

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// Place Order Route
router.post("/place-order", async (req, res) => {
  try {
    const { user, cart, total } = req.body;
    if (!user || !cart || !total) {
  return res.status(400).json({ message: "Invalid order data" });
}

    // Send email to owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      subject: "🛒 New Order Received!",
      html: `
        <h2>New Order Details</h2>
        <p><strong>Name:</strong> ${user.username}</p>
        <p><strong>Mobile:</strong> ${user.mobile}</p>
        <p><strong>Total:</strong> ₹${total}</p>
        <h3>Items:</h3>
        ${cart.map(item => `
          <p>${item.weight} × ${item.quantity} = ₹${item.total}</p>
        `).join("")}
      `,
    });

    res.status(200).json({ message: "Order placed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order failed" });
  }
});

export default router;  