import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Selecbox from "@/Components/Selectbox";
import { Transition } from "@headlessui/react";

function SubmitAttendance() {
    const [transitioning, setTransitioning] = useState(false);

    const {
        data,
        setData,
        post,
        transform,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        status: "attend",
        description: "",
        latitude: "",
        longitude: "",
        prepareData: {},
    });

    const submit = (e) => {
        e.preventDefault();

        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);

                setData("prepareData", {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            function (error) {
                alert("Tidak bisa mendapatkan lokasi");
            }
        );
    };

    useEffect(() => {
        transform((data) => ({
            ...data.prepareData,
            status: data.status,
            description: data.description,
        }));

        if (
            data.prepareData.hasOwnProperty("latitude") &&
            data.prepareData.hasOwnProperty("longitude")
        ) {
            post(route("attendances.submit"), {
                preserveScroll: true,
                onSuccess: () => {
                    alert("Absensi berhasil dibuat");
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
        }
    }, [data.prepareData]);

    useEffect(() => {
        if (data.status === "attend") {
            setTransitioning(false);
        } else {
            setTransitioning(true);
        }
    }, [data.status]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="status" value="Silahkan lakukan absensi" />
                <Selecbox
                    id="status"
                    onChange={(e) => setData("status", e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                    options={[
                        { value: "attend", label: "Hadir" },
                        { value: "leave", label: "Cuti" },
                        { value: "sick", label: "Sakit" },
                        { value: "permint", label: "Izin" },
                        {
                            value: "business_trip",
                            label: "Perjalanan Dinas",
                        },
                        { value: "remote", label: "Kerja dari rumah" },
                    ]}
                />
                <InputError message={errors.status} className="mt-2" />
            </div>
            <Transition
                show={transitioning}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div>
                    <InputLabel htmlFor="description" value="Penjelasan" />
                    <TextInput
                        id="description"
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full"
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>
            </Transition>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Absensi</PrimaryButton>
            </div>
        </form>
    );
}

export default SubmitAttendance;
