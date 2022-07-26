import KickaLogo from "../../components/KickaLogo";
import { useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { debounce } from "throttle-debounce";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";

interface Option {
    value: UserData;
    label: string;
}

const PlayPage = () => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>();
    const [optionsMessage, setOptionsMessage] = useState("Start searching!");
    const [options, setOptions] = useState<Option[]>([]);

    const { data: ownUser, isLoading } = useQuery("user", () => {
        return axios.get<UserData | null>("/private/user");
    });
    const fetchUsers = async (searchQuery: string) => {
        const { data } = await axios.get<UserData[] | null>("/private/users", {
            params: { like: searchQuery },
        });
        return data;
    };

    const noUsersFound = () => {
        setOptionsMessage("No users found");
        setOptions([]);
    };

    const debounceSearch = debounce(500, (searchQuery: string) => {
        fetchUsers(searchQuery).then((data) => {
            if (data && ownUser) {
                data = data.filter(
                    (user) => user.username !== ownUser.data!.username
                );
                if (data.length === 0) {
                    noUsersFound();
                } else {
                    setOptions(
                        data.map((item) => {
                            return {
                                value: item,
                                label:
                                    item.username +
                                    " —🏆" +
                                    item.position +
                                    ".",
                            };
                        })
                    );
                }
            } else noUsersFound();
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
        control: (provided, state) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
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
            <div className="App flex flex-col gap-2 pt-6 pb-6">
                <span className="text-xl">Search for your opponent!</span>
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

            {ownUser && (
                <NewGameForm
                    user1={ownUser.data}
                    user2={selectedOption?.value}
                    userSelected={!selectedOption}
                ></NewGameForm>
            )}
        </div>
    );
};

interface NewGameProps {
    user1: UserData | null;
    user2: UserData | undefined;
    userSelected: boolean;
}

const NewGameForm: React.FC<NewGameProps> = ({
    user1,
    user2,
    userSelected,
}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const currentDate = new Date().getTime().toString();
    return (
        <Formik
            initialValues={{ score1: 0, score2: 0 }}
            validationSchema={yup.object({
                score1: yup
                    .number()
                    .min(0)
                    .max(30)
                    .required("Your score is required"),
                score2: yup
                    .number()
                    .min(0)
                    .max(30)
                    .required("Your opponent's score is required"),
            })}
            onSubmit={async (
                { score1, score2 },
                { setSubmitting, setErrors }
            ) => {
                setSubmitting(true);
                try {
                    const { data } = await axios.post("/private/game/single", {
                        user_name1: user1?.username,
                        user_name2: user2?.username,
                        time_started: currentDate,
                        score1: score1,
                        score2: score2,
                    });
                    queryClient.invalidateQueries("games");
                    navigate("/");
                    setSubmitting(false);
                } catch (error) {
                    setErrors({
                        score1: "Something went wrong",
                        score2: "Something went wrong",
                    });
                    setSubmitting(false);
                }
            }}
        >
            <Form className="flex flex-col grow gap-2">
                <div className="bg-neutral-800 py-3 px-5 rounded-xl"></div>

                <div className="flex flex-row">
                    <div className="flex flex-1 min-w-min justify-start">
                        <div className="bg-neutral-800 py-3 px-5 rounded-xl">
                            {user1?.username}
                        </div>
                    </div>

                    <div className="bg-primary-action py-2 px-4 rounded-xl self-center">
                        VS
                    </div>

                    <div className="flex flex-1 min-w-min justify-end">
                        <div
                            className={
                                "bg-neutral-800 py-3 px-5 rounded-xl " +
                                (userSelected && "w-6/12")
                            }
                        >
                            {user2?.username}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-36">
                        <Field
                            className="max-w-xs"
                            name="score1"
                            type="number"
                        />
                        <ErrorMessage name="score1" />
                    </div>
                    <div className="flex flex-col">
                        <Field name="score2" type="number" />
                        <ErrorMessage name="score2" />
                    </div>
                </div>
                <button
                    type="submit"
                    className="button bg-primary-action"
                    disabled={userSelected}
                >
                    Submit game
                </button>
            </Form>
        </Formik>
    );
};

export default PlayPage;
