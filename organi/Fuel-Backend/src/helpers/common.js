import nodemailer from 'nodemailer'
export const createOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
}


export const sendEmail =  (from, to, subject, text) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alok@samyotech.com',
            pass: 'cuns kaqs nbmx xvvv'
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending email:', error);
            return false

        } else {
            console.log('Email sent:', info.response);
            return true
        }
    });

}

export const generateRandom = () => {
    return Math.floor(Math.random() * 98767655) + 387866372;
}