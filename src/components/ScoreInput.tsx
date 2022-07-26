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
        <div className="flex flex-row justify-between bg-primary-bg rounded-md">
            <button
                type="button"
                className="text-2xl px-5 "
                onClick={() => helpers.setValue(meta.value + 1)}
            >
                +
            </button>
            <input
                {...field}
                className="text-2xl text-center bg-transparent w-full"
            />
            <button
                type="button"
                className="text-2xl px-5 "
                onClick={() => helpers.setValue(meta.value - 1)}
            >
                -
            </button>
        </div>
    );
};
