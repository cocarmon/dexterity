import { ChangeEvent, useState,useRef, useEffect } from "react";
import { lineGenerator,Parser,render,tokenize } from "@/util/parser";
import { PuzzlePieceIcon, DocumentIcon, Cog6ToothIcon} from "@heroicons/react/24/outline";

import Header from "@/components/ui/headers/MainHeader";
import EditorHeader from "@/components/ui/headers/EditorHeader";
import { useEditorHeaderStore } from "@/store/useEditorHeaderStore";

export default function MainLayout() {
    const printRef = useRef(null);
    const previewRef = useRef(null);

    const file = useEditorHeaderStore.use.file();
    const setFile = useEditorHeaderStore.use.setFile();
    const setPrint = useEditorHeaderStore.use.setPrint();
    const [active,setActive] = useState({document: true, plugin: false, settings: false});


    useEffect(()=>{
        setPrint(printRef)
    },[printRef,setPrint]);

    const handleSetActive = (e: React.MouseEvent<HTMLDivElement>) => {
        const {id} = e.currentTarget
        if (id == 'document') {
            setActive({document: true, plugin: false, settings: false})
        } else if (id == 'plugin') {
            setActive({document: false, plugin: true, settings: false})
        } else {
            setActive({document: false, plugin: false, settings: true})
        }
    };

    const handleFileContentChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setFile(e.target.value);
    };

    const handleRender = () => {
        const tokens = []
        for (const line of lineGenerator(file)){
            const result = tokenize(line.trim());
            if (result) {
                tokens.push(result);
            }
        };
        const parser = new Parser(tokens);
        const htmlContent = render(parser.parse());
        if (previewRef.current) {
            previewRef.current.innerHTML = htmlContent;
        }    
    };
    return <>
        <Header/>
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
            <EditorHeader handleRender={handleRender}/>
            <div className="flex h-[96vh]">
                <textarea ref={printRef} className="w-1/2  bg-zinc-900 border-r-2 border-zinc-500 text-zinc-300 resize-none focus:outline-none" value={file} onChange={handleFileContentChange} autoComplete="on" autoCorrect="on" cols={100}>
                    {file}
                </textarea>
                <div ref={previewRef} className="w-1/2 bg-white p-5 prose"  />
            </div>
        </main>
    </>
};