import { async } from "@firebase/util";
import Head from "next/head";
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
    }

    return (
        <div className="w-75 mx-auto text-center" style={{ marginTop: '100px' }}>
            <Head>
                <title>Completed Tasks</title>
            </Head>
            <h1>You've completed these tasks</h1>
            <div>
                <div className="container text-center w-100">
                    <div className="row ms-5 mt-5">
                        {
                            completedTasks.map(task => <div className="card col-5 bg-dark text-white mb-3 me-3" key={task._id}>
                                <img src="#" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{task.taskName}</h5>
                                    {
                                        task.comment ? <p>{task.comment}</p> : ''
                                    }
                                    <div className="d-flex justify-content-between">
                                        <button href="#" className="btn btn-outline-light btn-sm">Add Comment</button>
                                        <button onClick={() => handleTaskNotCompleted(task._id)} href="#" className="btn btn-outline-light btn-sm">Not Completed</button>
                                        <button href="#" className="btn btn-outline-light btn-sm">Remove</button>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedTasks;