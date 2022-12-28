import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
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

    const handleTaskComplete = (id) => {
        const status = {
            status: 'completed'
        }

        fetch(`http://localhost:5000/allTasks${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(d => {
                if (d.acknowledged) {
                    const remaining = data.filter(task => task._id !== id);
                    const updatedTask = data.find(task => task._id === id);
                    updatedTask.status = status.status;
                    const newTasks = [...remaining, updatedTask];
                    setData(newTasks)
                }
            })
            .catch(err => console.log(err))
    }

    const handleRemoveTask = (id) => {
        const confirm = window.confirm("Delete this review?");
        if (confirm) {
            fetch(`http://localhost:5000/allTasks${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(d => {
                    if (d.deletedCount) {
                        const remaining = data.filter(task => task._id !== id);
                        setData(remaining)
                    }
                })
        }
    }


    return (
        <div>
            <Head>
                <title>My Tasks</title>
            </Head>
            <div className="w-75 mx-auto" style={{ marginTop: '100px' }}>
                <h1 className="mb-5 text-center">These are your selected tasks</h1>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task</th>
                            <th scope="col">Details</th>
                            <th scope="col">Update</th>
                            <th scope="col">Remove</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((task, index) => <tr key={task._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{task.taskName}</td>
                            <td><Link href={`/myTasks/${task._id}`}><button className="btn btn-outline-light">See Details</button></Link></td>
                            <td><button className="btn btn-outline-warning">Update</button></td>
                            <td><button onClick={() => handleRemoveTask(task._id)} className="btn btn-outline-danger">Remove</button></td>
                            <td><button onClick={() => handleTaskComplete(task._id)} className="btn btn-outline-primary">{task.status === 'completed' ? <span>Completed</span> : <span>Pending</span>}</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTasks;

