const pool = require('../config/database');
const config = require('../config/config');
const bcrypt = require('bcrypt');

const adminController = {
    authenticateUser: async (req, res) => {
        try {
            const { username, password } = req.body;
        
            if (!username || !password) {
                return res.status(200).json({ success: false, message: 'Password and username are required' });
            }
        
            const hashedPassword = await bcrypt.hashSync(password, config.salt);

            if (
                config.user.username === username &&
                config.user.password === hashedPassword    
            )
                return res.status(200).json({ success: true, message: 'Authentication successful' });
                
            return res.status(200).json({ success: false, message: 'Authentication failed' });
        } catch (error) {
            console.error('Error on authentication:', error);
            return res.status(500).json({ success: false, message: 'Authentication failed' });
        }
    },

    getHashedPassword: async (req, res) => {
        try {
            const { password } = req.body;
        
            if (!password) {
                return res.status(400).json({ success: false, message: 'Password is required' });
            }
        
            const hashedPassword = await bcrypt.hashSync(password, config.salt);
        
            return res.status(200).json({ success: true, password: hashedPassword });
        } catch (error) {
            console.error('Error on hashing a password:', error);
            return res.status(500).json({ success: false, message: 'Hashing failed' });
        }
    },

    contact: async (req,res) => {
      const { name, email, message } = req.body;
      const mailOptions = {
        from: `"${name}" <${email}>`,    
        to: 'geral@simpliacoes.pt',    
        subject: 'Nova submissão de contacto',// Subject line
        text: `Recebeste uma nova submissão de contacto por ${name} (${email}).\nMensagem:\n${message}`, 
        html: `<p><b>Nome:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Mensagem:</b> ${message}</p>`, // HTML body
      };
      try {
        await config.transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
      } catch (error) {
        console.error('Error sending email:', error);
        if (error.responseCode === 550) {
          res.status(200).json({ success: false, message: 'Invalid Email' });
          return;
        }
        res.status(500).json({ success: false, message: 'Error sending message. Please try again later.' });
      }
    }
};

module.exports = adminController;
