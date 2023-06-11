import Link from "next/link";
import { useState } from "react";
import { signUpSchema } from "../../scripts/auth/validateSignUp";
import router from "next/router";
import { ZodError } from "zod";


export default function Signup() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'surname':
                setSurname(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirm-password':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // validate form data
        const formData = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        };
        try {
            signUpSchema.parse(formData);
        } catch (error) {
            alert((error as ZodError).errors[0].message)
            console.log("error:", error);
            return;
        }

        // handle form submission logic
        const userInfo = {
            name: name,
            surname: surname,
            email: email,
            password: password,
        }
        console.log("userInfo:", userInfo);

        const response = await fetch('http://localhost:5001/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        const data = await response.json();

        if (data.error) {
            // show error message
            alert(data.message);
            return;
        }

        // show success message
        alert("You have successfully signed up! Please login to continue.")
        // redirect to login page
        router.push('/auth/sign-in');

    };

    return (
        <>
            <div className="bg-gray-100 flex h-full items-center py-16">
                <main className="w-full max-w-md mx-auto p-6">
                    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Already have an account?
                                    <Link
                                        className="text-blue-600 decoration-2 hover:underline font-medium"
                                        href="/auth/sign-in">
                                        Sign in here
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-5">
                                {/*
                                <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm">
                                    Sign up with Google
                                </button>
                                */}
                                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6">Or</div>

                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-y-4">



                                        <div>
                                            <label htmlFor="name" className="block text-sm mb-2">Name</label>
                                            <div className="relative">
                                                <input onChange={handleChange} type="text" id="name" name="name" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500" required />
                                                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                </div>
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include name</p>
                                        </div>

                                        <div>
                                            <label htmlFor="surname" className="block text-sm mb-2">Surname</label>
                                            <div className="relative">
                                                <input onChange={handleChange} type="text" id="surname" name="surname" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500" required />
                                                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                </div>
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include surname</p>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                                            <div className="relative">
                                                <input onChange={handleChange} type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500" required aria-describedby="email-error" />
                                                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                </div>
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                        </div>



                                        <div >
                                            <label htmlFor="password" className="block text-sm mb-2">Password</label>
                                            <div className="relative">
                                                <input onChange={handleChange} type="password" id="password" name="password" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500" required aria-describedby="password-error" />
                                                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">

                                                </div>
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                        </div>



                                        <div>
                                            <label htmlFor="confirm-password" className="block text-sm mb-2">Confirm Password</label>
                                            <div className="relative">
                                                <input onChange={handleChange} type="password" id="confirm-password" name="confirm-password" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500" required aria-describedby="confirm-password-error" />
                                                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">

                                                </div>
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="confirm-password-error">Passwords must match</p>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="flex">
                                                <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500" />
                                            </div>
                                            <div className="ml-3">
                                                <label htmlFor="remember-me" className="text-sm">I accept the <a className="text-blue-600 decoration-2 hover:underline font-medium" href="#">Terms and Conditions</a></label>
                                            </div>
                                        </div>
                                        <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">Sign up</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
