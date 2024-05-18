import {Trash , LockKeyhole , Phone} from "lucide-react"

const Menu = () => {
    const handleDeleteMessages = () => {
        console.log("delete messages")
    }
    return (
        <div className={` text-white w-44 bg-[#1d1d1d] rounded-xl py-2 z-50 absolute right-[5%] top-20 cursor-pointer`}>
            <div className="px-1 ">   
            <div className="flex items-center text-sm font-medium gap-3 py-1 my-1 rounded-lg hover:bg-[#16181C] px-2"><span><Phone size={20} className="text-[#E7E9EA] text-sm"/></span>Call</div>    
            <div className="flex items-center text-sm font-medium gap-3 py-1 my-1 rounded-lg hover:bg-[#16181C] px-2"><span><LockKeyhole size={20} className="text-[#E7E9EA] text-sm"/></span>Block User </div>    
            <div onClick={handleDeleteMessages} className="flex items-center text-sm font-medium  gap-3 py-1 my-1 rounded-lg hover:bg-[#16181C] px-2 text-red-500"><span><Trash size={20} className="text-red-500"/></span>Delete Messages</div>    
            </div>
        </div>
    )
}

export default Menu;