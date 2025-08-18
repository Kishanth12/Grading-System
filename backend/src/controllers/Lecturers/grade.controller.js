import Grade from "../../models/grade.model.js";
import Subject from "../../models/subject.model.js";


export const addGrade = async (req, res) => {
  try {
    const lecturerId = req.user._id; // from middleware (logged-in user)
    const { student, subject, marks } = req.body;

    if (!student || !subject || !marks) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (
      marks.assignment < 0 || marks.assignment > 100 ||
      marks.finalExam < 0 || marks.finalExam > 100
    ) {
      return res.status(400).json({ message: "Marks must be between 0 and 100" });
    }
    const totalMarks = (marks.assignment/100*40 + marks.finalExam/100*60);
        let gradeLetter, gpa;

    if (totalMarks >= 85) {
      gradeLetter = "A+";
      gpa = 4.0;
    } else if (totalMarks >= 70) {
      gradeLetter = "A";
      gpa = 4.0;
    } else if (totalMarks >= 65) {
      gradeLetter = "B+";
      gpa = 3.7;
    } else if (totalMarks >= 55) {
      gradeLetter = "B";
      gpa = 3.5;
    } else if (totalMarks >= 45) {
      gradeLetter = "C+";
      gpa = 3.0;
    } else if (totalMarks >= 40) {
      gradeLetter = "C";
      gpa = 2.0;
    } else {
      gradeLetter = "F";
      gpa = 0.0;
    }
    const subjectData=await Subject.findOne({name:subject,lecturer: lecturerId});
      if (!subjectData) {
      return res.status(404).json({ message: "Subject not found" });
    }
    const credit = subjectData.credit;
    const gpaPoint = gpa * credit;
    const newGrade = new Grade({
      student,
      subject:subjectData._id,
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

//update grade
export const updateGrade = async(req,res)=>{
  try {
    const lecturerId = req.user._id;
    const {id}= req.params;
    const {student, subject, marks, gradeLetter, gpaPoint}=req.body;
    const grade= await Grade.findById(id)
    if(!grade){
      return res.status(404).json({message:"grade not found"})
    }
    if (grade.lecturer.toString() !== lecturerId.toString()){
      return res.status(403).json({message:"you don't have access"})
    }

    if(student) grade.student=student;
    if(subject) grade.subject=subject;
    if(marks) grade.marks=marks;
    if(gradeLetter) grade.gradeLetter=gradeLetter;
    if(gpaPoint) grade.gpaPoint=gpaPoint;

    const updatedGrade = await grade.save();
    res.status(200).json({message:"grade updated",updatedGrade:updatedGrade})

  } catch (error) {
    console.error("Error updating grade:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
