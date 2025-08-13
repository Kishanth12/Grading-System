import generateToken from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from 'bcrypt'
import Subject from './../../models/subject.model.js';
import Lecturer from "../../models/lecturer.model.js";
import Student from "../../models/student.model.js";


//admin login
export const adminLogin = async(req,res)=>{
    try {
        const {email,password}= req.body;
        console.log("Incoming login:", email, password);
        const user =await User.findOne({email, role:"admin"})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isPasswordCorrect= await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"})
        }
        generateToken(user._id,res)

        
    res.status(200).json({
      _id:user._id,
      fullName: user.fullName,
      role:user.role,
      email: user.email,
      profilePic :user.profilePic,

  });
    } catch (error) {
       console.log("Error in login controller",error.message)
       return res.status(500).json({message:"Internal server error"})
    }
}


//logout
export const logout= async(req,res)=>{
    try {
        res.cookie('jwt','',{maxAge:0})
        res.status(200).json({message:"logout successfully"})
    } catch (error) {
        console.log("Error in login controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}


//add student
export const addStudent=async(req,res)=>{
    try {
        const{userId}=req.params
        const{admissionNo,batch,department}= req.body;

    if(!admissionNo|| !batch || !department)
      {
        return res.status(400).json({message:"All fields are required"})
      }
    const user= await User.findById(userId)
    if(!user){
     return res.status(400).json({message:"User Not Found"})
    }
    if (user.role !== 'student') {
      return res.status(400).json({ message: 'User role is not student' });
    }
   
    
    const existingStudent = await Student.findOne({ userId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student details already added' });
    }
    const subjects = await Subject.find({ department, batch });
    const subjectIds = subjects.map((subj) => subj._id);

    const newStudent = new Student({
      userId,
      admissionNo,
      batch,
      department,
      subjects: subjectIds, 
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student details added', student: newStudent });

    } catch (error) {
      console.log("Error in addStudent controller",error.message)
        return res.status(500).json({message:"Internal server error"})  
    }

}


//list
export const listStudents= async (req,res)=>{
  try {
    const allStudents =await Student.find({}).select('-subjects -grades -totalGpaPoint')
    if(allStudents.length == 0){
      return res.status(400).json({message:"no Students"})
    }
    res.status(200).json({allStudents})
  } catch (error) {
     console.log("Error in ListStudent controller",error.message)
    return res.status(500).json({message:"Internal server error"})  
  }
}


//delete Student
export const deleteStudent =async(req,res)=>{
    try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (student.userId) {
      await User.findByIdAndDelete(student.userId);
    }

    await student.deleteOne();

    res.status(200).json({ message: "Student and associated user deleted successfully" });
  } catch (error) {
    console.log("Error in RemoveStudent controller",error.message)
    return res.status(500).json({message:"Internal server error"})
  }
}

//update student
export const updateStudent = async (req,res)=>{
  try {
    const {id}= req.params;
    const { admissionNo, batch, department} = req.body;
    const student = await Student.findById(id)
  if(!student){
      return res.status(400).json({message:"Student Not Found"})
    }
  if (admissionNo) student.admissionNo = admissionNo;
  if (batch) student.batch = batch;
  if (department) student.department = department;

  const updatedStudent = await student.save();
  res.status(200).json({ message: "Student Updated Successfully", student: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//add lecturer
export const addLecturer= async(req,res)=> {
  try {
    const{userId}=req.params;
    const{lecturerId,department}=req.body;

    if(!lecturerId|| !department)
      {
        return res.status(400).json({message:"All fields are required"})
      }
    const user = await User.findById(userId)
    if(!user){
      return res.status(400).json({message:"User not Found"})
    }
     if (user.role !== 'lecturer') {
      return res.status(400).json({ message: 'User role is not lecturer' });
    }
   
    const existLecturer = await Lecturer.findOne({userId})
    if(existLecturer){
      return res.status(400).json({message:"Lecturer already added"})
    }
    const assignedSubjects = await Subject.find({lecturerId})
    const subjectIds= assignedSubjects.map((sub)=>sub._id)

    const students = await Student.find({subjects: { $in: subjectIds } }).select("_id");

    const studentIds = students.map(s => s._id)

    const newLecturer = new Lecturer({
      userId,
      lecturerId,
      department,
      assignedSubjects:subjectIds,
      students:studentIds
    })
    await newLecturer.save()
    res.status(201).json({ message: 'Lecturer details added', lecturer: newLecturer });


  } catch (error) {
    console.log("Error in addLecturer controller",error.message)
    return res.status(500).json({message:"Internal server error"})
  }
}


//list
export const listLecturer=async(req,res)=>{
  try {
    const allLecturers= await Lecturer.find({})
    .select('-assignedSubjects')
    .populate('userId', 'fullName');
  if(allLecturers.length == 0){
      return res.status(400).json({message:"Error in Get Lecturer"})
    }
    res.status(200).json(allLecturers)
  } catch (error) {
    console.log("Error in List Lecturer controller",error.message)
    return res.status(500).json({message:"Internal server error"})   
  }
}


//delete lecturer
export const deleteLecturer= async(req,res)=>{
  try {
    const lecturer= await Lecturer.findById(req.params.id)
    if(!lecturer){
      return res.status(404).json({ message: "lecturer not found" });
    }
    if (lecturer.userId) {
      await User.findByIdAndDelete(lecturer.userId);
    }

    await lecturer.deleteOne();

    res.status(200).json({ message: "Lecturer and associated user deleted successfully" });
  } catch (error) {
    console.log("Error in Delete Lecturer controller",error.message)
    return res.status(500).json({message:"Internal server error"})
  }
}

//update lecturer
export const updateLecturer= async(req,res)=>{
try {
  const{lecturerId,department,assignedSubjects}=req.body;
  const{id}=req.params;
  const lecturer =await Lecturer.findById(id);
  if(!lecturer){
    return res.status(404).json({message:"Lecturer Not Found"})
  }
  if (lecturerId) lecturer.lecturerId = lecturerId;
  if (department) lecturer.department = department;
  if (assignedSubjects){
   lecturer.assignedSubjects = assignedSubjects;

  const students = await Student.find({subjects: { $in: assignedSubjects },}).select("_id");

  const studentIds = students.map((s) => s._id);
  lecturer.students = studentIds;
  }
  
  const updatedLecturer = await lecturer.save();
  res.status(200).json({ message: "Lecturer Updated Successfully", lecturer: updatedLecturer });

} catch (error) {
   console.error("Error updating Lecturer:", error.message);
  res.status(500).json({ message: "Internal Server Error" });
}}
