import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Selecbox from "@/Components/Selectbox";
import { Transition } from "@headlessui/react";

import roles from "@/data/role.json";

function Edit({ user }) {
    const {
        data,
        setData,
        patch,
        reset,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        uid: user.uid || "",
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
        role: user.role,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("users.update", user.id), {
            preserveScroll: true,
            onSuccess: () => {
                alert("User edited");
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    window.Echo.channel("read-rfid-channel").listen("ReadRfidEvent", (e) => {
        if (e.code == "EXISTS") {
            errors.uid = e.message;
            reset("uid");
        } else {
            (errors.uid = ""), reset("uid");
            setData("uid", e.uid);
        }
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Edit User
                                </h2>
                            </header>
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="uid" value="RFID" />
                                    <TextInput
                                        id="uid"
                                        className="mt-1 block w-full"
                                        value={data.uid}
                                        onChange={(e) =>
                                            setData("uid", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.uid}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                        autoComplete="username"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="role" value="Role" />
                                    <Selecbox
                                        id="role"
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        options={roles}
                                        currentValue={user.role}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.role}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="New Password"
                                    />
                                    <TextInput
                                        id="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Save
                                    </PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Edit;
