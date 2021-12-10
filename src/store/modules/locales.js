/*
* @Description: local language
* @Author: Lance
* @Date: 2020-11-22 15:15:00
* @LastEditTime: 2021-12-01 16:29:00
* @LastEditors: Clover
*/

const SET_LANG = "SET_LANG";

const locales = {
    state: {
        lang: "",
    },
    mutations: {
        [SET_LANG](state, lang) {
            state.lang = lang;
        },
    },
};

export default locales;