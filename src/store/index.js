import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import moment from "moment";
const  format = 'YYYY-MM-DD'
export default new Vuex.Store({
    state: {
        picker: moment().format(format),
        calendarType: 'month'

    },
    mutations: {
        mutatePicker(state, picker) {
            state.picker = picker
        },
        mutateCalendarType(state, calendarType) {
            state.calendarType = calendarType
        },
        mutateToPreviousDate(state) {
            state.picker = moment(state.picker, format).subtract(1, state.calendarType).format(format)
        },
        mutateToNextDate(state) {
            state.picker = moment(state.picker, format).add(1, state.calendarType).format(format)
        }
    },
    actions: {
        updatePicker({commit}, picker) {
            commit('mutatePicker', picker)
        },
        updateCalendarType({commit}, calendarType) {
            commit('mutateCalendarType', calendarType)
        },
        callPreviousDate({commit}) {
            commit('mutateToPreviousDate')
        },
        callNextDate({commit}) {
            commit('mutateToNextDate')
        }
    },
    getters: {
        getPicker(state) {
            return state.picker;
        },
        getCalendarType(state) {
            return state.calendarType;
        }
    },
    modules: {}
})
