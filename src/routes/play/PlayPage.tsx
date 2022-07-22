import KickaLogo from "../../components/KickaLogo";
import useDebounce from "../../hooks/useDebounce";
import useSearchQuery from "../../hooks/useSearchQuery";
import { useEffect, useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { GroupBase } from "react-select";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

interface Option {
    value: string;
    label: string;
}

const PlayPage = () => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>();
    const optionStyles: StylesConfig<Option, false> = {
        option: (provided) => ({
            ...provided,
            color: "white",
            backgroundColor: "black",
        }),
    };
    console.log(selectedOption?.label);
    return (
        <div>
            <KickaLogo />
            <div className="App">
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    styles={optionStyles}
                />
            </div>
            Search for username:
            <input type="textbox" className="" onChange={searchChanged}></input>
        </div>
    );
};

const searchChanged = (event: any) => {
    console.log(event);
};

export default PlayPage;
