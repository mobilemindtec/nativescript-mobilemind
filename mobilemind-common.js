

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

  console.log("### push register url = " + url + " - " + JSON.stringify(args.data))

  fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },      
    timeout: 20 * 1000, // 20 seg
    body: JSON.stringify(args.data),

  }).then(function(response){

    console.log("##### register push called")

    if(!response.ok){          
      console.log('### error on resgister push device: ' + JSON.stringify(response))
      if(args.errorCallback)
        args.errorCallback(response)
    }else{
      console.log("### register push device success!")
      if(args.successCallback)
        args.successCallback(response)
    }

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

  fetch(mailServerUrl, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args.data)
  })
  .then(function(response){

    console.log('call send email')

    if(!response.ok){
      console.log("## response=" + JSON.stringify(response))
      
      console.log("sendEmail.errorCallback")
      if(args.errorCallback)
        args.errorCallback(response)

    }else{
      console.log("sendEmail.successCallback")
      if(args.successCallback)
        args.successCallback(response)
    }
  })  


}