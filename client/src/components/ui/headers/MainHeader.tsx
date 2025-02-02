
import { ChangeEvent, useState } from "react";
import { CubeIcon } from "@heroicons/react/24/solid";

import { useEditorHeaderStore } from "@/store/useEditorHeaderStore";

export default function MainHeader() {
    const [fileName,setFileName] = useState('');
    const file = useEditorHeaderStore.use.file();
    const setFile = useEditorHeaderStore.use.setFile();

    const handleFileUpload = (e:ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const currentFile = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result
                if (result) {
                    setFileName(currentFile.name)
                    setFile(result);
                }
            };
            reader.readAsText(currentFile);
        };
    };

    const handleSaveFile = async () => {
        try {
            const fileHandle = await window.showSaveFilePicker({
            suggestedName: fileName,
            types: [
                {
                description: 'Markdown Files',
                accept: { 'text/plain': ['.md'] },
                },
            ],
            });

            const writableStream = await fileHandle.createWritable();
            await writableStream.write(file);
            await writableStream.close();
        } catch(err) {
            console.log(err)
        };
    };

    const handleFileNameChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setFileName(value);
    };

    return (
        <div className="bg-zinc-800 text-zinc-100 h-8 flex items-center justify-between ">
            <div className="flex items-center">
                <CubeIcon className="text-yellow-400 ml-3" width={20} height={20}/>
                <ul className="pl-3 text-md flex space-x-3">
                    <li>
                        <label htmlFor="file-upload" className="hover:cursor-pointer hover:text-zinc-300 ">File</label>
                        <input id="file-upload" className="hidden" type="file" accept=".md" onChange={handleFileUpload}/>
                    </li>
                    <li className="hover:text-zinc-300 hover:cursor-pointer"><button onClick={handleSaveFile}>Save</button></li>
                    <li className="pl-8"><input name="name" type="text" className="rounded-sm pl-2 bg-zinc-700 focus:outline-none" value={fileName} onChange={handleFileNameChange}/></li>
                </ul>
            </div>
            <button className="bg-yellow-400 rounded-sm text-zinc-800 px-2 font-medium mr-6">Share</button>
        </div>
    )
};