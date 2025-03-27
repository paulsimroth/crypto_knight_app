// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";

const email = process.env.NEXT_PUBLIC_EMAIL;
const password = process.env.EMAIL_PASSWORD;
const server = process.env.EMAIL_SERVER;

const transporter = nodemailer.createTransport({
    pool: true,
    host: server,
    port: 465,
    secure: true, // use TLS
    auth: {
        user: email,
        pass: password,
    },
});

//POST Request
export async function POST(
    req: Request
) {
    const body = await req.json();
    const { user_name, user_email, subject, message } = body;

    if (!user_name || !user_email || !subject || !message) {
        return new NextResponse("Messages required!", { status: 400 });
    };

    try {
        await transporter.sendMail({
            from: email,
            to: email,
            subject: `NO-REPLY: ${subject}`,
            text: "This is a message sent from the contact form",
            html: `
                    <div style="font-family: Arial, sans-serif; max-width: 350px; margin: 5;">
                        <h1 style="color: #18BC9C; text-align: center;">Crypto Knights | Message from: ${user_name}</h1>
                        <hr style="border: 1px solid #34495E;">
                        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                            <p style="font-size: 16px;"><strong>Email:</strong> ${user_email}</p>
                            <p style="font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
                            <p style="font-size: 16px;"><strong>Message:</strong></p>
                            <p style="font-size: 14px; line-height: 1.6;">${message}</p>
                        </div>
                        <p style="color: #18BC9C; font-size: 12px; text-align: center; margin-top: 20px;">This is an automated message. Please do not reply.</p>
                    </div>
                `
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 400 });
        }
        return new NextResponse('An unknown error occurred', { status: 500 });
    };
};