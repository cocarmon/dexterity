
export default function Header() {
    return <div className="bg-zinc-700 text-zinc-100 h-8 flex items-center">
        <ul className="pl-10 text-md flex space-x-3">
            <li className="hover:text-zinc-300 hover:cursor-pointer">File</li>
            <li className="hover:text-zinc-300 hover:cursor-pointer">Save</li>
        </ul>
    </div>
};