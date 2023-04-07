const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

GITHUB_CLIENT_ID = "Iv1.c07f4225b135f515";
GITHUB_CLIENT_SECRET = "c730d738dfadc11fad721831f39947f50c24db71";

FACEBOOK_APP_ID = "232417256006953";
FACEBOOK_APP_SECRET = "0fafbc8f9e12ccfa47ed633ec0860c10";

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
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