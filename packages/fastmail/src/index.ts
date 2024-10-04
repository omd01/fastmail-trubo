import * as nodemailer from "nodemailer";


type MailConfigParams = {
    host: string;
    port: number;
    secure?: boolean;
    auth: {
        user: string;
        pass: string;
    };
};


type AttachmentParams = {
    filename: string;
    path: string;
    cid?: string;
};

type MailParams = {
    from: string;
    to: string;
    subject: string;
    text?: string;
    template?: string;
    attachments?: AttachmentParams[];
};
type SendMailResponse = {
    success: boolean;
    error?: string;
};


export const createMailTransport = ({ host, port, secure, auth }: MailConfigParams) => {
    const transport = nodemailer.createTransport({
        host: host,
        port: port,
        secure: secure, // true for 465, false for other ports
        auth: {
            user: auth.user,
            pass: auth.pass,
        },
    });

    return transport;
};



export const sendMail = async (
    transport: nodemailer.Transporter,
    { from, to, subject, text, template, attachments }: MailParams
): Promise<SendMailResponse> => {
    try {
        await transport.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: template,
            attachments: attachments, // Optional attachments
        });

        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
};