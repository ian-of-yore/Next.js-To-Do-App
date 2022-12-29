import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";
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

    console.log(data)

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
                    setData(newTasks);
                    router.push('/completedTasks')
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
    };


    return (
        <div className="mb-5">
            <Head>
                <title>My Tasks</title>
            </Head>
            <div className="w-75 mx-auto" style={{ marginTop: '100px' }}>
                <h1 className="mb-5 text-center">These are your selected tasks</h1>
                <div className="row row-cols-2 row-cols-md-3 g-4">
                    {
                        data.map(task => <div className="col" key={task._id}>
                            <div className="card bg-dark text-white" style={{ width: '350px', height: '400px' }}>
                                {
                                    task?.taskURL ?
                                        <img src={task.taskURL} className="card-img-top" alt="..." style={{ width: '348px', height: '280px' }} />
                                        :
                                        <Image src='/task.jfif' alt='..' width={348} height={280}></Image>
                                }
                                <div className="card-body" style={{ height: '100px' }}>
                                    <h5 className="card-title fs-5">Task: {task.taskName.length > 25 ? task.taskName.slice(0, 22) + '...' : task.taskName}</h5>
                                    <div className="d-flex justify-content-around mt-4">
                                        <Link href={`/myTasks/${task._id}`}><button className="btn btn-outline-light btn-sm">Details</button></Link>
                                        <button onClick={() => handleRemoveTask(task._id)} className="btn btn-outline-light btn-sm">Remove</button>
                                        <button onClick={() => handleTaskComplete(task._id)} className="btn btn-outline-light btn-sm">{task.status === 'completed' ? <span>Completed</span> : <span>Pending</span>}</button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyTasks;

