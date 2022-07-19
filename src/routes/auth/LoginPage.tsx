import HPILogo from "../../assets/hpi_logo.svg";

const LoginPage = () => {
    const redirectToLoginPage = () => {
        window.location.href = import.meta.env.VITE_API_URL + "/public/login";
    };

    return (
        <div>
            <button
                className="button flex flex-row items-center gap-4 p-4"
                onClick={redirectToLoginPage}
            >
                <img src={HPILogo} width={30} />
                Login with HPI
            </button>
        </div>
    );
};

export default LoginPage;
