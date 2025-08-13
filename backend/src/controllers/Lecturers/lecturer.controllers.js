import Lecturer from "../../models/lecturer.model.js";
import Subject from "../../models/subject.model.js";

//list students for lecturers
export const listStudents = async (req, res) => {
  try {
    const lecturerId = req.user._id;
    const lecturer = await Lecturer.findById(lecturerId)
      .populate({
        path: "students",
        select: "fullName admissionNo batch department",
        populate: {
          path: "grades",
          match: { lecturer: lecturerId },
          select: "subject gpaPoint ",
          populate: {
            path: "subject",
            select: "name code"
          }
        }
      });

    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }

    res.status(200).json({ students: lecturer.students });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get single student details
export const infoStudents = async (req, res) => {
  try {
    const lecturerId = req.user._id;
    const {id} =req.params;
    const lecturer = await Lecturer.findById(lecturerId)
      .populate({
        path: "students",
        match: { _id: id },
        select: "fullName admissionNo batch department profilePic email",
        populate: {
          path: "grades",
          match: { lecturer: lecturerId },
          select: "subject gpaPoint marks gradeLetter",
          populate: {
            path: "subject",
            select: "name code"
          }
        }
      });

    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }
    if (!lecturer.students || lecturer.students.length === 0) {
      return res.status(404).json({ message: "Student not found or not taught by this lecturer" });
    }
    res.status(200).json({ student: lecturer.students[0] });
  } catch (error) {
    console.error("Error fetching student:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get assigned subjects
export const assignedSubjects=async(req,res)=>{
    try {
    const id = req.user._id;
    const subjects = await Subject.find({lecturer:id})
    .select("name subCode credit semester department schedule")
    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: "No subjects found" });
    }
    res.status(200).json({subjects})
    } catch (error) {
    console.log("Error in subject controller",error.message)
    return res.status(500).json({message:"Internal server error"})
    }
}

