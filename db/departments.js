const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  officePhone: String,
  budgetCode: String,
});

module.exports = mongoose.model("department", departmentSchema);
