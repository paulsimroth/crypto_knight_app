'use client';
import { Github } from "lucide-react";
import Link from "next/link";
import { event } from "@/lib/gtag";
import ContactForm from "../contact-form";

function Footer() {
    return (
        <div className="w-full h-28 bottom-0 flex items-center justify-between bg-secondary px-10">
            <div className="flex items-center justify-center gap-3 w-fit">
                <Link href="https://github.com/paulsimroth/crypto_knight_app" target="_blank" aria-label='GitHub' onClick={() => event("main_page", "github", "github_link")}>
                    <Github className='py-2 w-[44px] h-[44px] object-contain cursor-pointer hover:scale-150 duration-300 transition-transform mx-4' />
                </Link>
                <ContactForm />
            </div>
            <p className="text-center w-fit">
                built by <Link href={`${process.env.NEXT_PUBLIC_EXTERNAL_URL}/`} className="underline" target="_blank">Paul Simroth</Link>
            </p>
            <div className="flex flex-col md:flex-row items-start w-fit max-w-1/3">
                <Link href={`${process.env.NEXT_PUBLIC_EXTERNAL_URL}/imprint`} className="underline m-2" target="_blank" onClick={() => event("main_page", "legal", "imprint")}>
                    Imprint
                </Link>
                <Link href={`${process.env.NEXT_PUBLIC_EXTERNAL_URL}/datapolicy`} className="underline m-2" target="_blank" onClick={() => event("main_page", "legal", "datapolicy")}>
                    Datapolicy
                </Link>
            </div>
        </div>
    )
};

export default Footer;