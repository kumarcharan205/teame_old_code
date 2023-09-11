const { Op } = require("sequelize")
const db = require("../../Entity")
const user = db.USER
const admin = db.ADMIN_TRAINING
const training = db.TRAININGS


const create_user = async (req, res) => {

    try {
        if (req.body.username && req.body.mailid && req.body.password) {
            const { username, mailid, password } = req.body
            console.log("req body", req.body)

            await user.create({
                name: username,
                mail: mailid,
                password: password,
            });

            res.send({ statusCode: 200, message: 'response success' })

        }
        else {
            res.send("Response failed to add to DB")
        }
    } catch (error) {
        res.send({ statusCode: 400, message: 'username or mail id already exists' })

    }
}

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
                async () => 
                {
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
        console.log("params", con_id)
        try {
            const data = await training.findAll({
                where: {
                    user_id: con_id
                }
            })
            debugger
            console.log('data',data,typeof(data))
            
            if (!data) {
                res.send({ message: "Unavailable in db" })
            }
            else{
            const trainingIds = data.map(trainingObj => trainingObj.training_id);
            console.log("hello", trainingIds)
            const unregistered_trainings = await admin.findAll({
                where: {
                    id: { [Op.not]: trainingIds },
                    isdelete:false
                }
            }).then((data) => {
                res.send(data)
            })}
        }
        catch (e) {
            res.send({ message: "error at fetching" })
            console.log("abcd efg")
            console.log(e)
        }

    } catch (error) {

    }

}

//view trainings
const view=async(req,res)=>{
    try {
        const con_id = req.params.id;
        console.log("view_training_params", con_id)
        try {
            const data = await training.findAll({
                where: {
                    user_id: con_id
                }
            })
            debugger
            console.log('data',data,typeof(data))
            
            if (!data) {
                res.send({ message: "Unavailable in db" })
            }
            else{
            const trainingIds = data.map(trainingObj => trainingObj.training_id);
            console.log("hello", trainingIds)
            const unregistered_trainings = await admin.findAll({
                where: {
                    id: { [Op.in]: trainingIds },
                    isdelete:false
                }
            }).then((data) => {
                res.send(data)
            })}
        }
        catch (e) {
            res.send({ message: "error at fetching" })
            console.log("abcd efg")
            console.log(e)
        }

    } catch (error) {
        res.send({message:'msg from catch'})

    }
}


module.exports = {

    create_user,
    register_training,
    training_details,
    view,
};