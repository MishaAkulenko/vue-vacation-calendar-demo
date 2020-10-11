<template>
        <main class="calendar-wrapper">
            <VacationCalendarHeaderComponent></VacationCalendarHeaderComponent>
            <VacationCalendarBodyComponent></VacationCalendarBodyComponent>
        </main>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import VacationCalendarHeaderComponent from './header/VacationCalendarHeaderComponent.vue'
    import VacationCalendarBodyComponent from './body/VacationCalendarBodyComponent.vue'

    export default {
        name: "VacationCalendarComponent",
        components:{
            VacationCalendarHeaderComponent,
            VacationCalendarBodyComponent,
        },
        computed:{
            ...mapState({
                user: state => state.auth.user,
            }),
        },
        methods:{
            ...mapActions('dashboard', ['GET_USERS_LIST']),
            ...mapMutations('dashboard', ['SET_ACTIVE_VOCATION_DAYS']),
        },
        created(){
            this.SET_ACTIVE_VOCATION_DAYS(this.user.vacation_days);
            this.GET_USERS_LIST();
        }
    }
</script>

<style lang="scss" scoped>
    .calendar-wrapper {
        width: 100%;
        height: 100%;
        border: 1px solid #afc7da;
        border-radius: 5px;
        box-sizing: border-box;
        display: grid;
        grid-template-rows: 60px 1fr;
    }

</style>
