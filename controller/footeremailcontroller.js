// const FooterEmail = require('../models/footeremailmodels');

// // exports.getfooteremail = (req, res) => {
// //   res.render('footer'); // or wherever your EJS page is
// // };

// exports.postfooteremail = async (req, res) => {
//   console.log("📩 Newsletter form submitted:", req.body); // Debug line

//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).send("Email is required");
//     }

//     await FooterEmail.create({ email });
//     console.log("✅ Email saved:", email);
//     res.redirect('/'); // or send a success message
//   } catch (err) {
//     console.error("❌ Error saving email:", err.message);
//     res.status(500).send("Server Error");
//   }
// };