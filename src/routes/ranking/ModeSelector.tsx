import React from "react";

import singleIcon from "../../assets/single.svg";
import duoIcon from "../../assets/duo.svg";

interface ModeSelectorProps {
    onChange: (mode: string) => void;
    mode: string;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChange }) => {
    return (
        <div className="flex flex-row bg-primary-bg rounded-md">
            <button
                className={
                    mode === "single"
                        ? "bg-primary-bg inline-flex items-center gap-1 rounded-md text-white py-2 px-4"
                        : "inline-flex items-center gap-1 rounded-md text-white py-2 px-4"
                }
                onClick={() => onChange("single")}
            >
                <img src={singleIcon} className="h-1/2" />
                Single
            </button>
            <button
                className={
                    mode === "duo"
                        ? "bg-primary-bg inline-flex items-center gap-1 rounded-md text-white py-2 px-4"
                        : "inline-flex items-center gap-1 rounded-md text-white py-2 px-4"
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
