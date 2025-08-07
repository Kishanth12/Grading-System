import Grade from "../../models/grade.model";

export const addGrade = async (req, res) => {
  try {
    const lecturerId = req.user._id; // from middleware (logged-in user)
    const { student, subject, marks, gradeLetter, gpaPoint } = req.body;

    if (!student || !subject || !marks || !gradeLetter || gpaPoint) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (
      marks.assignment < 0 || marks.assignment > 100 ||
      marks.finalExam < 0 || marks.finalExam > 100
    ) {
      return res.status(400).json({ message: "Marks must be between 0 and 100" });
    }
    if (gpaPoint < 0 || gpaPoint > 4.0) {
      return res.status(400).json({ message: "GPA point must be between 0 and 4.0" });
    }
    const newGrade = new Grade({
      student,
      subject,
      lecturer: lecturerId,
      marks,
      gradeLetter,
      gpaPoint
    });

    await newGrade.save();

    res.status(201).json({ message: "Grade added successfully", grade: newGrade });
  } catch (error) {
    console.error("Error adding grade:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
