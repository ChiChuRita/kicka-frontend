import { useLayoutEffect } from "react";
import { useField, FieldHookConfig } from "formik";

interface ScoreInputProps {
    name: string;
}

export const ScoreInput: React.FC<ScoreInputProps> = ({ name }) => {
    const [field, meta, helpers] = useField(name);

    useLayoutEffect(() => {
        if (meta.value < 0 || isNaN(meta.value)) {
            helpers.setValue(0);
        } else if (meta.value > 30) {
            helpers.setValue(30);
        }
    }, [meta.value]);

    return (
        <div className="flex flex-row justify-between bg-primary-bg rounded-md max-w-[180px]">
            <button
                type="button"
                className="text-2xl pl-4 pr-1"
                onClick={() => helpers.setValue(parseInt(meta.value) - 1)}
            >
                -
            </button>
            <input
                type="number"
                {...field}
                className="text-2xl text-center bg-transparent w-full"
            />
            <button
                type="button"
                className="text-2xl pr-4 pl-1"
                onClick={() => helpers.setValue(parseInt(meta.value) + 1)}
            >
                +
            </button>
        </div>
    );
};
