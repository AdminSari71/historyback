<template>
    <AuthenticatedLayout>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div
                    v-if="$page.props.flash.message"
                    class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                    role="alert"
                >
                    <div class="flex">
                        <div class="py-1">
                            <svg
                                class="fill-current h-6 w-6 text-teal-500 mr-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                                />
                            </svg>
                        </div>
                        <div>
                            <p class="font-bold">
                                {{ $page.props.flash.message }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 class="text-lg font-medium text-gray-900">
                            Profile Information
                        </h2>

                        <p class="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email
                            address.
                        </p>
                    </header>

                    <form @submit.prevent="submit" class="mt-6 space-y-6">
                        <div>
                            <InputLabel for="name" value="Name" />

                            <TextInput
                                id="name"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="form.name"
                                required
                                autofocus
                                autocomplete="name"
                            />

                            <InputError
                                class="mt-2"
                                :message="form.errors.name"
                            />
                        </div>

                        <div>
                            <InputLabel for="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                class="mt-1 block w-full"
                                v-model="form.email"
                                required
                                autocomplete="email"
                            />

                            <InputError
                                class="mt-2"
                                :message="form.errors.email"
                            />
                        </div>

                        <div class="flex items-center gap-4">
                            <PrimaryButton :disabled="form.processing"
                                >Save</PrimaryButton
                            >
                            <a
                                class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                href="#"
                                @click="back"
                                >Volver</a
                            >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<script>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link } from "@inertiajs/inertia-vue3";
import { useForm } from "@inertiajs/inertia-vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";

import { mapGetters, mapState, mapActions } from "vuex";
export default {
    components: {
        AuthenticatedLayout,
        useForm,
        Head,
        Link,
        InputLabel,
        InputError,
        PrimaryButton,
        TextInput,
    },
    props: {
        user: Object,
    },

    data() {
        return {
            form: useForm(this.user),

            loading: false,
        };
    },
    mounted() {
        console.log("history", this.history);
    },
    computed: {
        ...mapGetters(["getHistory"]),
        ...mapState(["history"]),
    },
    methods: {
        ...mapActions(["historyIncrement", "historyBack"]),
        back() {
            this.historyBack();

            this.$inertia.get(this.getHistory);
        },
        submit() {
            this.form.put(route("users.update", this.user.id), {
                onFinish: () => {},
            });
        },
    },
};
</script>
