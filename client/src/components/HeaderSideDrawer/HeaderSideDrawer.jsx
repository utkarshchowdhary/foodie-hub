import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

import './HeaderSideDrawer.scss';

const HeaderSideDrawer = props => {
    const content = (
        <>
            {props.show && <Backdrop close={props.closeDrawer} />}
            <CSSTransition
                in={props.show}
                timeout={200}
                classNames="slide-in-left"
                mountOnEnter
                unmountOnExit
            >
                <div className="header-side-drawer" onClick={props.closeDrawer}>
                    <HeaderMenu />
                </div>
            </CSSTransition>
        </>
    );

    return ReactDOM.createPortal(content, document.getElementById('drawer-root'));
};

export default HeaderSideDrawer;
