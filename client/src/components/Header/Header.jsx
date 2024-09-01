import { useState } from 'react';
import { Link } from 'react-router-dom';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import HeaderSideDrawer from '../HeaderSideDrawer/HeaderSideDrawer';

import './Header.scss';

const Header = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };

    return (
        <>
            <HeaderSideDrawer show={drawerIsOpen} closeDrawer={closeDrawerHandler} />
            <div className="header">
                <button className="header__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <div className="header-content">
                    <Link to="/" className="header-content__title">
                        Foodie Hub
                    </Link>
                </div>
                <HeaderMenu />
            </div>
        </>
    );
};

export default Header;
