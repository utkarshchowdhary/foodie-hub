import React from 'react';

import Button from '../Button/Button';

import './ErrorBoundary.scss';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-image-overlay">
                    <div className="error-image-container" />
                    <h2 className="error-image-text">There’s a Leak in the Website</h2>
                    <Button to="/">Back to Home</Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
