import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context";

const Header = () => {

    const { user, userLogOut } = useContext(AuthContext);

    const handleLogOut = () => {
        userLogOut()
            .then(() => { })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-5" href="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end" id="navbarSupportedContent">
                        <ul className="navbar-nav me-5 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/addTasks">Add Task</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/myTasks">My Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/completedTasks">Completed</Link>
                            </li>
                            <li className="nav-item">
                                {
                                    user?.uid ?
                                        <Link href='#' onClick={handleLogOut} className="nav-link active" aria-current="page">Log Out</Link>
                                        :
                                        <Link className="nav-link active" aria-current="page" href="/login">Login</Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;