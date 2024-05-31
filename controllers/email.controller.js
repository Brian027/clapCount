const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
dotenv.config();

const Email = (options) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.error(err);
            // Vous pouvez également renvoyer une réponse HTTP ici si nécessaire
        }
    });
};

const sendEmail = (req, res) => {
    try {
        const { email, subject, message } = req.body;

        // Vérification des données s'il y a des champs vides
        if (!email || !subject || !message) {
            return res.status(400).json({ message: 'Veuillez renseigner tous les champs' });
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).json({ message: 'L\'email est invalide' });
        } else {
            // Envoi du mail
            Email({
                from: {
                    name: `${email} vous a envoyé un message`,
                },
                to: process.env.SMTP_MAIL,
                subject: subject,
                text: message,
                replyTo: email,
            });

            // Envoyer une réponse HTTP réussie si nécessaire
            return res.status(200).json({ message: 'Votre message a bien été envoyé.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

module.exports = { sendEmail };