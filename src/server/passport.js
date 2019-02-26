import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as SamlStrategy, SamlConfig } from "passport-saml";
import createWelcomeBoard from "./createWelcomeBoard";

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


  let authObj = {authentication: {
    required: true,
    secret: process.env.SECRET_KEY || 'bLue5tream@2018', // Don't use static value in production! remove from source control!
    saml: {
        entryPoint: process.env.SAML_ENTRY_POINT || 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php',
        issuer: process.env.SAML_ISSUER || 'http://localhost:3000/metadata.xml',
        callbackUrl: process.env.SAML_CALLBACK_URL || 'http://localhost:1337/metadata.xml/callback',
        authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows',
        identifierFormat: undefined,
        signatureAlgorithm: 'sha1',
        acceptedClockSkewMs: -1,
    },
    profileExtractor: {
        id: process.env.PROFILE_EXTRACTOR_ID || 'id',
        firstName: process.env.PROFILE_EXTRACTOR_FIRST_NAME || 'givenName',
        lastName: process.env.PROFILE_EXTRACTOR_LAST_NAME || 'surName',
        mail: process.env.PROFILE_EXTRACTOR_MAIL || 'mail',
    },
}};


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

  passport.use(new SamlStrategy(
    {
      entryPoint: process.env.SAML_ENTRY_POINT || 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php',
      issuer: process.env.SAML_ISSUER || 'http://localhost:1337/metadata.xml',
      callbackUrl: process.env.SAML_CALLBACK_URL || 'http://localhost:1337/auth/saml/callback',
      authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows',
      identifierFormat: undefined,
      signatureAlgorithm: 'sha1',
      acceptedClockSkewMs: -1,
    },
    (profile, done)=>{
      users.findOne({ _id: profile.id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          console.log(profile);
          const newUser = {
            _id: profile.uid,
            name: profile.nameID,
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
