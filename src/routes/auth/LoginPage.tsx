const LoginPage = () => {
    return (
        <div>
            <button
                className="button"
                onClick={() => {
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
