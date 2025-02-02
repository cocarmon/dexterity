import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from "@heroicons/react/24/solid";
import { PrinterIcon } from "@heroicons/react/24/outline";
import { useEditorHeaderStore } from "@/store/useEditorHeaderStore";

const fontSizes = [8,9,10,11,12,14,18,24,30,36,48,60,72,96];

export default function Editor({handleRender}:{handleRender:()=>void}) {
    const print = useEditorHeaderStore.use.print();

    // deprecated, but still widley supported
    const handleUndo = () => document.execCommand('undo');
    const handleRedo = () => document.execCommand('redo');

    // sets the print to the editor section only, instead of the full page
    const handlePrint = () => {
        const content = print.current?.innerHTML;

        const iframe = document.createElement("iframe");
        document.body.appendChild(iframe);

        iframe.contentDocument.open();
        iframe.contentDocument.write(`
        <html>
            <head>
            <title>Header</title>
            </head>
            <body>
            ${content}
            </body>
        </html>
        `);
        iframe.contentDocument.close();

        iframe.contentWindow.print();
        document.body.removeChild(iframe);
    };



    return <div className="bg-zinc-800 flex align-bottom h-10">
        <div className="flex items-center text-lg space-x-5 text-zinc-500 pl-3">
            <button><ArrowUturnLeftIcon className="font-" width={16} height={16} onClick={handleUndo}/></button>
            <button><ArrowUturnRightIcon width={16} height={16} onClick={handleRedo}/></button>
            <button onClick={handlePrint}><PrinterIcon width={16} height={16}/></button>
            <span>|</span>
            <div className="space-x-2">
                <button className="">-</button>
                <select className="rounded-sm bg-zinc-700">
                    {fontSizes.map((size)=> <option key={size}>{size}</option>)}
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
            <span>|</span>
            <button className="bg-yellow-400 rounded-sm text-zinc-800 px-2 font-bold text-sm" onClick={handleRender}>R</button>
        </div>
    </div>
};