import KickaLogo from "../../components/KickaLogo";
import useDebounce from "../../hooks/useDebounce";
import useSearchQuery from "../../hooks/useSearchQuery";

const PlayPage = () => {
    return (
        <div>
            <KickaLogo />
            Search for username:
            <input
                type="textbox"
                className="text-black"
                onChange={searchChanged}
            ></input>
        </div>
    );
};

const searchChanged = (event: any) => {
    console.log(event);
};

export default PlayPage;
