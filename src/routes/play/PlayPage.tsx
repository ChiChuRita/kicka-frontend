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
    value: string;
    label: string;
}

const PlayPage = () => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>();
    const [optionsMessage, setOptionsMessage] = useState("Start searching!");
    const [newGameCreated, setNewGameCreated] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);

    const { data: ownUser, isLoading } = useQuery("user", () => {
        return axios.get<UserData>("/private/user");
    });

    const noUsersFound = () => {
        setOptionsMessage("No users found");
        setOptions([]);
    };

    const fetchUsers = async (searchQuery: string) => {
        const { data } = await axios.get<UserData[] | null>("/private/users", {
            params: { like: searchQuery },
        });
        return data;
    };
    const debounceSearch = debounce(500, (searchQuery: string) => {
        fetchUsers(searchQuery).then((data) => {
            if (data) {
                data = data.filter(
                    (user) => user.username !== ownUser!.data.username
                );
                if (data.length === 0) {
                    noUsersFound();
                } else {
                    setOptions(
                        data.map((item: any) => {
                            return {
                                value: item.username,
                                label: item.username,
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
        <div className="flex flex-col grow max-w-full gap-2">
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
                onClick={() => setNewGameCreated(true)}
            >
                Create new game
            </button>
            {newGameCreated && (
                <NewGameForm
                    user1={ownUser!.data.username}
                    user2={selectedOption!.value}
                ></NewGameForm>
            )}
        </div>
    );
};

interface NewGameProps {
    user1: string;
    user2: string;
}

const NewGameForm: React.FC<NewGameProps> = ({ user1, user2 }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    let currentDate = new Date();
    const date =
        currentDate.getFullYear() +
        "/" +
        (currentDate.getMonth() + 1) +
        "/" +
        currentDate.getDate() +
        "." +
        currentDate.getHours() +
        ":" +
        currentDate.getMinutes() +
        ":" +
        currentDate.getSeconds();
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
                        user_name1: user1,
                        user_name2: user2,
                        time_started: date,
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
            <Form className="flex flex-col grow gap-5">
                <div className="flex flex-row justify-between bg-neutral-800 rounded-xl py-4 px-6">
                    <span>{user1}</span>
                    <span>:</span>
                    <span>{user2}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <Field name="score1" type="number" />
                        <ErrorMessage name="score1" />
                    </div>
                    <div className="flex flex-col">
                        <Field name="score2" type="number" />
                        <ErrorMessage name="score2" />
                    </div>
                </div>
                <button type="submit" className="button bg-primary-action">
                    Submit game
                </button>
            </Form>
        </Formik>
    );
};

export default PlayPage;
