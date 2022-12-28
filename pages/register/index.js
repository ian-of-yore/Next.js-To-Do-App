import Head from "next/head";
import Link from "next/link";

const index = () => {
    return (
        <div className="w-50 mx-auto" style={{ height: '100vh', marginTop: '100px' }}>
            <Head>
                <title>Register</title>
            </Head>
            <h1 className="mb-5">Register</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="Email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Password" id="exampleInputPassword1" />
                </div>
                <div>
                    <p>Already have an account? <Link href='/login' className="text-decoration-underline">Login</Link></p>
                </div>
                <div className="vstack gap-2 col-md-5 w-100">
                    <button type="button" className="btn btn-primary">Register</button>
                    <button type="button" className="btn btn-outline-success text-white">Continue With Google</button>
                </div>
            </form>
        </div>
    );
};

export default index;