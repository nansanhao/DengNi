var _ = require('lodash');
var nodemailer = require('nodemailer');

var config = {
    host: 'smtp.qq.com',
    port: 465,
    secureConnection: true,
    auth: {
        user: '389746614@qq.com',
        pass: 'mzmulpznkocdbhfa'
    }
};

var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: '等你<389746614@qq.com>',
    text: 'test text',
};

module.exports = function(mail){
    // 应用默认配置
    mail = _.merge({}, defaultMail, mail);

    // 发送邮件
    transporter.sendMail(mail, function(error, info){
        if(error) return console.log(error);
        console.log('mail sent:', info.response);
    });
};
