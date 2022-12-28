import { async } from "@firebase/util";
import { useRouter } from "next/router";

const MyTaskID = ({ task }) => {
    const router = useRouter();
    const id = router.query.myTaskID;

    return (
        <div>
            <h1>This is the dynamic route of my tasks ID of: {task?.taskName}</h1>
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