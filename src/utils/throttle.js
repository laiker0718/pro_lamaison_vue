/*
* @Description: throttle
* @Author: Clover
* @Date: 2020-12-27 10:09:00
* @LastEditTime: 2021-01-05 11:04:00
* @LastEditors: Clover
*/

function throttle(fn, gapTime = 1000) {
    let _lastTime = null
    return function(e) {
        let _nowTime = new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn(this, e)
            _lastTime = _nowTime
        }
    }
}

export default throttle