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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Github } from "lucide-react";

const patchlogData = [
    {
        title: 'Implementation Basic Gameplay',
        description: 'Gameplay available. This update is the first version. Still without the core Web3 functionality',
        date: new Date("2024-07-28"),
    },
    {
        title: 'Smart Contracts deployed to Testnet',
        description: 'Smart Contracts deployed on Arbitrum Sepolia. Token: 0xCa7Db3644ba596205c41374162B7DD62e05b4615; NFT: 0x9FF9Ca3a8421723c22aA8F9930d7377CE8d83b21; Marketplace: 0x77d97e471e804494af0F8cFfd7e8B14C56E3f827',
        date: new Date("2024-08-03"),
    },
    {
        title: 'Web3 functions',
        description: 'Implementation of mint on game completion released.',
        date: new Date("2024-08-05"),
    },
    {
        title: 'Code update',
        description: 'Updating code in preparation for new features.',
        date: new Date("2025-03-27"),
    }
];

function Patchlog() {
    return (
        <Card className="m-5 max-w-xl h-fit">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Patchlog
                </CardTitle>
                <CardDescription>
                    Here you will find a list of all changes which happened to the gameplay or the smart contract archtitecture.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog>
                    <DialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                        Details
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription className="flex items-center justify-center">
                                <p>
                                    Here you will find a list of all changes which happened to the gameplay or the smart contract archtitecture.
                                </p>
                                <Link href="https://github.com/paulsimroth/crypto_knight_app" target="_blank" aria-label='GitHub'>
                                    <Github className='py-2 w-[44px] h-[44px] object-contain cursor-pointer hover:scale-150 duration-300 transition-transform mx-4' />
                                </Link>
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <PatchlogList items={patchlogData} />
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
};

export default Patchlog;

interface PatchlogData {
    title: string;
    description: string;
    date: Date;
}

interface PatchlogProps {
    items: PatchlogData[];
}

function PatchlogList({ items }: PatchlogProps) {
    return (
        <div className="p-4 max-h-[80vh] overflow-y-auto">
            {items.map((item, index) => (
                <PatchlogItem
                    key={index}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    isLast={index === items.length - 1}
                />
            ))}
        </div>
    );
};


interface PatchlogItemProps {
    title: string;
    description: string;
    date: Date;
    isLast?: boolean;
}

function PatchlogItem({ title, description, date, isLast = false }: PatchlogItemProps) {
    return (
        <div className="flex items-center mb-8">
            <div className="flex flex-col items-center mr-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                {!isLast && <div className="w-0.5 h-full bg-blue-300 mt-1" />}
            </div>
            <div className="flex-1 h-fit border-b border-secondary">
                <div className="flex items-center justify-start gap-8">
                    <h3 className="text-lg font-semibold mb-1">{title}</h3>
                    <span className="text-xs text-gray-400">
                        {new Date(date).toLocaleDateString("en", {
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{description}</p>
            </div>
        </div>
    );
};