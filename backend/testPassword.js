const bcrypt = require("bcryptjs");
const storedHash = "$2b$10$ayDm.L.6sMUumr.6kiRKleNNJgFtt1625607fGmbYt.BJajJLqHtu"; // Replace with the stored hash
const password = "QRVOTIFY@123"; // Replace with your actual password

bcrypt.compare(password, storedHash).then((match) => {
  console.log("✅ Password Match:", match);
});
