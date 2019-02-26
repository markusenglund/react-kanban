import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as SamlStrategy} from "passport-saml";
import dotenv from "dotenv";
import authConfig from "./authConfig";
import createWelcomeBoard from "./createWelcomeBoard";

dotenv.config();

const configurePassport = db => {
  const users = db.collection("users");
  const boards = db.collection("boards");

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  passport.deserializeUser((id, cb) => {
    users.findOne({ _id: id }).then(user => {
      cb(null, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, cb) {
      let profile={id:username+password,displayName:username}
      users.findOne({ name: username }).then(user => {
        if (user) {
          cb(null, user);
        } else {
          const newUser = {
            _id: profile.id,
            name: profile.displayName,
            imageUrl: null
          };
          users.insertOne(newUser).then(() => {
            boards
              .insertOne(createWelcomeBoard(profile.id))
              .then(() => cb(null, newUser));
          });
        }
      });
    }
  ));
  let {saml: samlConfig, profileExtractor} = authConfig();
  passport.use(new SamlStrategy(
    samlConfig,
    (profile, done)=>{
      profile = {
        id: profile[profileExtractor.id],
        firstName: profile[profileExtractor.firstName],
        lastName: profile[profileExtractor.lastName],
        mail: profile[profileExtractor.mail],
      };
      users.findOne({ _id: profile.id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          const newUser = {
            _id: profile.id,
            name: profile.firstName + " " + profile.lastName,
            mail: profile.mail,
            imageUrl: null
          };
          users.insertOne(newUser).then(() => {
            boards
              .insertOne(createWelcomeBoard(profile.id))
              .then(() => done(null, newUser));
          });
        }
      });
    }
  ))
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET,
        callbackURL: `${process.env.ROOT_URL}/auth/twitter/callback`
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
            users.insertOne(newUser).then(() => {
              boards
                .insertOne(createWelcomeBoard(profile.id))
                .then(() => cb(null, newUser));
            });
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
        callbackURL: `${process.env.ROOT_URL}/auth/google/callback`
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
            users.insertOne(newUser).then(() => {
              boards
                .insertOne(createWelcomeBoard(profile.id))
                .then(() => cb(null, newUser));
            });
          }
        });
      }
    )
  );
};

export default configurePassport;
