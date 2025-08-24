import { Trash } from "@phosphor-icons/react";
import { getInitials } from "../../helper";

const SummaryCard = ({
    role,
    colors,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
    onSelect,
    onDelete
}) => {
    return (
        <div className="p-4 border border-gray-400 w-fit rounded-2xl flex flex-col gap-6 text-gray-800 m-4" onClick={onSelect}>
            <div className="relative flex gap-10 px-4 py-2 items-center group" style={{ background: colors.bgcolor }}>
                <span className="bg-white w-10 h-10 flex items-center justify-center text-black font-bold text-xs rounded-xl">{getInitials(role)}</span>
                <div>
                    <span className="font-bold">{role}</span>
                    <div className="text-xs">{topicsToFocus}</div>
                </div>
                <div className="bg-red-200 px-3 py-1 absolute top-0 right-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer" onClick={onDelete}><Trash size={16} /></div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                    <div className="w-fit text-xs text-gray-600 border border-gray-400 px-2 py-1 rounded-3xl">Experience: {experience} {experience === 1 ? "Year" : "Years"}</div>
                    <div className="w-fit text-xs text-gray-600 border border-gray-400 px-2 py-1 rounded-3xl">{questions.length} Q&A</div>
                    <div className="w-fit text-xs text-gray-600 border border-gray-400 px-2 py-1 rounded-3xl">Last Updated: {lastUpdated}</div>
                </div>
                <div className="text-xs">
                    {description}
                </div>
            </div>
        </div>)
}

export default SummaryCard;