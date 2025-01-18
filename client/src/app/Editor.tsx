import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from "@heroicons/react/24/solid";
import { PrinterIcon } from "@heroicons/react/24/outline";

const fontSizes = [8,9,10,11,12,14,18,24,30,36,48,60,72,96];

export default function Editor() {
    return <div className="bg-zinc-800 flex align-bottom h-10">
        <div className="flex items-center text-lg space-x-5 text-zinc-500 pl-3">
            <button><ArrowUturnLeftIcon className="font-" width={16} height={16}/></button>
            <button><ArrowUturnRightIcon width={16} height={16}/></button>
            <button><PrinterIcon width={16} height={16}/></button>
            <span>|</span>
            <select className="rounded-sm bg-zinc-700">
                <option>Arial</option>
                <option>Times New Romans</option>
                <option>Georgia</option>
            </select>
            <span>|</span>
            <div className="space-x-2">
                <button className="">-</button>
                <select className="rounded-sm bg-zinc-700">
                    {fontSizes.map((size)=> <option>{size}</option>)}
                </select>
                <button>+</button>
            </div>
            <span>|</span>
            <div className="space-x-3">
                <button className="font-bold">B</button>
                <button className="i">I</button>
                <button className="border-b-2 border-zinc-500">U</button>
                <button className="border-b-4 pb-0 border-zinc-500">A</button>
            </div>
        </div>
    </div>
};