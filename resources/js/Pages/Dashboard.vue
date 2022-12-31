<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">You're logged in!</div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<script>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link } from "@inertiajs/inertia-vue3";
import { Inertia } from "@inertiajs/inertia";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
    components: {
        AuthenticatedLayout,
        Head,
        Link,
    },

    data() {
        return {
            
        };
    },
    mounted() {
        this.historyReset();
        console.log(this.history);
    },
    computed: {
        ...mapGetters(["getHistory"]),
        ...mapState(["history"]),
    },
    methods: {        
        ...mapActions(["historyReset"]),
    },
};
</script>
