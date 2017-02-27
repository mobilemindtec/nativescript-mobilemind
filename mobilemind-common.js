
var httpRequest = require("http/http-request")

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

  httpRequest({
    url: mailServerUrl,
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    content: JSON.stringify(args.data)
  })
  .then(function(response){

    console.log('call send email')

    if(!response.statusCode != 200){
      console.log("## response=" + JSON.stringify(response))
      
      console.log("sendEmail.errorCallback")
      if(args.errorCallback)
        args.errorCallback(response)

    }else{
      console.log("sendEmail.successCallback")
      if(args.successCallback)
        args.successCallback(response)
    }
  }).catch(function(error){
    console.log("### send error " + error)
    if(args.errorCallback)
      args.errorCallback(error)
  })  


}