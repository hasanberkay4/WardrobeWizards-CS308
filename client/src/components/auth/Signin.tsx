import { useState } from "react";
import { useAuth } from "../../context/Auth";
import { signInSchema } from "../../scripts/auth/validateSignIn";
import Link from "next/link";
import router from "next/router";
import { ZodError } from "zod";

export default function Signin() {

    const { setAuthCookie } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // validate form data
        const formData = {
            email: email,
            password: password,
        };
        try {
            signInSchema.parse(formData);
        } catch (error) {
            alert((error as ZodError).errors[0].message)
            return;
        }

        // handle form submission logic
        let response;
        try {
            response = await fetch('http://localhost:5001/auth/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.log("error:", error);
            alert("User Does not exist, Please sign up")
            return;
        }

        const data = await response.json();

        // handle error
        if (data.error) {
            console.log("error:", data.error);
            return;
        }

        // set auth cookie
        setAuthCookie(data.token);

        // show success message
        alert(data.message);
        // redirect to home page
        router.push('/');
    };

    return (
        <>
            <div className="h-full">
                <div className="bg-gray-200 flex h-full items-center py-16">
                    <main className="w-full max-w-md mx-auto p-6">
                        <div className="mt-7 bg-gray-100 border border-gray-200 rounded-xl shadow-sm">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-gray-800">
                                        Sign in
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Dont have an account yet? &nbsp;
                                        <Link
                                            className="text-blue-600 decoration-2 hover:underline font-medium"
                                            href="/auth/sign-up"
                                        >
                                            Sign up here
                                        </Link>
                                    </p>
                                </div>


                                <div className="mt-5">
                                    <div className="text-center">


                                        <form onSubmit={handleSubmit} >
                                            <div className="grid gap-y-4">

                                                <div >
                                                    <div className="flex justify-between items-center">
                                                        <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                                                    </div>
                                                    <div className="relative">
                                                        <input onChange={handleChange}
                                                            type="email" id="email" name="email"
                                                            className="py-3 px-4 block w-full border-gray-500 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200"
                                                            required aria-describedby="email-error"
                                                        />
                                                    </div>
                                                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                                </div>



                                                <div>
                                                    <div className="flex justify-between items-center">
                                                        <label htmlFor="password" className="block text-sm mb-2 ">Password</label>
                                                        <a className="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</a>
                                                    </div>
                                                    <div className="relative">
                                                        <input onChange={handleChange} type="password" id="password" name="password" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-400" required aria-describedby="password-error" />

                                                    </div>
                                                    <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                                </div>

                                                <div className="flex items-center">
                                                    <div className="flex">
                                                        <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <label htmlFor="remember-me" className="text-sm">Remember me</label>
                                                    </div>
                                                </div>



                                                <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
