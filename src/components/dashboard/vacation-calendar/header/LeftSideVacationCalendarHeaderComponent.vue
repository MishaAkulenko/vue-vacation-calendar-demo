<template>
    <div class='flex-center'>
        <i class="material-icons" @click="decrementDate" :class="{unactive: isSelectedDateIntervalFirst}">keyboard_arrow_left</i>
        <i class="material-icons" @click="incrementDate" :class="{unactive: isSelectedDateIntervalPast}">keyboard_arrow_right</i>
        <div class='vacation-info subtitle'>
            <span>{{ $t('dashboard.reserved', {days:reservedDaysNumber, dayLocale: getDateLocale(reservedDaysNumber, 'days')}) }}</span>
            <span v-show="hasActiveSelectedDay">
                    <i class="material-icons done-all" title='Запросить' @click="sendSelectedPeriodToConfirm">done_all</i>
                    <i class="material-icons clear-all" title='Очистить все' @click="clearSelectedList">clear_all</i>
                </span>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapState, mapActions} from "vuex";
    import {MONTHS_NAMES} from "@/const";
    const todayDateMonth = new Date().getMonth(),
        todayDateYear = new Date().getFullYear(),
        initDatePeriod = {
            month: todayDateMonth,
            year:todayDateYear,
        };

    export default {
        name: "LeftSideVacationCalendarHeaderComponent",
        props:{
            monthsList: Array,
            yearsList: Array,
        },
        computed:{
            ...mapState({
                selectedDateInterval: state => state.dashboard.currentDateIntervalToRender,
                vacationPeriodToConfirmation: state => state.dashboard.vacationPeriodToConfirmation,
                availDays: state => state.dashboard.availDaysToVacation,
                reservedDays: state => state.dashboard.reservedDays,
                user: state => state.auth.user,
            }),
            isSelectedDateIntervalFirst(){
                return this.selectedDateInterval.year === initDatePeriod.year && this.selectedDateInterval.month === initDatePeriod.month
            },
            isSelectedDateIntervalPast(){
                const lastYear = this.yearsList[this.yearsList.length - 1].value,
                    lastMonth = this.monthsList[this.monthsList.length - 1].value;

                return this.selectedDateInterval.year === lastYear && this.selectedDateInterval.month === lastMonth
            },
            hasActiveSelectedDay(){
                const compareDateIntervals = () => {
                    let isCompare = true;
                    this.vacationPeriodToConfirmation.forEach((day)=>{
                        let datesCompare = this.reservedDays.find((item)=>{
                            return item.getTime() === day.getTime()
                        });
                        if (!datesCompare) {isCompare = false}
                    });

                    return isCompare;
                };

                return this.vacationPeriodToConfirmation.length !== this.reservedDays.length || !compareDateIntervals();
            },
            reservedDaysNumber(){
                return this.reservedDays.length
            }
        },
        methods:{
            ...mapActions('dashboard',['SEND_SELECTED_VACATION']),
            ...mapMutations('dashboard',['SET_CURRENT_DATE_INTERVAL_FOR_RENDER', 'CLEAR_VACATION_RESERVE_LIST', 'SET_ACTIVE_VOCATION_DAYS']),
            incrementDate(){
                if (this.isSelectedDateIntervalPast) return;

                let {month, year} = this.selectedDateInterval;
                if ( month === MONTHS_NAMES.length - 1) { // If selected month is Feb then increment year also
                    month = 0;
                    year++;
                } else {
                    month++;
                }
                this.SET_CURRENT_DATE_INTERVAL_FOR_RENDER({month, year})
            },
            decrementDate(){
                if (this.isSelectedDateIntervalFirst) return;

                let {month, year} = this.selectedDateInterval;
                if ( this.selectedDateInterval.month === 0) { // If selected month is Jan then decrement year also
                    month = this.monthsList.length - 1;
                    year--;
                } else {
                    month--;
                }
                this.SET_CURRENT_DATE_INTERVAL_FOR_RENDER({month, year})
            },
            sendSelectedPeriodToConfirm(){
                this.SEND_SELECTED_VACATION(this.reservedDays);
                this.SET_ACTIVE_VOCATION_DAYS(this.user.vacation_days - this.reservedDaysNumber)
            },
            clearSelectedList(){
                this.CLEAR_VACATION_RESERVE_LIST();
            },
        },

    }
</script>

<style lang="scss" scoped>
    .subtitle {
        display: flex;
        align-items: center;
        margin-left: 20px;
        span {
            margin: 0 20px;
        }
        .done-all {
            &:hover {
                color: #6DBCDB;
            }
        }
        .clear-all {
            &:hover {
                color: rgba(255, 0, 0, 0.7);
            }
        }
    }

</style>
