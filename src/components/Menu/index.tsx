
import {Trash , LockKeyhole , Phone} from "lucide-react"

const Menu = () => {
    const handleDeleteMessages = () => {
        // Delete messages
    }
    return (
        <div className={` dark:text-white bg-slate-50 dark:bg-dark-secondary w-44 shadow-md  rounded-xl py-2 z-50 absolute right-[5%] top-20 cursor-pointer`}>
            <div className="px-1 ">   
            <div className="flex items-center text-sm font-medium gap-3 py-1 my-1 rounded-lg hover:bg-white dark:hover:bg-[#16181C] px-2"><span><Phone size={20} className="text-black dark:text-[#E7E9EA] text-sm"/></span>Call</div>    
            <div className="flex items-center text-sm font-medium gap-3 py-1 my-1 rounded-lg hover:bg-white dark:hover:bg-[#16181C] px-2"><span><LockKeyhole size={20} className="text-black dark:text-[#E7E9EA] text-sm"/></span>Block User </div>    
            <div onClick={handleDeleteMessages} className="flex items-center text-sm font-medium  gap-3 py-1 my-1 rounded-lg hover:bg-white dark:hover:bg-[#16181C] px-2 text-red-500"><span><Trash size={20} className="text-red-500"/></span>Delete Messages</div>    
            </div>
        </div>
    )
}

export default Menu;