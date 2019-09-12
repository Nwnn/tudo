import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { UserModel, TaskModel } from './db';
import { UserDocument } from './interface';


passport.use(new LocalStrategy(async (userId, password, done) => {
    try {
        const user = await UserModel.findOne({ userId: userId })

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
    return done(null, user.userid)

})

passport.deserializeUser(async (userId: number, done) => {
    try {
        const user = await UserModel.findOne({ userId: userId })
        return done(null, user);

    } catch (error) {
        return done(error, false);

    }

})

export default passport