'use client';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { event } from "@/lib/gtag";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Asterisk, Loader2, Mail, Send } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { sendForm } from "@/lib/nodemailer";

const initValues = {
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
};

const initFormState = { values: initValues };

function ContactForm() {

    const [formState, setFormState] = useState(initFormState);
    const [processing, setProcessing] = useState<boolean>(false);
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

    const { values } = formState;

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormState((prev) => ({
        ...prev,
        values: {
            ...prev.values,
            [target.name]: target.value,
        },
    }));

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        event("submitContactForm", "user_interaction", "submitContactForm");
        setProcessing(true);
        setFormState((prev) => ({
            ...prev,
        }))
        try {
            await sendForm(values);
            setFormState(initFormState);
            toast.success("Success!",{
                description: "Thank you for your message!"
            })
        } catch (error: unknown) {
            toast.error("ERROR!", {
                description: "Failed to submit message! Please try again.",
            });
            setFormState((prev) => ({
                ...prev,
                error,
            }));
        } finally {
            setProcessing(false);
            setAcceptTerms(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md flex items-center justify-center w-fit gap-2 group">
                <span>Contact</span><Mail className="w-5 h-5 group-hover:scale-110 duration-500" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Contact</DialogTitle>
                    <DialogDescription>
                        Reach out with any questions and feedback you might have!
                    </DialogDescription>
                </DialogHeader>
                <form id="contact-form">
                    <div className='w-full flex flex-row items-center justify-between gap-2 m-1'>
                        <div className="w-full h-fit">
                            <p className="px-3 flex items-center justify-start my-2">
                                Name
                                <Asterisk className="text-destructive w-5 h-5" />
                            </p>
                            <Input
                                className='w-full rounded-lg text-md'
                                name="user_name"
                                type="text"
                                placeholder="Your Name"
                                value={values.user_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full h-fit">
                            <p className="px-3 flex items-center justify-start my-2">
                                Email
                                <Asterisk className="text-destructive w-5 h-5" />
                            </p>
                            <Input
                                className='w-full rounded-lg text-md'
                                name="user_email"
                                type="email"
                                placeholder="example@mail.com"
                                value={values.user_email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full m-1">
                        <p className="px-3 flex items-center justify-start my-2">
                            Subject
                            <Asterisk className="text-destructive w-5 h-5" />
                        </p>
                        <Input
                            className='w-full rounded-lg text-md my-1'
                            name="subject"
                            type="text"
                            placeholder="Your Subject"
                            value={values.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full m-1">
                        <p className="px-3 flex items-center justify-start my-2">
                            Message
                            <Asterisk className="text-destructive w-5 h-5" />
                        </p>
                        <Textarea
                            className='w-full min-h-[250px] rounded-lg text-md'
                            name="message"
                            placeholder="Your Message"
                            value={values.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        {!processing ?
                            <Button
                                type="submit"
                                className="m-1 group"
                                aria-label='Send'
                                disabled={!values.user_name || !values.user_email || !values.subject || !values.message || !acceptTerms}
                                onClick={onSubmit}
                            >
                                Send
                                <Send className="w-5 h-5 group-hover:rotate-45 duration-500" />
                            </Button>
                            :
                            <Button className="cursor-progress m-1" variant="ghost" disabled>
                                Sending <Loader2 className="animate-spin mx-1" />
                            </Button>
                        }

                        <div className="flex items-center space-x-2 mx-1">
                            <Checkbox id="terms" onClick={() => setAcceptTerms(!acceptTerms)} aria-label='Accept Terms' checked={acceptTerms} />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-justify"
                            >
                                I confirm that I have read and agreed to the <Link href={`${process.env.NEXT_PUBLIC_EXTERNAL_URL}/datapolicy`} className='underline underline-offset-4 text-primary' aria-label="Link to Data Policy">Data Policy.</Link>
                            </label>
                        </div>
                    </div>
                </form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

export default ContactForm;