import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

import { Loader } from "@googlemaps/js-api-loader";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Selecbox from "@/Components/Selectbox";

function SubmitAttendance() {
    const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["geocoding"],
    });

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
        address: "",
    });

    const getLatLing = (e) => {
        e.preventDefault();

        navigator.geolocation.getCurrentPosition(
            function (position) {
                createGeocoder(position.coords);
            },
            function (error) {
                alert("Tidak bisa mendapatkan lokasi");
            }
        );
    };

    function createGeocoder(coordinates) {
        loader.load().then(() => {
            const geocoder = new google.maps.Geocoder();

            geocoder
                .geocode({
                    location: {
                        lat: coordinates.latitude,
                        lng: coordinates.longitude,
                    },
                })
                .then((response) => {
                    if (!response.results[0]) {
                        alert("Tidak bisa mendapatkan lokasi");
                        return;
                    }
                    setData("prepareData", {
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        address: response.results[0].formatted_address,
                    });
                });
        });
    }

    useEffect(() => {
        if (data.prepareData.hasOwnProperty("address")) {
            transform((data) => ({
                ...data.prepareData,
                status: data.status,
                description: data.description,
            }));

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
        <form onSubmit={getLatLing} className="mt-6 space-y-6">
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
