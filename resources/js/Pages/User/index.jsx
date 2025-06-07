import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

export default function UserIndex({ auth, users }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between item-center mb-2">
                        <label> Total Data User : {users.total}</label>
                        <Link
                            href={route("users.create")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create User
                        </Link>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2">
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Id
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.role}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link
                                                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                                    href={route(
                                                        "users.edit",
                                                        user.id
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={users.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
