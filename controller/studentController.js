import Student from "../models/student.js"


export function getStudent (req,res){
    Student.find().then(
        (students) => {
            res.json({
                list : students
            })
        }
    )
}

export function createStudent (req,res){
    const student = new Student(req.body)
    student.save().then(() => {
       res.json({
           message : "Student created successfully"
       })
    }).catch(() => {
       res.json({
           message : "Student creation failed"
       })
    })
   }

   
   export function deleteStudent (req,res){
    Student.deleteOne({Name : req.body.Name}).then(
        () => {
            res.json({
                message : "Student deleted successfully"
            })
        }
    ).catch(() => {
        res.json({
            message : "Student deletion failed"
        })
    })
}