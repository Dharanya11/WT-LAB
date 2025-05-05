const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 4000;
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB Connection Error:", err));
const studentSchema = new mongoose.Schema({
    name: String,
    rollNumber: { type: String, unique: true }, 
    department: String,
    cgpa: Number,
    email: String,
    phone: String,
    dob: String,
    yearOfPassing12th: Number,
    percentage12th: Number,
    github: String,
    linkedin: String,
    leetcodeProblemsSolved: Number
});
const Student = mongoose.model("Student", studentSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); \
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});
app.post("/register", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.send("Student Registered Successfully!");
    } catch (err) {
        res.send("Error Saving Student: " + err);
    }
});
app.get("/read", async (req, res) => {
    const rollNumber = req.query.rollNumber;
    try {
        const student = await Student.findOne({ rollNumber: rollNumber });
        if (student) {
            res.send(`
                <h3>Student Details:</h3>
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
                <p><strong>Department:</strong> ${student.department}</p>
                <p><strong>CGPA:</strong> ${student.cgpa}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Phone:</strong> ${student.phone}</p>
                <p><strong>DOB:</strong> ${student.dob}</p>
                <p><strong>Year of Passing (12th):</strong> ${student.yearOfPassing12th}</p>
                <p><strong>12th Percentage:</strong> ${student.percentage12th}</p>
                <p><strong>GitHub:</strong> <a href="${student.github}" target="_blank">${student.github}</a></p>
                <p><strong>LinkedIn:</strong> <a href="${student.linkedin}" target="_blank">${student.linkedin}</a></p>
                <p><strong>LeetCode Problems Solved:</strong> ${student.leetcodeProblemsSolved}</p>
            `);
        } else {
            res.send("<p>Student Not Found!</p>");
        }
    } catch (err) {
        res.send("<p>Error Fetching Student: " + err + "</p>");
    }
});
app.post("/update", async (req, res) => {
    const { rollNumber, ...updateData } = req.body;
    console.log("Received Update Request:", req.body);
    try {
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined || updateData[key] === "") {
                delete updateData[key];
            }
        });
        const updatedStudent = await Student.findOneAndUpdate(
            { rollNumber: rollNumber },
            { $set: updateData },  
            { new: true, runValidators: true }
        );  
        if (updatedStudent) {
            res.send("Student Details Updated Successfully!");
        } else {
            res.send("Student Not Found!");
        }
    } catch (err) {
        res.send("Error Updating Student: " + err);
    }
});
app.post("/delete", async (req, res) => {
    const rollNumber = req.body.rollNumber;
    try {
        const result = await Student.findOneAndDelete({ rollNumber: rollNumber });
        if (result) {
            res.send("Student Deleted Successfully!");
        } else {
            res.send("Student Not Found!");
        }
    } catch (err) {
        res.send("Error Deleting Student: " + err);
    }
});
app.listen(port, () => {
    console.log("Server running on http://localhost:${port}");
});
