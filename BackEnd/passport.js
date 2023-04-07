const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

GITHUB_CLIENT_ID = "68306d9b6d38d6979e04";
GITHUB_CLIENT_SECRET = "562e94a5d0ffac4cbab71d5605ec0c482cceb2ee";

FACEBOOK_APP_ID = "232417256006953";
FACEBOOK_APP_SECRET = "0fafbc8f9e12ccfa47ed633ec0860c10";
  
// GitHub authentication strategy
passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/github/callback", // Update this line
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// Facebook authentication strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:4000/api/auth/facebook/callback", // Update this line
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});