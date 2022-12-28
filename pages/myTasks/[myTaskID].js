import { useRouter } from "next/router";

const MyTaskID = () => {
    const router = useRouter();
    const id = router.query.myTaskID;

    return (
        <div>
            <h1>This is the dynamic route of my tasks ID of: {id}</h1>
        </div>
    );
};

export default MyTaskID;