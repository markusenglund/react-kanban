import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

router.get("/signout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
