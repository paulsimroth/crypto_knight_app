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

const roadmapData = [
    {
        title: 'Project Kickoff',
        description: 'Initial development and MVP, deployment of Token and Marketplace contract',
        date: new Date("2024-07-01"),
    },
    {
        title: 'Release V1',
        description: 'First playable version with core web3 mechanics, addition of special items and full marketplace functionality',
        date: new Date("2024-08-01"),
    },
    {
        title: 'Marketplace Integration',
        description: 'After Implementing all other Web3 functionality the last step will be the integration of the Marketplace to buy, sell and merge items!',
        date: undefined,
    }
];

function Roadmap() {
    return (
        <Card className="m-5 w-full h-fit">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Roadmap
                </CardTitle>
                <CardDescription>
                    Find out what feature will come next.
                    Feel free to visit the Github repo and suggest your own ideas!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog>
                    <DialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                        Details
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Roadmap</DialogTitle>
                            <DialogDescription className="flex items-center justify-center">
                                Find out what feature will come next.
                                Feel free to visit the Github repo and suggest your own ideas!
                                <Link href="https://github.com/paulsimroth/crypto_knight_app" target="_blank" aria-label='GitHub'>
                                    <Github className='py-2 w-[44px] h-[44px] object-contain cursor-pointer hover:scale-150 duration-300 transition-transform mx-4' />
                                </Link>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="">
                            <RoadmapList items={roadmapData} />
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

export default Roadmap;

interface RoadmapData {
    title: string;
    description: string;
    date?: Date;
}

interface RoadmapProps {
    items: RoadmapData[];
}

function RoadmapList({ items }: Readonly<RoadmapProps>) {
    return (
        <div className="p-4 max-h-[80vh] overflow-y-auto">
            {items.map((item, index) => (
                <RoadmapItem
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


interface RoadmapItemProps {
    title: string;
    description: string;
    date?: Date;
    isLast?: boolean;
}

function RoadmapItem({ title, description, date, isLast = false }: Readonly<RoadmapItemProps>) {
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
                        {date ? new Date(date).toLocaleDateString("en", {
                            month: "long",
                            year: "numeric",
                        }) : <p>TBD</p>}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{description}</p>
            </div>
        </div>
    );
};