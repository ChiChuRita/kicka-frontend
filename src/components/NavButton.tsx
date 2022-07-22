import { NavLink } from "react-router-dom";

interface NavButtonProps {
    to: string;
    children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ to, children }) => {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <button
                    className={
                        isActive
                            ? "button bg-primary-action shadow-[0px_0px_12px_0px_#FA484899] shadow-red-500"
                            : "button"
                    }
                >
                    {children}
                </button>
            )}
        </NavLink>
    );
};

export default NavButton;
