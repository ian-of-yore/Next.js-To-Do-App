import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context";


const MyTasks = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.email) {
            if (typeof window !== "undefined") {
                localStorage.setItem("path", router.asPath);
                router.push('/login')
            };

        }
        else {
            router.push('/myTasks')
        }
    }, []);

    

    return (
        <div>
            <Head>
                <title>My Tasks</title>
            </Head>
            <div className="w-75 mx-auto" style={{ marginTop: '100px' }}>
                <h1 className="mb-5 text-center">Here you will see all your tasks</h1>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTasks;

