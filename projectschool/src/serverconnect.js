const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key";

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });
    req.user = user;
    next();
  });
}

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3424719",
  database: "schoolproject"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});
// Add this at the top of your serverconnect.js




// Signup Endpoint
app.post("/api/signup", async (req, res) => {
  const { name, username, email, password, phone } = req.body;

  if (!name || !username || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkUserSql = "SELECT * FROM login WHERE email = ? OR phone = ?";
  db.query(checkUserSql, [email, phone], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length > 0) return res.status(409).json({ message: "User already exists" });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = "INSERT INTO login (name, username, email, password, phone) VALUES (?, ?, ?, ?, ?)";
      db.query(sql, [name, username, email, hashedPassword, phone], (err) => {
        if (err) return res.status(500).json({ message: "Server error" });
        res.status(201).json({ message: "Signup successful!" });
      });
    } catch (hashErr) {
      return res.status(500).json({ message: "Server error" });
    }
  });
});

// Login Endpoint
app.post("/api/login", (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "SELECT * FROM login WHERE username = ? OR email = ?";
  db.query(sql, [identifier, identifier], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: "24h" });
      res.status(200).json({ message: "Login successful!", token, user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// ====== ROLES ======
app.get("/roles", (req, res) => {
  db.query("SELECT * FROM roles", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/roles", (req, res) => {
  const { roleName } = req.body;
  db.query("INSERT INTO roles (roleName) VALUES (?)", [roleName], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Role added successfully", roleId: results.insertId });
  });
});

app.delete("/roles/:id", (req, res) => {
  const roleId = req.params.id;
  db.query("DELETE FROM roles WHERE roleID = ?", [roleId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Role deleted successfully" });
  });
});

// Bulk delete roles
app.post("/roles/delete", (req, res) => {
  const { roleIds } = req.body;
  if (!Array.isArray(roleIds) || roleIds.length === 0) {
    return res.status(400).json({ message: "No role IDs provided" });
  }

  const placeholders = roleIds.map(() => "?").join(",");
  const sql = `DELETE FROM roles WHERE roleID IN (${placeholders})`;

  db.query(sql, roleIds, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Selected roles deleted successfully" });
  });
});

// ====== DEPARTMENTS ======
app.get("/departments", (req, res) => {
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/departments", (req, res) => {
  const { departmentName } = req.body;
  db.query("INSERT INTO departments (departmentName) VALUES (?)", [departmentName], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Department added successfully", departmentId: results.insertId });
  });
});

app.delete("/departments/:id", (req, res) => {
  const departmentId = req.params.id;
  db.query("DELETE FROM departments WHERE departmentID = ?", [departmentId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Department deleted successfully" });
  });
});

// ====== ROLE ASSIGN ======
app.get("/role-assign", (req, res) => {
  db.query(
    `SELECT 
      login.id, 
      login.username, 
      login.email, 
      roles.roleName, 
      departments.departmentName AS department 
    FROM login 
    LEFT JOIN roles ON login.roleName = roles.roleName 
    LEFT JOIN departments ON login.department = departments.departmentName`,
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

app.put("/role-assign/:id", (req, res) => {
  const { roleName, department } = req.body;
  const employeeId = req.params.id;
  db.query("UPDATE login SET roleName = ?, department = ? WHERE id = ?", [roleName, department, employeeId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Employee role updated successfully" });
  });
});
// 
// 📋 Get All Employee Salaries
app.get("/api/employeesalary", verifyToken, (req, res) => {
  db.query(
    "SELECT id, name, basicSalary, hra, travel, telephone, pf, total FROM employeesalary",
    (err, results) => {
      if (err) return res.status(500).json({ message: "Error fetching employee salaries" });
      return res.status(200).json({ message: "Employee salaries fetched successfully", data: results });
    }
  );
});

app.post("/api/employeesalary", verifyToken, (req, res) => {
  const { name, basicSalary, hra, travel, telephone, pf, total } = req.body;

  if (!name || !basicSalary) {
    return res.status(400).json({ message: "Name and Basic Salary are required" });
  }

  const sql = `
    INSERT INTO employeesalary (name, basicSalary, hra, travel, telephone, pf, total)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [name, basicSalary, hra || 0, travel || 0, telephone || 0, pf || 0, total || 0], (err, result) => {
    if (err) return res.status(500).json({ message: "Error adding employee salary" });
    return res.status(201).json({ message: "Employee salary added successfully", id: result.insertId });
  });
});

app.put("/api/employeesalary/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { name, basicSalary, hra, travel, telephone, pf, total } = req.body;

  const sql = `
    UPDATE employeesalary
    SET name = ?, basicSalary = ?, hra = ?, travel = ?, telephone = ?, pf = ?, total = ?
    WHERE id = ?
  `;
  db.query(sql, [name, basicSalary, hra, travel, telephone, pf, total, id], (err) => {
    if (err) return res.status(500).json({ message: "Error updating employee salary" });
    return res.status(200).json({ message: "Employee salary updated successfully" });
  });
});

// ====== HOLIDAYS ======
app.get('/api/holidays', (req, res) => {
  db.query('SELECT * FROM holidays ORDER BY date', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/holidays', (req, res) => {
  const { date, description, day } = req.body;
  const sql = `
    INSERT INTO holidays (date, description, day)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE description = VALUES(description), day = VALUES(day)
  `;
  db.query(sql, [date, description, day], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Saved successfully' });
  });
});

app.delete('/api/holidays/:date', (req, res) => {
  const { date } = req.params;
  db.query('DELETE FROM holidays WHERE date = ?', [date], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted successfully' });
  });
});

 
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

