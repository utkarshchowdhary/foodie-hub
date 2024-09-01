import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';

import './HeaderMenu.scss';

const HeaderMenu = () => {
    const auth = useContext(AuthContext);

    return (
        <div className="header-menu">
            <NavLink to="/" exact>
                HOME
            </NavLink>
            {auth.isAuthenticated && auth.isChef && (
                <NavLink to="/recipies/new">ADD RECIPE</NavLink>
            )}
            {!auth.isChecking && !auth.isAuthenticated && (
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            )}
            {auth.isAuthenticated && <button onClick={auth.logout}>LOG OUT</button>}
        </div>
    );
};

export default HeaderMenu;
