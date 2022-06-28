import { Link } from "react-router-dom";
import KickaLogo from "../../components/KickaLogo";

const Login: React.FC = () => {
    return (
        <div>
            <KickaLogo />
            <Link to="/openid">
                <button className="button">Login with HPI</button>
            </Link>
        </div>
    );
};

export default Login;
