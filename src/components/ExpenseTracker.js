import { useState } from "react";

export default function ExpenseTracker() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSignup = () => {
    if (name.trim() && budget) {
      setUser(name);
    }
  };

  const addExpense = () => {
    if (desc && amount) {
      const newExpense = {
        desc,
        amount: parseFloat(amount),
        date: new Date().toLocaleString(),
      };
      
      if (editingIndex !== null) {
        const updatedExpenses = [...expenses];
        updatedExpenses[editingIndex] = newExpense;
        setExpenses(updatedExpenses);
        setEditingIndex(null);
      } else {
        setExpenses([...expenses, newExpense]);
      }
      
      setDesc("");
      setAmount("");
    }
  };

  const editExpense = (index) => {
    setDesc(expenses[index].desc);
    setAmount(expenses[index].amount);
    setEditingIndex(index);
  };

  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const remainingBudget = budget - totalExpenses;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!user ? (
        <div style={{ border: "1px solid #ccc", padding: "20px", width: "300px", margin: "auto" }}>
          <h2>Signup</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <input
            type="number"
            placeholder="Set your budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <button onClick={handleSignup} style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "white", border: "none" }}>Start Tracking</button>
        </div>
      ) : (
        <div style={{ border: "1px solid #ccc", padding: "20px", width: "300px", margin: "auto", backgroundColor: remainingBudget < 500 ? "red" : "white" }}>
          <h2>Welcome, {user}!</h2>
          <h3>Budget: ₹{budget}</h3>
          <h3 style={{ color: "green" }}>Remaining: ₹{remainingBudget}</h3>
          <div>
            <input
              type="text"
              placeholder="Expense Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <button onClick={addExpense} style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "white", border: "none" }}>
              {editingIndex !== null ? "Update Expense" : "Add Expense"}
            </button>
          </div>
          <div>
            <h3>Expenses:</h3>
            {expenses.map((exp, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc", padding: "5px 0" }}>
                <span>{exp.desc} - ₹{exp.amount}</span>
                <span style={{ fontSize: "12px", color: "gray" }}>{exp.date}</span>
                <button onClick={() => editExpense(index)} style={{ background: "none", border: "none", color: "blue", fontSize: "16px", cursor: "pointer" }}>✎</button>
                <button onClick={() => removeExpense(index)} style={{ background: "none", border: "none", color: "red", fontSize: "16px", cursor: "pointer" }}>×</button>
              </div>
            ))}
            <h3>Total Expenses: ₹{totalExpenses}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
