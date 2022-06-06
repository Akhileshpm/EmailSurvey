import passport from 'passport';
import mongoose from 'mongoose';
import { Strategy } from 'passport-google-oauth20';
import keys from '../config/keys.js';
const GoogleStrategy = Strategy;

const User = mongoose.model('users');
// console.log('hi',keys)
passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const USER = await User.findById(id);
  done(null, USER);
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const oldUser = await User.findOne({ googleId: profile.id });

        if(oldUser){
            done(null, oldUser);
        }
        else{
            const newUser = await new User({
                    googleId: profile.id,
                    name: profile.displayName
                }).save();
            done(null, newUser);
        }
    })
);
export default passport;