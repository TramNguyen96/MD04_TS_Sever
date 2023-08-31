import Mailgen from 'mailgen';
import Text from '../../../text'

interface MailBody{
    productName:  string;
    productWebUrl: string;
    receiverName: string;
    confirmLink: string;
    language: string;
}

function genEmailString( mailBody: MailBody) {
    var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: mailBody.productName,
        link: mailBody.productWebUrl
    }
});

var email = {
    body: {
        greeting: Text(mailBody.language).greeting,
        signature: Text(mailBody.language).signature,
        name: mailBody.receiverName,
        intro: Text(mailBody.language).intro,
        action: {
            instructions: `${Text(mailBody.language).instructionOne} ${mailBody.productName}! ${Text(mailBody.language).instructionTwo}`,
            button: {
                color: '#22BC66', // Optional action button color
                text: Text(mailBody.language).mailBtnText,
                link:  mailBody.confirmLink
            }
        },
        outro: `${Text(mailBody.language).outro}!`,
        copyright: `Copyright © 2023 ${mailBody.productName}. All rights reserved.`

    }
};

    return mailGenerator.generate(email);
}

export default genEmailString;