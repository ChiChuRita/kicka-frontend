const LoginPage = () => {
    return (
        <div>
            <button
                className="button"
                onClick={() => {
                    console.log(import.meta.env.VITE_API_URL + "/public/login");
                    window.location.href =
                        import.meta.env.VITE_API_URL + "/public/login";
                }}
            >
                Login with HPI
            </button>
        </div>
    );
};

export default LoginPage;
