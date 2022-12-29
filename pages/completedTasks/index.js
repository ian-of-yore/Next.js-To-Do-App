import { async } from "@firebase/util";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";

const CompletedTasks = () => {

    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:5000/tasks?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                const remaining = data.filter(task => task.status === 'completed');
                setCompletedTasks(remaining)
                setLoading(false)
            })
    }, [user?.email]);

    // if (isLoading) return <p>Loading...</p>
    // if (!completedTasks) return <p>No profile data</p>

    const handleTaskNotCompleted = (id) => {
        const status = {
            status: 'pending'
        }

        fetch(`http://localhost:5000/notCompleted${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    router.push('/myTasks')
                }
            })
    };

    const handleCompletedTask = (id) => {
        const confirm = window.confirm("Delete this review?");
        if (confirm) {
            fetch(`http://localhost:5000/allTasks${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(d => {
                    if (d.deletedCount) {
                        const remaining = completedTasks.filter(task => task._id !== id);
                        setCompletedTasks(remaining)
                    }
                })
        }
    }

    return (
        <div className="w-75 mx-auto text-center mb-5" style={{ marginTop: '100px' }}>
            <Head>
                <title>Completed Tasks</title>
            </Head>
            <div className="w-100 mx-auto" style={{ marginTop: '100px' }}>
                <h1 className="mb-5">You have completed these tasks</h1>
                <div className="row row-cols-2 row-cols-md-3 g-4">
                    {
                        completedTasks.map(task => <div className="col" key={task._id}>
                            <div className="card bg-dark text-white" style={{ width: '350px', height: '400px' }}>
                                {
                                    task?.taskURL ?
                                        <img src={task.taskURL} className="card-img-top" alt="..." style={{ width: '348px', height: '280px' }} />
                                        :
                                        <Image src='/task.jfif' alt='..' width={348} height={280}></Image>
                                }
                                <div className="card-body p-0" style={{ height: '120px' }}>
                                    <h5 className="card-title text-start pt-1 ps-2 mb-0" style={{ height: '30px' }}>{task.taskName}</h5>
                                    <div style={{ height: '45px' }}>
                                        {
                                            task.comment ? <p>{task.comment}</p> : <p className="text-start ps-2 mt-1 mb-2">lmao</p>
                                        }
                                    </div>
                                    <div className="d-flex justify-content-between px-2" style={{ height: '30px' }}>
                                        <button href="#" className="btn btn-outline-light btn-sm">Add Comment</button>
                                        <button onClick={() => handleTaskNotCompleted(task._id)} href="#" className="btn btn-outline-light btn-sm">Not Completed</button>
                                        <button onClick={() => handleCompletedTask(task._id)} href="#" className="btn btn-outline-light btn-sm">Remove</button>
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

export default CompletedTasks;