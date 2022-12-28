import { useRouter } from "next/router";

const CompletedTasksID = () => {
    const router = useRouter();
    const id = router.query.completedTasksID

    return (
        <div>
            <h1>This is the dynamic route of completed Tasks ID: {id}</h1>
        </div>
    );
};

export default CompletedTasksID;