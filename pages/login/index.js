import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context";

const index = () => {

    const { userLogin, googleLogin } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)
        userLogin(email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch(err => console.log(err))
    };

    const handleGoogleSingIn = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="w-50 mx-auto" style={{ height: '100vh', marginTop: '100px' }}>
            <Head>
                <title>Login</title>
            </Head>
            <h1 className="mb-5">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div>
                    <p>New here? <Link href='/register' className="text-decoration-underline">Register</Link></p>
                </div>
                <div className="vstack gap-2 col-md-5 w-100">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            <button onClick={handleGoogleSingIn} type="button" className="btn btn-outline-success text-white w-100 mt-3">Continue With Google</button>
        </div>
    );
};

export default index;