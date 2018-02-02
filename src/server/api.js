import { Router } from "express";

const router = Router();

router.post("/list", (req, res) => {
  const { connection } = req;
  const { listId, listTitle, listIndex, boardId } = req.body;
  console.log(listTitle);
  connection.query(
    `INSERT INTO lists (list_id, list_title, list_order, board_id)
      VALUES ('${listId}', '${listTitle}', '${listIndex}','${boardId}')`,
    (error, result) => {
      if (error) {
        res.send({ success: false });
      }
      console.log(result);
      res.send({ success: true });
    }
  );
});

export default router;
