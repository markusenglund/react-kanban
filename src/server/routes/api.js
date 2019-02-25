import { Router } from "express";
import { ADMIN_ROLE, READ_WRITE_ROLE } from '../../constants';

const api = db => {
  const router = Router();
  const boards = db.collection("boards");
  const users = db.collection("users");

  // Replace the entire board every time the users modifies it in any way.
  // This solution sends more data than necessary, but cuts down on code and
  // effectively prevents the db and client from ever getting out of sync
  router.put("/board", (req, res) => {
    let board = req.body;
    board = {...board, changed_by: req.user._id};
    // Update the board only if the user's role in the board is admin/read-write
    boards
      .replaceOne({ _id: board._id, $or: [
        {users: {id: req.user._id, role: ADMIN_ROLE }},
        {users: {id: req.user._id, role: READ_WRITE_ROLE }}
      ]}, board, { upsert: true })
      .then(result => {
        res.send(result);
      });
  });

  router.delete("/board", (req, res) => {
    const { boardId } = req.body;
    boards.deleteOne({ _id: boardId }).then(result => {
      res.send(result);
    });
  });

  router.post("/userId", (req,res)=>{
    const {userSearchField} = req.body;
    users.findOne({name: userSearchField}).then(user=>{
      if(user)
        res.status(200).json(user._id);
      else{
        res.status(404).send("no User EXISTS with such name");
      }
    })
  })

  router.post("/userRegex", (req,res)=>{
    const {userSearchField} = req.body;
    console.log(userSearchField);
    users.findOne({'name': {'$regex': userSearchField, '$options': 'i'}}).then(user=>{
      if(user){
        res.status(200).json(user.name);
      }
      else{
        res.status(404).send("no Users EXISTS with such name");
      }
    })
  })

  return router;
};

export default api;
