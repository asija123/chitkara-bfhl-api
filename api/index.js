const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST Route
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  const user_id = "lakshey_asija_25022004";
  const email = "lakshayasija36@gmail.com";
  const roll_number = "2210991843";

  let even = [],
    odd = [],
    alpha = [],
    special = [];
  let total = 0,
    lettersForConcat = "";

  data.forEach((item) => {
    if (!isNaN(item)) {
      const num = parseInt(item);
      total += num;
      (num % 2 === 0 ? even : odd).push(item.toString());
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alpha.push(item.toUpperCase());
      lettersForConcat += item;
    } else {
      special.push(item);
    }
  });

  const concat_string = lettersForConcat
    .split("")
    .reverse()
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

  res.status(200).json({
    is_success: true,
    user_id,
    email,
    roll_number,
    odd_numbers: odd,
    even_numbers: even,
    alphabets: alpha,
    special_characters: special,
    sum: total.toString(),
    concat_string,
  });
});

// Health Route
app.get("/", (req, res) => {
  res.send("BFHL API working properly");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
