import { useState } from "react"
import { PuzzlePieceIcon, DocumentIcon} from "@heroicons/react/24/outline"

export default function Sidebar() {
    const [active,setActive] = useState({document: true, plugin: false})

    const handleSetActive = (e) => {
        const {id} = e.currentTarget
        if (id == 'document') {
            setActive({document: true, plugin: false})
        } else {
            setActive({document: false, plugin: true})
        };
    };

    return <div className="bg-zinc-700  w-10 h-screen text-center">
        <div id="document" className={`pt-2  ${ active.document ? "text-zinc-100 border-l-2 border-white" : "text-zinc-400"} `} onClick={handleSetActive}>
            <button className={`hover:text-zinc-200 hover:cursor-pointer `}><DocumentIcon width={26} height={26}/></button>
        </div>
        <div id="plugin" className={`pt-2  ${ active.plugin ? "text-zinc-100 border-l-2 border-white" : "text-zinc-400"}`}  onClick={handleSetActive}>
            <button className="hover:text-zinc-200 hover:cursor-pointer"><PuzzlePieceIcon width={26} height={26}/></button>
        </div>
    </div>
};