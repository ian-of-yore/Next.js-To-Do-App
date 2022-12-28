import { createContext } from "react";
import { getAuth } from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app)
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {



    const authInfo = {
        user: 'mokhlesh'
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;