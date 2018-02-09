import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export default function configurePassport(db) {
  const users = db.collection("users");

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  passport.deserializeUser((id, cb) => {
    users.findOne({ _id: id }).then(user => {
      cb(null, user);
    });
  });

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET,
        callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
      },
      (token, tokenSecret, profile, cb) => {
        users.findOne({ _id: profile.id }).then(user => {
          if (user) {
            cb(null, user);
          } else {
            const newUser = {
              _id: profile.id,
              name: profile.displayName,
              imageUrl: profile._json.profile_image_url
            };
            users.insertOne(newUser).then(() => cb(null, newUser));
          }
        });
      }
    )
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:1337/auth/google/callback"
      },
      (accessToken, refreshToken, profile, cb) => {
        users.findOne({ _id: profile.id }).then(user => {
          if (user) {
            cb(null, user);
          } else {
            const newUser = {
              _id: profile.id,
              name: profile.displayName,
              imageUrl: profile._json.image.url
            };
            users.insertOne(newUser).then(() => cb(null, newUser));
          }
        });
      }
    )
  );
}
