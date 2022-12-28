import Head from "next/head";
import { useContext } from "react";
import { AuthContext } from "../../context";

const AddTask = () => {

    const { user } = useContext(AuthContext);

    const handleAddTask = (event) => {
        event.preventDefault();
        const form = event.target;
        const taskName = form.taskName.value;
        const taskDetails = form.tastDetails.value;
        const userEmail = user?.email;
        const doc = {
            taskName,
            taskDetails,
            userEmail
        }
        // console.log(doc)
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(doc)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    form.reset();
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Head>
                <title>Add Task</title>
            </Head>
            <div className="w-50 mx-auto" style={{ marginTop: '100px' }}>
                <h1 className="mb-5">Add new tasks to your To Do List</h1>
                <form onSubmit={handleAddTask}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Task</label>
                        <input type="text" name="taskName" className="form-control" placeholder="Task Name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea name="tastDetails" className="form-control" aria-label="With textarea" placeholder="Task Description" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={!user?.email}>Add to list</button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;