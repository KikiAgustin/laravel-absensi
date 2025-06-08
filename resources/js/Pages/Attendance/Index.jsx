import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

function Index({ attendances }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Attendances
                </h2>
            }
        >
            <Head title="Attendances" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between item-center mb-2">
                        <label> Total : {attendances.total}</label>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2">
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Alamat
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendances.data.map((attendance) => (
                                        <tr
                                            key={attendance.id}
                                            className="border-b"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {attendance.created_at}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {attendance.user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {attendance.status}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {attendance.address}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={attendances.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
