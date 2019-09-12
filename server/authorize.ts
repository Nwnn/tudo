import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { UserModel, TaskModel } from './db';
import { UserDocument } from './interface';


passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await UserModel.findOne({ username: username })
        console.log(user)

        if(user !== null) {
            if(user.password === password) {
                return done(null, user);

            } else {
                return done(null, false, {message : "パスワードが間違っています"})
            }

        } else {
            return done(null, false, { message: "登録されていません"});

        }
        
    } catch (error) {
        return done(error, false);

    }

}))

passport.serializeUser((user: UserDocument, done) => {
    return done(null, user.userId)

})

passport.deserializeUser(async (userid: number, done) => {
    console.log(userid)
    try {
        const user = await UserModel.findOne({ userId: userid })
        return done(null, user);

    } catch (error) {
        return done(error, false);

    }

})

export default passport