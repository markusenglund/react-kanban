import { Router } from "express";

const router = Router();

router.post("/list", (req, res) => {
  const { listId, listTitle, listOrder, boardId } = req.body;
  console.log(listTitle);
  res.send({ success: true });
});

export default router;
