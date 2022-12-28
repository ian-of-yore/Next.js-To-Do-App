import Head from "next/head";
import Link from "next/link";

const index = () => {
    return (
        <div className="w-50 mx-auto" style={{ height: '100vh', marginTop: '100px' }}>
            <Head>
                <title>Login</title>
            </Head>
            <h1 className="mb-5">Login</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div>
                    <p>New here? <Link href='/register' className="text-decoration-underline">Register</Link></p>
                </div>
                <div className="vstack gap-2 col-md-5 w-100">
                    <button type="button" className="btn btn-primary">Login</button>
                    <button type="button" className="btn btn-outline-success text-white">Continue With Google</button>
                </div>
            </form>
        </div>
    );
};

export default index;