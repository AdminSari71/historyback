<template>
    <AuthenticatedLayout>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
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
                            <a href="#" @click="back">Volver</a>
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
        console.log("history",this.history);
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
