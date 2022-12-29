import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context";

const AddTask = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const imageBBKey = process.env.NEXT_PUBLIC_IMAGEBB_KEY;
    const { register, handleSubmit } = useForm();
    const [spinner, setSpinner] = useState(false);

    const handleRegister = (data) => {
        setSpinner(true);
        const img = data.taskImg[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const taskInfo = {
                        taskName: data.taskName,
                        taskURL: imgData.data.url,
                        taskDetails: data.taskDetails,
                        userEmail: user?.email
                    };
                    fetch('https://next-todo-server.vercel.app/tasks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(taskInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                setSpinner(false);
                                router.push('/myTasks')
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
    }


    return (
        <div>
            <Head>
                <title>Add Task</title>
            </Head>
            {
                spinner && <div className="vh-100 d-flex justify-content-center align-items-center">
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            <div className="w-50 mx-auto" style={{ marginTop: '100px' }}>
                <h1 className="mb-5">Add new tasks to your To Do List</h1>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Task</label>
                        <input type="text" {...register('taskName')} className="form-control" placeholder="Task Name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea {...register('taskDetails')} className="form-control" aria-label="With textarea" placeholder="Task Description" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Task Image</label>
                        <input type="file" {...register('taskImg')} className="form-control" id="inputGroupFile01" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={!user?.email}>Add to list</button>
                </form>
            </div>
        </div >
    );
};

export default AddTask;