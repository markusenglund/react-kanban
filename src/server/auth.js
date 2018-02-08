import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  (req, res) => {
    const { _id } = req.user;
    console.log("id", _id);
    res.redirect("/");
  }
);

export default router;
