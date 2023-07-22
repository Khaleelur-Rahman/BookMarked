import React from "react";
import { Navigate } from "react-router-dom";


//Function to handle navigation to children components
function Protected ({isSignedIn, children}) {
    if (isSignedIn) {
        return children;
    } else {
        return <Navigate to="/" replace />;
    }
}

export default Protected;