<template>
    <Head title="Empresas" />

    <AuthenticatedLayout>
        <template #header>
            <h2>Empresas</h2>
        </template>
        <div class="container mx-auto mt-10">
        
            <p>Usuarios de la Empresa XXXX</p>
                {{ user.name }}
                            <button class="mx-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"  @click="edit(1)">editar usuario 1</button>
                            <button class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"  @click="back()">volver</button>
                            </div>
        
    </AuthenticatedLayout>
</template>
<script>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link, useForm } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
    components: {
        AuthenticatedLayout,
        Head,
        Link,
    },
    props: {
        user: Object
    },
    data() {
        return {
            
        };
    },
    mounted() {
        this.historyIncrement(window.location.href);
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
        edit(id) {
            this.historyIncrement(route("users.edit", id));
            this.$inertia.get(route("users.edit", id));
        
        },
    },
};
</script>
