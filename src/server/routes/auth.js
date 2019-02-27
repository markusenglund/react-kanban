import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/local", passport.authenticate("local", { failureRedirect: '/login' }), (req, res) => {
  res.redirect("/");
});

router.get("/saml", passport.authenticate("saml"), (req, res) => {
  res.redirect("/");
});
router.post("/saml", passport.authenticate("saml"), (req, res) => {
  res.redirect("/");
});

router.post(
  "/saml/callback",
  passport.authenticate("saml", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);


router.get("/signout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
