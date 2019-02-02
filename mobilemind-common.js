
var httpRequest = require("http/http-request")

var application = require('application')
var pushRegisterUrl = 'http://push.mobilemind.com.br/apps/register'
var mailServerUrl = 'http://www.mobilemind.com.br/mailServer/sendEmail'
// args = {url:, data: , errorCallback, successCallback}
/* data

  var data = {
    appId: ,
    appDebug: true/false,
    appHash: token,
    appUserEmail: ,
    appUserName: ,
    os: android, ios, windows,
  }

*/
exports.pushSign = function(args){

  var url = args.url || pushRegisterUrl

  if(args.debug)
    console.log("### push register url = " + url + " - " + JSON.stringify(args.data))

  httpRequest.request({ 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },      
    url: args.url,
    method: 'POST',
    timeout: 20 * 1000,      
    content: JSON.stringify(args.data)
  }).then(function(response){

    if(args.debug){
      console.log("## register push statusCode=" + response.statusCode)
      console.log("## register push content=" + response.content)
    }

    if(response.statusCode != 200){          
      console.log('### error on register push device: ')
      if(args.errorCallback)
        args.errorCallback(response)
    }else{
      console.log("### register push device success!")
      if(args.successCallback)
        args.successCallback(response)
    }

  }).catch(function(error){
    console.log("### push register error " + error)
    if(args.errorCallback)
      args.errorCallback(error)
  })  
}

// args = {errorCallback, successCallback, data}
/* data
  var email = {
    subject: ,
    body: ,
    fromName: ,
    to: ,
    application: 
  }

*/
exports.sendEmail = function(args){

  if(args.debug){

    console.log("send email to " + mailServerUrl)
    //console.log("send email content " + JSON.stringify(args.data))

  }

  httpRequest.request({
    url: mailServerUrl,
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 5 * 1000,
    content: JSON.stringify(args.data)
  })
  .then(function(response){

    if(args.debug){
      console.log('call send email statusCode = ' + response.statusCode)
      console.log('call send email content = ' + response.content)
    }

    if(response.statusCode != 200){
      console.log("## response=" + JSON.stringify(response))
      
      console.log("sendEmail.errorCallback")
      if(args.errorCallback)
        args.errorCallback(response)

    }else{
      console.log("sendEmail.successCallback")
      if(args.successCallback)
        args.successCallback(response)
    }
  }, function(error){
    console.log("### send error " + error)
    if(args.errorCallback)
      args.errorCallback(error)
  })  

  if(args.sleep){
    if(application.android){
      java.lang.Thread.sleep(2000)
    }else{
      NSThread.sleepForTimeInterval(0.2)
    }
  }



}
