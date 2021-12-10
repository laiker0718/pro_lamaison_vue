/*
* @Description: api interface
* @Author: Evan
* @Date: 2020-11-20 16:09:00
* @LastEditTime: 2021-01-16 18:04:00
* @LastEditors: Clover
*/

import axios from "axios";

/*
 *@method register
 *@param userInfo json
    {
        code,
        open_id,
        name,
        sex,
        mail,
        type, // reporter or public
        date, // select datetime
        sign, // accept news?
        carry, // carry with someone
        language,
    }
 *@return json -- api docs
*/
function register(userInfo) {
    return axios.post(
        "https://boucheronexperience.com/api/bou/set-mail-user",
        userInfo
    );
}

/*
 *@method sendMail
 *@param json
    {
        mail,
        language,
    }
 *@return json -- api docs
*/
function sendMail(mail) {
    return axios.post(
        "https://boucheronexperience.com/index.php/api/bou/send-code",
        mail
    );
}

/*
 *@method getPauseTypes
 *@param none
 *@return json -- api docs
*/
function getPauseTypes() {
    return axios.post(
        "https://boucheronexperience.com/index.php/api/bou/pause-type"
    );
}

export {
    register,
    sendMail,
    getPauseTypes,
};