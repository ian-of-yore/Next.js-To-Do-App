import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../context";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    // if (!user?.email) {
    //     return router.push('/login')
    // }

    // return children;
};

export default PrivateRoute;