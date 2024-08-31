import React from 'react';

// Define the Logo component using React.FC for an img element
export const Logo: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
    return (
        <img
            src="/img/logo.png"  // Path to your logo image
            alt="Logo"            // Alternative text for accessibility
            {...props} // Spread any additional props passed to the component
        />
    );
};
