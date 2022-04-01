const userDB = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    //validating the request
    //if form is not filled i.e. if body is empty
    if (!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    //if body is not empty then creating a new user
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });


    //saving data in database
    user.save(user).then(data => { 
        // res.send(data);
        res.redirect('/add-user')
    });
};


//get all users or a single user based on id
exports.find = (req, res) => {
    if(req.query.id) {
        const id = req.query.id;
        userDB.findById(id)
            .then(data => {
                if(!data){
                    return res
                        .status(404)
                        .send({message: "User not found with id " + id});
                }
                else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({message: err.message || "Some error occurred while retrieving user."});
            });
    }
    else {
        userDB.find().then(data => { res.send(data) })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
        });
    }
};


//updating user based on id
exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({message: "User content can not be empty"});
    }

    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body)
        .then(data => {
            if(!data){
                return res
                    .status(404)
                    .send({message: "User not found with id " + id});
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while updating the user."});
        });
};


//deleting user based on id
exports.delete = (req, res) => {
    const id = req.params.id;
    userDB.findByIdAndRemove(id)
        .then(data => {
            if(!data){
                return res
                    .status(404)
                    .send({message: "User not found with id " + id});
            }
            else {
                res.send({message: "User deleted successfully!"});
            } 
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while deleting the user."});
        });
};