import Subject from "../../models/subject.model";
import Lecturer from './../../models/lecturer.model';
import Grade from './../../models/grade.model';

export const addSubject = async (req, res) => {
  try {
    const { subCode, name, credit, semester, department, lecturerId, schedule } = req.body;

    if (!subCode || !name || !credit || !semester || !department) {
      return res.status(400).json({ message: "Required fields: subCode, name, credit, semester, department" });
    }

    const existing = await Subject.findOne({ subCode });
    if (existing) {
      return res.status(409).json({ message: "Subject with this code already exists." });
    }

    let lecturer = null;
    if (lecturerId) {
      lecturer = await Lecturer.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: "Lecturer not found." });
      }
    }
    const subject = new Subject({
      subCode,
      name,
      credit,
      semester,
      department,
      lecturer: lecturer ? lecturer._id : null,
      schedule: schedule || {}
    });

    await subject.save();
    res.status(201).json({ message: "Subject added successfully", subject });
  } catch (error) {
    console.error("Error adding subject:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//listSubject
export const listSubject =async(req,res)=>{
  try {
    const subjects = await Subject.find({}).select('-lecturer -schedule')
    if(subjects.length == 0){
      return res.status(400).json({message:"No Subjects"})
    }
    res.status(200).json({subjects:subjects})
  } catch (error) {
    console.error("Error in get subject:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

//edit
export const editSubject = async (req,res)=>{
  try {
    const{id} = req.params;
    const {subCode, name, credit, semester, department, lecturerId, schedule} =req.body;
    const subject = await Subject.findById(id)
    if(!subject){
      return res.status(404).json({message:"SubjectNot Found"})
    } 
    if(subCode) subject.subCode =subCode;
    if(name) subject.name =name;
    if(credit) subject.credit =credit;
    if(semester) subject.semester =semester;
    if(department) subject.department =department;
    if(lecturerId) subject.lecturerId =lecturerId;
    if(schedule) subject.schedule =schedule;

    const updateSubject = await subject.save();
    res.status(200).json({message:"Subject Updated Successfully" ,updateSubject:updateSubject})
  } catch (error) {
    console.error("Error in Update subject:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

//delete
export const deleteSubject = async (req,res)=>{
    try{
    const {id} = req.params;
    const deleted = await Subject.findByIdAndDelete(id)

    if(!deleted){
      return res.status(404).json({message:"subject not found"})
    }

    res.status(200).json({message:"subject deleted Successfully"})
}catch(error){
    console.error("Error deleting subject:", error.message);
    res.status(500).json({ message: "Server error" });
}
}

//list grade
export const listGrade = async (req,res)=>{
  try {
    const grades = await Grade.find({})
      .populate("student", "fullName admissionNo department batch")         
      .populate("subject", "name subCode")     
      .populate("lecturer", "fullName");  
    if(grades.length == 0){
      return res.status(404).json({grades:[],message:"Grades not found"})
    }
    res.status(200).json({grades:grades})
  } catch (error) {
    console.error("Error get grade:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}
//calculate total gpa
export const totalGpa= async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}
