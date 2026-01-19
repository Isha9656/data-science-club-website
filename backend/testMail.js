require("dotenv").config();
const { sendTemporaryPasswordEmail } = require("./utils/email");

(async () => {
  const ok = await sendTemporaryPasswordEmail(
    "kachatushar108@gmail.com", // 👈 use a DIFFERENT email to test
    "Test User",
    "Temp1234"
  );
  console.log("Email sent:", ok);
})();
