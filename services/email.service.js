(() => {

    // const emailVerificationTemplateID = 1264194;
    const mailjet = require('node-mailjet').connect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE
    );

    const sendVerificationEmail = (to, name, link) => {
        return mailjet
            .post('send', {'version': 'v3.1'})
            .request({
                "Messages":[{
                    "From": {
                        "Email": "ntbandara3@hotmail.com",
                        "Name": "Bindoo Support"
                    },
                    "To": [{
                        "Email": to,
                        "Name": name,
                    }],
                    "Subject": "Bindoo! Email Verification",
                    "TextPart": `Hi ${name}, Welcome to Bindoo! Please verify your email here!`,
                    "HTMLPart": `<p>Hi ${name},<p> <h4>Welcome to Bindoo!<h4> <p>Please verify your email <a href=\"${link}\" target=\"_blank\">here</a>!<p>`
                }]
            });
    }

    module.exports = {
        sendVerificationEmail
    }
    // const 
})();