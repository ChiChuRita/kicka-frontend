import KickaLogo from "../../components/KickaLogo";
import { useDebounce } from "../../hooks/useDebounce";
import useSearchQuery from "../../hooks/useSearchQuery";
import { useEffect, useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { GroupBase } from "react-select";

interface Option {
    value: string;
    label: string;
}

const PlayPage = () => {
    let options: Option[] = [];
    const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>();
    const [optionsMessage, setOptionsMessage] = useState("No options bruh");
    const optionStyles: StylesConfig<Option, false> = {
        option: (provided, state) => ({
            ...provided,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "white",
        }),
    };
    const typeSearch = (search: string) => {
        setSelectedOption(undefined);
        console.log(search);
        const debouncedSearch = useDebounce(search, 500);
    };

    return (
        <div>
            <KickaLogo />
            <div className="App">
                <Select
                    defaultValue={selectedOption}
                    onInputChange={(value) => {
                        typeSearch(value);
                    }}
                    onChange={setSelectedOption}
                    options={options}
                    noOptionsMessage={() => optionsMessage}
                    styles={optionStyles}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: "#787878",
                            neutral0: "#262626",
                            neutral20: "#787878",
                            neutral80: "white",
                            neutral90: "white",
                            primary25: "#404040",
                            primary50: "#262626",
                        },
                    })}
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
