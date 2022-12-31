import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

// Create a new store instance.
import { createStore } from "vuex";
const store = createStore({
    state() {
        return {
            history: ["/"],
        };
    },
    getters: {
        getHistory(state) {
            return state.history[state.history.length - 1];
        },
    },
    mutations: {
        reset(state) {
            state.history = ["/"];
        },
        increment(state, url) {
            if (url != _.last(state.history))
                state.history.push(url);
        },
        decrease(state) {
            if (state.history.length > 1) state.history.pop();
        },
    },
    actions: {
        historyReset(context) {
            context.commit("reset");
        },
        historyIncrement(context, url) {
            context.commit("increment", url);
        },
        historyBack(context) {
            context.commit("decrease");
        },
    },
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(store)
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
