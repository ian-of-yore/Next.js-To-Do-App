import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../context";

const index = () => {
    const router = useRouter();
    const { createUser, googleLogin } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const userName = form.userName.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(userName, email, password);
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                if (result.user) {
                    router.push('/');
                }
            })
            .catch((err) => console.log(err))
    }

    const handleGoogleSingIn = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                if (result.user) {
                    router.push('/')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="w-50 mx-auto" style={{ height: '100vh', marginTop: '100px' }}>
            <Head>
                <title>Register</title>
            </Head>
            <h1 className="mb-5">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <input type="text" name="userName" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Email" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Password" id="exampleInputPassword1" required />
                </div>
                <div>
                    <p>Already have an account? <Link href='/login' className="text-decoration-underline">Login</Link></p>
                </div>
                <div className="vstack gap-2 col-md-5 w-100">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
            <button onClick={handleGoogleSingIn} type="button" className="btn btn-outline-success text-white w-100 mt-3">Continue With Google</button>
        </div>
    );
};

export default index;