import { memo } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';

import './ErrorModal.scss';

const ErrorModal = ({ error, onCancel }) => {
    const content = (
        <>
            {!!error && <Backdrop close={onCancel} />}
            <CSSTransition
                in={!!error}
                timeout={200}
                classNames="slide-in-top"
                mountOnEnter
                unmountOnExit
            >
                <div className="error-modal">
                    <div className="error-modal__header">
                        <h2>
                            An Error Occurred. Sorry, there was a problem processing your request.
                        </h2>
                    </div>
                    <div className="error-modal__content">
                        <h3>{error}</h3>
                    </div>
                    <div className="error-modal__actions">
                        <Button onClick={onCancel}>OK</Button>
                    </div>
                </div>
            </CSSTransition>
        </>
    );

    return ReactDOM.createPortal(content, document.getElementById('modal-root'));
};

export default memo(ErrorModal);
