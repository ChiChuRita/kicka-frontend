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
    const buttonVariants = {
        normal: { background: "none" },
        selected: { backgroundColor: "grey" },
    };

    return (
        <AnimateSharedLayout>
            <div className="flex flex-row bg-neutral-700 rounded-md">
                <motion.button
                    className="inline-flex items-center gap-1 rounded-md bg-neutral-500 text-white py-2 px-4 "
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    variants={buttonVariants}
                    animate={mode === "single" ? "selected" : "normal"}
                    onClick={() => onChange("single")}
                >
                    <img src={singleIcon} className="h-1/2" />
                    Single
                </motion.button>
                <motion.button
                    className="inline-flex items-center gap-1 rounded-md text-white py-2 px-4"
                    variants={buttonVariants}
                    animate={mode === "duo" ? "selected" : "normal"}
                    onClick={() => onChange("duo")}
                >
                    <img src={duoIcon} className="h-1/2" />
                    Team
                </motion.button>
            </div>
        </AnimateSharedLayout>
    );
};

export default ModeSelector;
