import { useState } from "react";
import { CubeIcon } from "@heroicons/react/24/solid";
import { PuzzlePieceIcon, DocumentIcon, Cog6ToothIcon} from "@heroicons/react/24/outline";


export default function MainLayout({children}) {
    const [active,setActive] = useState({document: true, plugin: false, settings: false})
    const handleSetActive = (e) => {
        const {id} = e.currentTarget
        if (id == 'document') {
            setActive({document: true, plugin: false, settings: false})
        } else if (id == 'plugin') {
            setActive({document: false, plugin: true, settings: false})
        } else {
            setActive({document: false, plugin: false, settings: true})
        }
    };
    return <>
        {/* Header */}
        <div className="bg-zinc-800 text-zinc-100 h-8 flex items-center justify-between">
            <div className="flex items-center">
                <CubeIcon className="text-yellow-400 ml-3" width={20} height={20}/>
                <ul className="pl-3 text-md flex space-x-3">
                    <li>
                        <label htmlFor="file-upload" className="hover:cursor-pointer hover:text-zinc-300 ">File</label>
                        <input id="file-upload" className="hidden" type="file"/>
                    </li>
                    <li className="hover:text-zinc-300 hover:cursor-pointer">Save</li>
                    <li className="pl-8"><input type="text" className="rounded-sm pl-2 bg-zinc-700" value="Hello_word.txt"/></li>
                </ul>
            </div>
            <button className="bg-yellow-400 rounded-sm text-zinc-800 px-2 font-medium mr-6">Share</button>
        </div>
        {/* Sidebar */}
        <div className="bg-zinc-800 w-10 h-screen text-center absolute">
            <div>
                <div id="document" className={`pt-2  ${ active.document ? "text-zinc-100 border-l-2 border-white" : "text-zinc-400"} `} onClick={handleSetActive}>
                    <button className={`hover:text-zinc-200 hover:cursor-pointer `}><DocumentIcon width={24} height={24}/></button>
                </div>
                <div id="plugin" className={`pt-2  ${ active.plugin ? "text-zinc-100 border-l-2 border-white" : "text-zinc-400"}`}  onClick={handleSetActive}>
                    <button className="hover:text-zinc-200 hover:cursor-pointer"><PuzzlePieceIcon width={24} height={24}/></button>
                </div>
            </div>
            <div id="settings" className={`pt-2 ${ active.settings ? "text-zinc-100 border-l-2 border-white" : "text-zinc-400"}`}  onClick={handleSetActive}>
                <button className="hover:text-zinc-200 hover:cursor-pointer"><Cog6ToothIcon width={24} height={24}/></button>
            </div>
        </div>
        <main className="pl-10">
            {children}
        </main>
    </>
};