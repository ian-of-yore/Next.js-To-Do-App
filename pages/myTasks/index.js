import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
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


    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/tasks?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, []);

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    console.log(data)


    return (
        <div>
            <Head>
                <title>My Tasks</title>
            </Head>
            <div className="w-75 mx-auto" style={{ marginTop: '100px' }}>
                <h1 className="mb-5 text-center">These are your pending tasks</h1>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task</th>
                            <th scope="col">Details</th>
                            <th scope="col">Update</th>
                            <th scope="col">Remove</th>
                            <th scope="col">Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((task, index) => <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{task.taskName}</td>
                            <td><button className="btn btn-outline-light">See Details</button></td>
                            <td><button className="btn btn-outline-warning">Update</button></td>
                            <td><button className="btn btn-outline-danger">Remove</button></td>
                            <td><button className="btn btn-outline-primary">Completed</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTasks;

