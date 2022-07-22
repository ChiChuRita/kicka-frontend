import HPILogo from "../../assets/hpi_logo.svg";

const LoginPage = () => {
    return (
        <div className="flex flex-col grow gap-5">
            <span>Please Login to compete against the greatest!</span>
            <a
                className="button flex flex-row items-center gap-4 p-4"
                href={import.meta.env.VITE_API_URL + "/public/login"}
            >
                <img src={HPILogo} width={30} />
                Login with HPI
            </a>
        </div>
    );
};

export default LoginPage;
