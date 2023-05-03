import Image from "next/image"
import { useState } from "react"
import { handleProfileEditSubmit } from "../../scripts/profile/profileEdit"
import { useAuth } from "../../context/Auth"

export type ProfileEditProps = {
    userInfo: {
        name: string
        surname: string
        email: string
        address: string
    }
}

export default function ProfileEdit({ userInfo }: ProfileEditProps) {

    const [name, setName] = useState(userInfo.name)
    const [surname, setSurname] = useState(userInfo.surname)
    const [email, setEmail] = useState(userInfo.email)
    const [address, setAddress] = useState(userInfo.address)

    const { token } = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        if (token) {
            handleProfileEditSubmit({ userInfo: { name, surname, email, address } }, token)
        }
        else {
            console.error("Error: token not found")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "name":
                setName(e.target.value)
                break
            case "surname":
                setSurname(e.target.value)
                break
            case "email":
                setEmail(e.target.value)
                break
            case "address":
                setAddress(e.target.value)
                break
            default:
                break
        }
    }

    return (
        <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            {/* <!-- Card --> */}
            <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Profile
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage your name, password and account settings.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* <!-- Grid --> */}
                    <div className="grid grid-cols-12 gap-4 sm:gap-6">

                        {/* <!-- End Col --> */}

                        <div className="col-span-3">
                            <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                Full name
                            </label>
                            <div className="hs-tooltip inline-block">
                                <button type="button" className="hs-tooltip-toggle ml-1">
                                    <svg className="inline-block w-3 h-3 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                </button>
                                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700" role="tooltip">
                                    Displayed on public forums, such as Preline
                                </span>
                            </div>
                        </div>
                        {/* <!-- End Col --> */}

                        <div className="col-span-9">
                            <div className="sm:flex">
                                <input
                                    onChange={handleChange}
                                    id="af-account-full-name"
                                    type="text"
                                    className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                    placeholder="Maria" />
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Boone" />
                            </div>
                            {/* <!-- End Col --> */}

                            <div className="col-span-3">
                                <label htmlFor="af-account-email" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                    Email
                                </label>
                            </div>
                            {/* <!-- End Col --> */}

                            <div className="col-span-9">
                                <input
                                    onChange={handleChange}
                                    id="af-account-email" type="email" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="maria@site.com" />
                            </div>


                            <div className="col-span-3">
                                <label htmlFor="af-account-password" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                    Password
                                </label>
                            </div>


                            <div className="col-span-9">
                                <div className="space-y-2">
                                    <input
                                        // onChange={handleChange}
                                        id="af-account-password" type="text" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter current password" />
                                    <input type="text" className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter new password" />

                                </div>


                                <div className="col-span-3">
                                    <label htmlFor="af-account-bio" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                        Address
                                    </label>
                                </div>


                                <div className="col-span-9">
                                    <textarea id="af-account-bio" className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" rows={6} placeholder="Type your address..."></textarea>
                                </div>

                            </div>


                            <div className="mt-5 flex justify-end gap-x-2">
                                <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                    Cancel
                                </button>
                                <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}