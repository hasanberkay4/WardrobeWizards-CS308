export default function Signup() {
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
                                    <a className="text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/signin.html">
                                        Sign in here
                                    </a>
                                </p>
                            </div>

                            <div className="mt-5">
                                <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm">
                                    Sign up with Google
                                </button>

                                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6">Or</div>

                                <form>
                                    <div className="grid gap-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                                            <div className="relative">
                                                <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500" required aria-describedby="email-error" />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">

                                                </div>
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                        </div>



                                        <div>
                                            <label htmlFor="password" className="block text-sm mb-2">Password</label>
                                            <div className="relative">
                                                <input type="password" id="password" name="password" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500" required aria-describedby="password-error" />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">

                                                </div>
                                            </div>
                                            <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                        </div>



                                        <div>
                                            <label htmlFor="confirm-password" className="block text-sm mb-2">Confirm Password</label>
                                            <div className="relative">
                                                <input type="password" id="confirm-password" name="confirm-password" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500" required aria-describedby="confirm-password-error" />
                                                <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">

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
