import KickaLogo from "../../components/KickaLogo";
import { useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { debounce } from "throttle-debounce";
import axios from "axios";

interface QueryResponse {
    [key: string]: string;
}

interface Option {
    value: string;
    label: string;
}

const PlayPage = () => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>();
    const [optionsMessage, setOptionsMessage] = useState("Start searching!");
    const [options, setOptions] = useState<Option[]>([]);
    const noUsersFound = () => {
        setOptionsMessage("No users found");
        setOptions([]);
    };

    const fetchUsers = async (searchQuery: string) => {
        const { data } = await axios.get("/private/users", {
            params: { like: searchQuery },
        });
        return data;
    };
    const debounceSearch = debounce(500, (searchQuery: string) => {
        fetchUsers(searchQuery).then((data) => {
            if (data)
                setOptions(
                    data.map((item: any) => {
                        return {
                            value: item.username,
                            label: item.username,
                        };
                    })
                );
            else noUsersFound();
        });
    });
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
        debounceSearch(search);
        if (!search) {
            debounceSearch.cancel({ upcomingOnly: true });
            noUsersFound();
        } else setOptionsMessage("Fetching...");
    };

    return (
        <div className="flex flex-col grow max-w-full">
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
                            neutral0: "#404040",
                            neutral20: "#787878",
                            neutral80: "white",
                            neutral90: "white",
                            primary25: "#404040",
                            primary50: "#404040",
                        },
                    })}
                />
            </div>
            <button
                className="button"
                disabled={!selectedOption}
                onClick={() => console.log("HI")}
            >
                Create new game
            </button>
        </div>
    );
};

const searchChanged = (event: any) => {
    console.log(event);
};

export default PlayPage;
