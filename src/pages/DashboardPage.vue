<template>
    <div class="home-page-wrapper container" v-if="isLogged">
        <HeaderComponent></HeaderComponent>
        <VacationCalendarComponent></VacationCalendarComponent>
    </div>
</template>

<script>
    import HeaderComponent from '../components/dashboard/DashboardHeaderComponent.vue'
    import VacationCalendarComponent from '../components/dashboard/vacation-calendar/VacationCalendarComponent.vue'

    import {mapGetters} from 'vuex';

    export default {
        name: "DashboardPage",
        components:{
            HeaderComponent,
            VacationCalendarComponent,
        },
        computed:{
            ...mapGetters({
                isLogged: 'auth/isLogged'
            })
        }
    }
</script>

<style lang="scss" scoped>
    .home-page-wrapper {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 80px 1fr;
        height: 100vh;
        grid-gap: 20px;
    }
</style>
