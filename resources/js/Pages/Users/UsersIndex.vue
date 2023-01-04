<template>
    <Head title="Usuarios" />

    <AuthenticatedLayout>
        <template #header>
            <h2>Usuarios</h2>
        </template>

        <div class="container mx-auto mt-10">
            <table class="min-w-full hover:table-fixed">
                <thead class="border-b">
                    <tr>
                        <th class="text-left">Nombre</th>
                        <th class="text-left">email</th>
                        <th class="text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        v-for="item in users.data"
                        :key="item.id"
                    >
                        <td class="p-3">{{ item.name }}</td>
                        <td>{{ item.email }}</td>

                        <td
                            class="inline-flex items-center m-2 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <button @click="edit(item.id)">edit</button>
                        </td>
                    </tr>
                </tbody>
                <pagination class="mt-6" :links="users.links" />
            </table>
        </div>
    </AuthenticatedLayout>
</template>
<script>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import Pagination from "@/Components/Pagination.vue";
import { Inertia } from "@inertiajs/inertia";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
    components: {
        AuthenticatedLayout,
        Head,
        Link,
        Pagination,
    },
    props: {
        users: Object,
    },
    data() {
        return {
            toggle_exclusive: 0,
            hover: true,
            dialog: false,
            page: this.users.current_page,
            loading: false,
        };
    },
    mounted() {
        this.historyIncrement(window.location.href);
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
        click() {
            this.$inertia.get(
                this.users.links[this.page].url,
                {},
                {
                    onStart: (visit) => {
                        this.loading = true;
                    },
                }
            );
        },

        edit(id) {
            this.historyIncrement(route("users.edit", id));
            this.$inertia.get(route("users.edit", id));
        },
    },
};
</script>
