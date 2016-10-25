/**
 * Created by jeffersonvivanco on 10/22/16.
 */
var uuid = require('node-uuid');

// manageSession and parseCookies

var f = {
    uuid : require('node-uuid'),
    parseCookies : function (req, res, next) {
        if(req.get('Cookie')!=undefined){
            var Cookie = req.get('Cookie').split(';');
            if(!req.hasOwnProperty('hwCookies')){
                req.hwCookies = {};
            }
            for(var i=0; i<Cookie.length; i++){
                var line  = Cookie[i].split('=');
                req.hwCookies[line[0]] = line[1];
            }
        }
        next();
    },
    manageSession : function (req, res, next) {
        if(!this.hasOwnProperty('sessionStore')){
            this.sessionStore = {};
        }
        if(req.hwCookies){
            if(!req.hasOwnProperty('hwSession')){
                req['hwSession'] = {};
            }
            if(req.hwCookies.hasOwnProperty('sessionId') && this.sessionStore[req.hwCookies['sessionId']]){
                req.hwSession = this.sessionStore[req.hwCookies['sessionId']];
                req.hwSession['sessionId'] = req.hwCookies['sessionId'];
                console.log('session already exists: '+req.hwCookies['sessionId']);
            }
            else{
                var newSessionId = uuid.v4();
                this.sessionStore[newSessionId] = {};
                res.append('Set-Cookie', 'sessionId='+newSessionId);
                req.hwSession  = this.sessionStore[newSessionId];
                req.hwSession['sessionId'] = newSessionId;
                console.log('session generated: '+newSessionId);
            }
        }

        else {
            var newSessionId = uuid.v4();
            this.sessionStore[newSessionId] = {};
            res.append('Set-Cookie', 'sessionId='+newSessionId);
            req.hwSession  = this.sessionStore[newSessionId];
            req.hwSession['sessionId'] = newSessionId;
            console.log('session generated: '+newSessionId);
        }



        next();
    }

};

module.exports = f;
