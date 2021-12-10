/*
* @Description: regist function
* @Author: Evan
* @Date: 2020-11-05 10:15:00
* @LastEditTime: 2021-12-14 11:04:00
* @LastEditors: Clover
*/

import * as Api from "@/api/api";

const register = {
    state: {
        FormData: {},
        code: localStorage.getItem("code") || "",
        mailCode: "",
        pauseTypes: {},
    },
    mutations: {
        setFormData(state, info) {
            localStorage.setItem("userInfo", JSON.stringify(info));
            state.FormData = info;
        },
        setCode(state, code) {
            localStorage.setItem("code", code);
            state.code = code;
        },
        validMailCode(state, mailCode) {
            state.mailCode = mailCode;
        },
        pauseTypes(state, types) {
            state.pauseTypes = types;
        },
    },
    actions: {
        register({}, userInfo) {
            return new Promise((resolve, reject) => {
                Api.register(userInfo).then((res) => {
                    resolve(res.data);
                });
            });
        },
        sendMail({ commit }, mail) {
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await Api.sendMail(mail);
                    const { status } = res.data;
                    if (status == 0) {
                        commit("validMailCode", res.data.data.send_code);
                        resolve();
                    }
                } catch (error) {
                    reject(error);
                }
            });
        },
        getPauseTypes({ commit }) {
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await Api.getPauseTypes();
                    // status : 0 success
                    if (!res.data.status) {
                        commit("pauseTypes", res.data.data);
                    }
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        },
    },
};

export default register;