import React from 'react';

// Define the Logo component using React.FC for a standard SVG element
export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 691.13 691.13"
            fill="#fff" // Set color to white
            {...props}
        >
            {/* SVG path elements go here */}
            <path
                d="M478,345.55a43.77,43.77,0,0,0,43.76,43.77H688.38a349.15,349.15,0,0,0,2.75-43.76c0-143.94-88-267.31-213.16-319.26Z"
            />
            <path
                d="M517.09,476.84a215.63,215.63,0,0,1-171.53,84.73c-119.29,0-216-96.71-216-216s96.71-216,216-216a216.86,216.86,0,0,1,44.88,4.68V2.9A348,348,0,0,0,345.56,0C154.71,0,0,154.71,0,345.56S154.71,691.13,345.56,691.13c144.37,0,268.05-88.55,319.73-214.29Z"
            />
        </svg>
    );
};
