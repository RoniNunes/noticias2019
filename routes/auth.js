const express =  require('express')

const router =  express.Router()
const User = require('../models/user')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const UrlLocalFacebook = 'http://localhost:3000/facebook/callback'
const UrlLocalGoogleCallBack = 'https://d9d7b76d.ngrok.io/google/callback'

const UrlfaceNgrok = 'http://89.129.121.66/facebook/callback'
const UrlgoogleNgrok = 'https://3eb9bf1b.eu.ngrok.io/google/callback'
const jwt = require('jsonwebtoken')
const jwtSecret = 'ronnyfullStackMaster2019'

router.use(passport.initialize())
router.use(passport.session())

/**DEFININDO A ESTRATÉGIA PARA LOGIN LOCAL */
passport.use(new LocalStrategy(async(username, password, done)=>{
    const user = await User.findOne({ username})

    if(user){
        const isValid = await user.checkPassword(password)
        if(isValid){
            return done(null, user)
        }else{
            return done(null, false)
        }
    }else{
        return done(null, false)
    }
}))

/**Facebook */

passport.use(new FacebookStrategy({
    
    clientID: 'xxxxxxxxxxx',
    clientSecret: 'xxxxxxx',
    callbackURL: UrlfaceNgrok,
    profileFields: ['id', 'displayName', 'email','photos'],
    scope: ['user_friends']
}, async(accessToken, refreshToken, profile, done)=>{
    const userDB = await User.findOne({facebookId: profile.id})
    if(!userDB){
        const user = new User({
            name: profile.displayName,
            facebookId: profile.id,
            roles: ['restrito']
        })
        await user.save()
        done(null, user)
    }else{
        done(null,userDB)
    }

}))


/**Google */

passport.use(new GoogleStrategy({
    clientID: 'xxxxxxx,
    clientSecret: 'pxxxxxx',
    callbackURL: UrlgoogleNgrok
}, async(accessToken, refreshToken, err, profile, done)=>{
    const userDB = await User.findOne({googleId: profile.id})
    if(!userDB){
        const user = new User({
            name: profile.displayName,
            googleId: profile.id,
            roles: ['restrito']
        })
        await user.save()
        done(null, user)
    }else{
        done(null,userDB)
    }

}))

/** */

//Enviando a informaçao a SESSAO 
passport.serializeUser((user, done)=> {
    done (null, user)
})
passport.deserializeUser((user,done)=>{
    done (null, user)
})

/*INDEPENDENTE DESTE MIDDLEWARE NAO VAI INTERROPER A EXECUÇAO DOS OTROS MIDD SEMPRE DARÁ UN NEXT() */
router.use((req, res, next)=> {
        /**if ('user' in req.session){ CHECA SE O USUARIO ESTA LOGADO */
    if (req.isAuthenticated()){
        res.locals.user = req.user
        if(!req.session.role){
            req.session.role = req.user.roles[0] 
        }
        res.locals.role = req.session.role
    }
    next()
})

router.get('/change-role/:role',(req, res )=>{
    /**CHECA SE O USUARIO ESTA LOGADO */
    if (req.isAuthenticated()){
        if(req.user.roles.indexOf(req.params.role)>=0){
            req.session.role = req.params.role
        }
    }
        res.redirect('/')
   
})
router.get('/login',(req, res)=>{
    res.render('login')
})

router.get('/logout',(req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
    
})


router.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}))


/**Estratergia Facebook */
router.get('/facebook', passport.authenticate('facebook'))
router.get('/facebook/callback',
            passport.authenticate('facebook',{failureRedirect: '/'}),
            (req,res)=>{
                res.redirect('/')
            }

)

/**Estratergia Google */
router.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile']}))
router.get('/google/callback',
            passport.authenticate('google',{failureRedirect: '/',successRedirect:'/'})

)


router.post('/jwt', async(req, res)=>{
    const { username, password }= req.body
    const user = await User.findOne({ username })
    if(user){
        const isValid = await user.checkPassword(password)
        if(isValid){
        //Gerar token
            const userToken =   {
                id: user._id,
                username: user.username
            }
            jwt.sign(userToken, jwtSecret, (err, token)=>{
                //console.log(err, token)
                res.json({ success: true, token })
            })
        }else{
            res.json({ success: false})
        }
    }else{
        res.json({ success: false})
    }
})
module.exports = router
