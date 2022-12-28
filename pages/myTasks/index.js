import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import PrivateRoute from "../../components/PrivateRoute";
import { AuthContext } from "../../context";


const MyTasks = () => {

    // const router = useRouter();
    // const { user } = useContext(AuthContext);
    // if (!user?.email) {
    //     if (typeof window !== "undefined") {
    //         localStorage.setItem("path", router.asPath);
    //     }
    //     // router.push("/login");
    //     // Router.push('/login')
    //     return <div> redirecting to login... </div>
    // }

    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // user?.email ? router.push('/myTasks') : router.push('/login')
        if (!user?.email) {
            if (typeof window !== "undefined") {
                localStorage.setItem("path", router.asPath);
                router.push('/login')
            };

        }
        else {
            router.push('/myTasks')
        }
    }, [])

    return (
        <div>
            <Head>
                <title>My Tasks</title>
            </Head>
            <h1>Here you will see all your tasks</h1>
        </div>
    );
};

export default MyTasks;