const bcrypt = require("bcryptjs");

const plainTextPassword = "password123"; // Suspected original password
console.log("Entered Password:", plainTextPassword);
const hashedPassword = "$2b$10$aW3qCgBi6dUxVteGmVIbFO1rLs2dEltHVt2YAuTe/mYI9v/fUakBq"; // Stored hash

bcrypt.hash(plainTextPassword, 10, (err, newHash) => {
  console.log("New Hash:", newHash);
  bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
    console.log("Match:", result); // Expected to be true if the password is correct
  });
});
