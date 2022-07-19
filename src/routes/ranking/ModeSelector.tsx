import React from "react";

import singleIcon from "../../assets/single.svg";
import duoIcon from "../../assets/duo.svg";
import { motion, AnimateSharedLayout } from "framer-motion";

interface ModeSelectorProps {
    onChange: (mode: string) => void;
    mode: string;
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
};

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChange }) => {
    return (
        <div className="flex flex-row bg-neutral-700 rounded-md">
            <button
                className={
                    mode === "single"
                        ? "bg-neutral-500 inline-flex items-center gap-1 rounded-md text-white py-2 px-4"
                        : "bg-neutral-700 inline-flex items-center gap-1 rounded-md text-white py-2 px-4"
                }
                onClick={() => onChange("single")}
            >
                <img src={singleIcon} className="h-1/2" />
                Single
            </button>
            <button
                className={
                    mode === "duo"
                        ? "bg-neutral-500 inline-flex items-center gap-1 rounded-md text-white py-2 px-4"
                        : "bg-neutral-700 inline-flex items-center gap-1 rounded-md text-white py-2 px-4"
                }
                onClick={() => onChange("duo")}
            >
                <img src={duoIcon} className="h-1/2" />
                Team
            </button>
        </div>
    );
};

export default ModeSelector;
