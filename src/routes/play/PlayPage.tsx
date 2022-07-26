import KickaLogo from "../../components/KickaLogo";
import { useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { debounce } from "throttle-debounce";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import trophyIcon from "../../assets/trophy.svg";
import eloLogo from "../../assets/elo.svg";
import { ScoreInput } from "../../components/ScoreInput";

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
                            neutral0: "#141414",
                            neutral20: "#787878",
                            neutral80: "white",
                            neutral90: "white",
                            primary25: "#141414",
                            primary50: "#141414",
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
                        score1: "Select a score that isn't a draw",
                        score2: "Something went wrong",
                    });
                    setSubmitting(false);
                }
            }}
        >
            <Form className="flex flex-col grow gap-2">
                <div className="bg-primary-bg py-6 px-6 rounded-xl">
                    <div className="flex flex-row">
                        <div className="flex flex-1 min-w-min justify-start">
                            <div className="flex flex-col gap-1">
                                <span className="text-2xl ">
                                    {user1?.username}
                                </span>
                                <div className="flex flex-row justify-start items-center gap-3 pb-5">
                                    <div className="flex flex-row gap-1 items-center">
                                        <span>{user1?.elo_score}</span>
                                        <img
                                            src={eloLogo}
                                            className="h-4 drop-shadow-gold"
                                        />
                                    </div>
                                    <div className="bg-primary-bg h-5 w-1 rounded-xl"></div>

                                    <div className="flex flex-row gap-1 items-center">
                                        <span>{user1?.position}.</span>
                                        <img
                                            src={trophyIcon}
                                            alt="Trophy"
                                            className="h-4 drop-shadow-gold"
                                        />
                                    </div>
                                </div>
                                <ScoreInput name="score1" />
                            </div>
                        </div>
                        <div className="flex self-center flex-col items-center gap-2">
                            <span className="text-2xl">VS</span>
                            <div className="bg-primary-bg rounded-xl w-1 h-28"></div>
                        </div>
                        {!userSelected ? (
                            <div className="flex flex-1 min-w-min justify-end">
                                <div className="flex flex-col gap-1">
                                    <span className="text-2xl text-end">
                                        {user2?.username}
                                    </span>
                                    <div className="flex flex-row justify-end items-center gap-3 pb-5">
                                        <div className="flex flex-row gap-1 items-center">
                                            <span>{user2?.elo_score}</span>
                                            <img
                                                src={eloLogo}
                                                className="h-4 drop-shadow-gold"
                                            />
                                        </div>
                                        <div className="bg-primary-bg h-5 w-1 rounded-xl"></div>

                                        <div className="flex flex-row gap-1 items-center">
                                            <span>{user2?.position}.</span>
                                            <img
                                                src={trophyIcon}
                                                alt="Trophy"
                                                className="h-4 drop-shadow-gold"
                                            />
                                        </div>
                                    </div>
                                    <ScoreInput name="score2" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-1 justify-end rounded-xl ml-4"></div>
                        )}
                    </div>
                    <div className="flex place-content-end gap-3 pt-5">
                        <div className="flex items-center text-start grow text-red-500">
                            <ErrorMessage name="score1" />
                        </div>
                        <Link to="play">
                            <button className="button bg-primary-action h-2 shadow-primary">
                                Cancel
                            </button>
                        </Link>

                        <button
                            disabled={userSelected}
                            type="submit"
                            className={
                                "button h-2 bg-green-500 " +
                                (!userSelected && "shadow-secondary")
                            }
                        >
                            Draft
                        </button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default PlayPage;
