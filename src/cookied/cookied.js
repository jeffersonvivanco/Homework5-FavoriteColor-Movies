/**
 * Created by jeffersonvivanco on 10/22/16.
 */
var uuid = require('node-uuid');

// manageSession and parseCookies

var f = {
    uuid : require('node-uuid'),
    parseCookies : function (req, res, next) {
        if (req) {
            var Cookie = '';
            if(req.get('Cookie')!=undefined)
                Cookie = req.get('Cookie').split('=');
            else{
                Cookie = 'sessionId='+uuid.v4();
            }
            if(!req.hasOwnProperty('hwCookies')){
                req.hwCookies = {};
            }
            var CookieObj = {};
            for(var i=0; i<Cookie.length; i = i+2){
                CookieObj[Cookie[i]] = Cookie[i+1];
            }

            for (var name in CookieObj) {
                req.hwCookies[name] = CookieObj[name];
            }
            next();
        }
    },
    manageSession : function (req, res, next) {
        if(!this.hasOwnProperty('sessionStore')){
            this.sessionStore = {};
        }
        if(req){
            if(!req.hasOwnProperty('hwSession')){
                req['hwSession'] = {};
            }
            if(req.hwCookies.hasOwnProperty('sessionId') && this.sessionStore[req.hwCookies['sessionId']]){
                req.hwSession = this.sessionStore[req.hwCookies['sessionId']];
                req.hwSession['sessionId'] = req.hwCookies['sessionId'];
            }
            else{
                var newSessionId = uuid.v4();
                this.sessionStore[newSessionId] = {};
                res.append('Set-Cookie', 'sessionId ='+newSessionId);
                req.hwSession  = this.sessionStore[newSessionId];
                req.hwSession['sessionId'] = newSessionId;
            }

            next();
        }
    }

};

module.exports = f;
