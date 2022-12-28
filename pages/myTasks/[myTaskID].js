import { async } from "@firebase/util";
import Link from "next/link";
import { useRouter } from "next/router";

const MyTaskID = ({ task }) => {
    const router = useRouter();
    const id = router.query.myTaskID;

    return (
        <div>
            <div className="card w-75 mt-5 mx-auto bg-dark text-white">
                <div className="card-body">
                    <h5 className="card-title">Task: {task.taskName}</h5>
                    <p className="card-text">Details: {task.taskDetails}</p>
                    {
                        task?.status === 'completed' ? <p>Status: Completed</p> : <p>Status: Pending</p>
                    }
                    <Link href='/myTasks'><button>Go to tasks</button></Link>
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