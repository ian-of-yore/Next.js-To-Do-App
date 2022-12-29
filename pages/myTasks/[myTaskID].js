import { async } from "@firebase/util";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const MyTaskID = ({ task }) => {
    const router = useRouter();
    const id = router.query.myTaskID;

    console.log(task)
    return (
        <div>
            <div className="card w-50 mt-5 mx-auto bg-dark text-white" style={{ height: '600px' }}>
                <div className="card bg-dark text-white pt-5">
                    {
                        task.taskURL ?
                            <img src={task.taskURL} className="card-img-top w-75 mx-auto" alt="..." style={{ height: '400px' }} />
                            :
                            <Image src='/task.jfif' className="w-75 mx-auto" width={500} height={400}></Image>
                    }
                    <div className="card-body w-75 mx-auto" style={{ height: '200px' }}>
                        <h5 className="card-title fs-4">Task: {task.taskName.length > 50 ? task.taskName.slice(0, 50) : task.taskName}</h5>
                        <p className="card-text">Task Details: {task.taskDetails}</p>
                        <p><span className="text-warning fw-bold fs-5">Status:</span> Task {task.status}</p>
                        <Link href='/myTasks'><button className="btn btn-outline-light w-100">Go to Tasks</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTaskID;

export const getStaticProps = async (context) => {
    const { params } = context;
    const res = await fetch(`http://localhost:5000/allTasks/${params?.myTaskID}`);
    const data = await res.json();

    return {
        props: {
            task: data
        }
    }
}


export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:5000/allTasks');
    const tasks = await res.json();

    const paths = tasks.map(task => {
        return {
            params: {
                myTaskID: `${task._id}`
            }
        }
    });

    return {
        paths,
        fallback: false
    }
}