import passport from "passport";
import { Strategy } from "passport-twitter";

export default function configurePassport(db) {
  const users = db.collection("users");

  passport.serializeUser((user, done) => {
    console.log("serialize user");
    done(null, user);
  });
  passport.deserializeUser((id, done) => {
    console.log("deserialize user");
    users.findOne({ _id: id }).then(user => done(null, user));
  });

  passport.use(
    new Strategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET,
        callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
      },
      (token, tokenSecret, profile, done) => {
        console.log("twitter-strategy callback");
        users.findOne({ _id: profile.id }).then(user => {
          if (user) {
            done(null, user);
          } else {
            const newUser = {
              _id: profile.id,
              name: profile.displayName,
              imageUrl: profile._json.profile_image_url
            };
            users.insertOne(newUser).then(() => done(null, newUser));
          }
        });
      }
    )
  );
}
