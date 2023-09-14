const { Op } = require("sequelize")
const db = require("../../Entity")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const secretkey='jman';


const user = db.USER
const admin = db.ADMIN_TRAINING
const training = db.TRAININGS

///login
const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    const isValid = /@jmangroup\.com$/.test(email);
    if (!isValid) {
        res.send("invaild mail")
    }
    else if (!passwordRegex.test(password)){
        res.send("Passoword is weak")
    }
    else {
        try {
        
            const valid_user = await user.findOne({
                where: {
                    mail: req.body.email,
                   
                }})
                const valid=await bcrypt.compare(password,valid_user.password)
                if (valid_user.isadmin && valid) {
                    const token = jwt.sign({ userId: valid_user.id, email: valid_user.mail}, secretkey, {
                        expiresIn: '1h',
                      });
                    res.send({data:valid_user.id,message:"Admin logged",token})
                }
                else if (!valid_user.isadmin && valid)  {
                    const token = jwt.sign({ userId: valid_user.id, email: valid_user.mail}, secretkey, {
                        expiresIn: '1h',
                      });
                    res.send({data:valid_user.id,message:"User logged",token})
                }
                else{
                    res.send("Unauthorized user")
                }
            
        } catch (error) {
            res.send("user not exist")
        }
    }
}


///sign up
const create_user = async (req, res) => {
   
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    const isValid = /@jmangroup\.com$/

    try {
        if (req.body.name && req.body.email && req.body.password) {
            var { name, email, password } = req.body
            if(!passwordRegex.test(password))
            {
                res.send("Passoword is weak")
            }
            else if(!isValid.test(email))
            {
                res.send("not an organisation mail")
            }
            
            else{
                const hash= await bcrypt.hash(password, 10);
                password=hash
                console.log(password,"hello")
                await user.create({
                    name: name,
                    mail:email,
                    password: password
                });

                res.send({ statusCode: 200, message: 'response success' })
            }
        }
        else {
            res.send("Response failed to add to DB")
        }
    } catch (error) {
        res.send({ statusCode: 400, message: 'username or mail id already exists' })

    }}


const register_training = async (req, res) => {
    try {
        if (req.body.training_id && req.body.user_id) {

            const reg = await admin.findOne({
                where: {
                    id: req.body.training_id
                }
            }).then((data) => {
                if (data) {
                    if (data.no_of_seats > 0) {
                        data.no_of_seats = (data.no_of_seats) - 1
                        data.save()
                    }
                    else {
                        res.send({ statusCode: 200, message: "Seats unavailable" })
                    }
                }
                else {
                    res.send({ statusCode: 200, message: "Unable to fetch the data" })
                }
            }).then(
                async () => {
                    await training.create({
                        user_id: req.body.user_id,
                        training_id: req.body.training_id
                    }).then((data) => {
                        res.send({ statusCode: 200, message: "Register Data Updated successfully" })
                        console.log("added to register training table")
                    })
                })
        }
    }

    catch (error) {
        res.send({ statusCode: 400, message: "Data Unavailable in DB" })
    }
}


const training_details = async (req, res) => {
    try {
        const con_id = req.params.id;
        
        try {
            const data = await training.findAll({
                where: {
                    user_id: con_id
                }
            })
        
            if (!data) {
                res.send({ message: "Unavailable in db" })
            }
            else {
                const trainingIds = data.map(trainingObj => trainingObj.training_id);
                
                const unregistered_trainings = await admin.findAll({
                    where: {
                        id: { [Op.not]: trainingIds },
                        isdelete: false
                    }
                }).then((data) => {
                    res.send(data)
                })
            }
        }
        catch (e) {
            res.send({ message: "error at fetching" })
           
        }

    } catch (error) {

    }

}

//view trainings
const view = async (req, res) => {
    try {
        const con_id = req.params.id;
      
        try {
            const data = await training.findAll({
                where: {
                    user_id: con_id
                }
            })
            
            if (!data) {
                res.send({ message: "Unavailable in db" })
            }
            else {
                const trainingIds = data.map(trainingObj => trainingObj.training_id);
                
                const unregistered_trainings = await admin.findAll({
                    where: {
                        id: { [Op.in]: trainingIds },
                        isdelete: false
                    }
                }).then((data) => {
                    res.send(data)
                })
            }
        }
        catch (e) {
            res.send({ message: "error at fetching" })
           
        }

    } catch (error) {
        res.send({ message: 'msg from catch' })

    }
}

//unenroll training
const unregister=async(req,res)=>{
    console.log("unregister",req.body)
    if(req.body)
    {
        try{
            const unreg=await training.destroy({
                where:{
                    training_id:req.body.training_id,
                    user_id:req.body.user_id
                }
            }).then((data)=>{
                if(data){
                    res.send("unregistered successfully")
                }
                else{
                    res.send("Failed to unregister")
                }
            }).then(
            async()=>
                {
                const training_table=await admin.findOne({
                    where:{
                        id:req.body.training_id
                    }
                }).then((data)=>{
                   
                    data.no_of_seats=data.no_of_seats+1
                    data.save()
                    
                })
            })
        }
        catch(e)
        {
            res.send("unable to fetch from database")
        }
    }


}

module.exports = {
    login,
    create_user,
    register_training,
    training_details,
    view,
    unregister
};