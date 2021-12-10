<template>
    <div class="w-full h-full" :class="`${lang}-form`">
        <div class="from-container relative w-full text-center z-10">
            <p class="register-word font-enMedium">
                {{ $t('register') }}
            </p>
            <p class="dear-word shadow-normal">
                {{ $t('dear-guest') }}
            </p>
            <div class="sex flex justify-evenly">
                <div v-for="(item, index) in sexData" :key="index">
                    <label class="shadow-normal flex items-center">
                        <label class="label-mr">
                            {{$t(item.sex)}}
                        </label>
                        <input v-model="form.sex" :value="item.value" class="rounded-full ipt-checkbox" type="radio" :id="item.sex" />
                        <span></span>
                    </label>
                </div>
            </div>
            <div class="form-data flex flex-col shadow-normal">
                <div v-if="$t(item.title) !== 'send code' && $t(item.title) !== ''" class="row-form flex justify-between" :class="[item.title === '' ? 'hidden' : '']" v-for="(item, index) in form.formData" :key="index">
                    <label>{{ $t(item.title) }}</label>
                    <input :class="[
              item.completed ? '' : 'error-input'
            ]" :style="{
              border: item.title === 'time-slot' && isReporter ? 0 : ''
            }" v-model="item.value" @input="validCode(item)" @click="item.title === 'time-slot' && !isReporter && showTime()" :readonly="item.title === 'time-slot' ? true : false" type="text" :maxlength="[item.title === 'verificationCode' ? '6' : '']" />
                </div>
                <div class="row-form flex justify-end" v-else :class="[lang === 'en' ? '' : 'hidden']">
                    <div class="send-code bg-black text-white" v-if="$t(item.title) === 'send code'" @click="canSendCode && sendCode()" ref="sendCode">
                        {{ $t(item.title) }}
                    </div>
                </div>
            </div>
            <div class="relative register-btn" @click="register">
                <img class="btn-ok relative" src="@/assets/image/home/ar-center-btn.png" />
                <div class="absolute word-ok">ok</div>
            </div>
            <div class="flex items-baseline items-center relative">
                <label class="policy-label">
                    <input type="checkbox" class="policy-check" v-model="acceptPolicy" />
                    <span :style="{'border-color': !acceptPolicy && unAcceptPolicy ? 'red !important' : ''}"></span>
                </label>
                <p class="policy-tip" @click="showPolicy">
                    i accept <span class="underline">{{ $t('policy-tip') }}</span>
                </p>
            </div>
            <div class="flex items-baseline items-center relative">
                <label class="policy-label-news">
                    <input type="checkbox" class="policy-check" v-model="acceptNews" />
                    <span></span>
                </label>
                <p class="policy-news">
                    sign up for newsletter
                </p>
            </div>
            <div class="flex items-baseline items-center relative">
                <label class="policy-label-with-one">
                    <input type="checkbox" class="policy-check" v-model="acceptWithOne" />
                    <span></span>
                </label>
                <p class="policy-with-one">
                    confirming my attendance with guest
                </p>
            </div>
            <div class="mailbox flex flex-col justify-center font-light text-black white" v-if="mailBoxModal">
                <template v-if="!mailCorrect">
                    <p>an error occurred while entering</p>
                    <p>your email address.</p>
                    <p class="font-enMedium">(ex. : xxx@domain.com)</p>
                </template>
                <template v-if="!pinCorrect">
                    <p>the code is incorrect,</p>
                    <p>please re-enter it</p>
                </template>
            </div>
            <div class="mailbox flex flex-col justify-center font-light text-black white" v-if="aboutFull">
                <div v-for="(item, index) in aboutFullTips[aboutFullIndex]" :key="index">
                    <p>{{item}}</p>
                </div>
            </div>
            <!-- date time -->
            <div class="time-container absolute flex flex-col justify-between" v-if="dateModal">
                <div class="flex flex-row time-part items-center justify-around">
                    <div class="flex flex-col items-center justify-center left-time-content">
                        <div :class="[dateIndex > 0 ? '' : 'arrow-hide']">
                            <img class="arrow-img" src="@/assets/image/index/up-angle.png" @click="onBtnPrevDay" />
                        </div>
                        <div>
                            <div class="time-day">{{dateLine[dateIndex].day}}</div>
                            <div class="time-month">october</div>
                        </div>
                        <div :class="[dateIndex < 3 ? '' : 'arrow-hide']">
                            <img class="arrow-img" src="@/assets/image/index/down-angle.png" @click="onBtnNextDay" />
                        </div>
                    </div>
                    <div class="right-time flex flex-col justify-center">
                        <div :class="[timeSelectIndex > 0 ? '' : 'arrow-hide']">
                            <img class="arrow-img-time" src="@/assets/image/index/up-angle.png" @click="onBtnPrevTime" />
                        </div>
                        <label class="font-enLight flex items-center right-time-content" v-for="(item, index) in selectTimes" :key="index" @click="onBtnTime(timeSelectIndex + index)">
                            <input :value="`${dateLine[dateIndex].date} ${item.time}`" v-model="timeValue" name="time" :type="item.select ? 'radio' : ''" style="display: none" />
                            <span :style="[{background: item.select ? '' : '#D6D6D6'}, {border: item.select ? '' : '0px solid #D6D6D6'}]"></span>
                            <!-- <div class="date-line">{{ item.date }}</div> -->
                            <div class="time-line" :style="{color: item.select ? '' : '#D6D6D6'}">{{ item.time }}</div>
                        </label>
                        <div :class="[timeSelectIndex < dateLine[dateIndex].time.length - 5 ? '' : 'arrow-hide']">
                            <img class="arrow-img-time" src="@/assets/image/index/down-angle.png" @click="onBtnNextTime" />
                        </div>
                    </div>
                </div>
                <div class="relative" @click="hideTime">
                    <img class="btn-ok relative" src="@/assets/image/home/ar-center-btn.png" />
                    <div class="absolute word-ok">ok</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import throttle from '../../../utils/throttle'

export default {
    filters: {
        capitalize(value) {
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    data() {
        return {
            reg: /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/, // mail regular expression
            canSendCode: true, // can click to send mail
            messageTimer: null,
            pinCorrect: true, // check valid code right?
            mailCorrect: true, // check mail right?
            mailBoxModal: false, // show err dialog of mail

            aboutFull: false, // is appointment full?
            aboutFullIndex: 0,
            aboutFullTips: [
                [
                    "the chosen time slot is",
                    "fully booked.",
                    "please choose another slot.",
                    "thank you",
                ],
                [
                    "thank you for your attention.",
                    "boucheron la maison event is fully",
                    "booked. please contact your",
                    "boucheron ambassador for",
                    "assistance.",
                ]
            ],
            isReporter: false, // is reporter?
            dateModal: false, // show date dialog?
            acceptPolicy: false, // accept policy?
            unAcceptPolicy: false, // unaccept policy?
            acceptNews: false, // accept news?
            acceptWithOne: false, // carry with someone?
            dateIndex: 0,
            timeIndex: 0,
            timeSelectIndex: 0,
            timeValue: '',
            selectTimes: [],
            dateLine: [{
                    day: '04',
                    date: '04 oct',
                    dateInfo: '2021-10-04',
                    time: [{
                            time: '10:00 am',
                            select: false
                        },
                        {
                            time: '11:00 am',
                            select: false
                        },
                        {
                            time: '12:00 pm',
                            select: false
                        },
                        {
                            time: '1:00 pm',
                            select: false
                        },
                        {
                            time: '2:00 pm',
                            select: false
                        },
                        {
                            time: '3:00 pm',
                            select: false
                        },
                        {
                            time: '4:00 pm',
                            select: false
                        },
                        {
                            time: '5:00 pm',
                            select: false
                        },
                        {
                            time: '6:00 pm',
                            select: false
                        },
                        {
                            time: '7:00 pm',
                            select: false
                        },
                        {
                            time: '8:00 pm',
                            select: false
                        },
                        {
                            time: '9:00 pm',
                            select: true
                        },
                        {
                            time: '10:00 pm',
                            select: false
                        },
                        {
                            time: '11:00 pm',
                            select: false
                        },
                    ],
                    type: 1
                }, {
                    day: '05',
                    date: '05 oct',
                    dateInfo: '2021-10-05',
                    time: [{
                            time: '10:00 am',
                            select: false
                        },
                        {
                            time: '11:00 am',
                            select: false
                        },
                        {
                            time: '12:00 pm',
                            select: false
                        },
                        {
                            time: '1:00 pm',
                            select: false
                        },
                        {
                            time: '2:00 pm',
                            select: false
                        },
                        {
                            time: '3:00 pm',
                            select: false
                        },
                        {
                            time: '4:00 pm',
                            select: false
                        },
                        {
                            time: '5:00 pm',
                            select: false
                        },
                        {
                            time: '6:00 pm',
                            select: false
                        },
                        {
                            time: '7:00 pm',
                            select: false
                        },
                        {
                            time: '8:00 pm',
                            select: false
                        },
                        {
                            time: '9:00 pm',
                            select: true
                        },
                        {
                            time: '10:00 pm',
                            select: false
                        },
                        {
                            time: '11:00 pm',
                            select: false
                        },
                    ],
                    type: 2
                }, {
                    day: '06',
                    date: '06 oct',
                    dateInfo: '2021-10-06',
                    time: [{
                            time: '10:00 am',
                            select: false
                        },
                        {
                            time: '11:00 am',
                            select: false
                        },
                        {
                            time: '12:00 pm',
                            select: false
                        },
                        {
                            time: '1:00 pm',
                            select: true
                        },
                        {
                            time: '2:00 pm',
                            select: false
                        },
                        {
                            time: '3:00 pm',
                            select: false
                        },
                        {
                            time: '4:00 pm',
                            select: false
                        },
                        {
                            time: '5:00 pm',
                            select: false
                        },
                        {
                            time: '6:00 pm',
                            select: false
                        },
                        {
                            time: '7:00 pm',
                            select: false
                        },
                        {
                            time: '8:00 pm',
                            select: false
                        },
                        {
                            time: '9:00 pm',
                            select: true
                        },
                        {
                            time: '10:00 pm',
                            select: false
                        },
                        {
                            time: '11:00 pm',
                            select: false
                        },
                    ],
                    type: 3
                }, {
                    day: '07',
                    date: '07 oct',
                    dateInfo: '2021-10-07',
                    time: [{
                            time: '10:00 am',
                            select: false
                        },
                        {
                            time: '11:00 am',
                            select: false
                        },
                        {
                            time: '12:00 pm',
                            select: false
                        },
                        {
                            time: '1:00 pm',
                            select: false
                        },
                        {
                            time: '2:00 pm',
                            select: false
                        },
                        {
                            time: '3:00 pm',
                            select: false
                        },
                        {
                            time: '4:00 pm',
                            select: false
                        },
                        {
                            time: '5:00 pm',
                            select: false
                        },
                        {
                            time: '6:00 pm',
                            select: false
                        },
                        {
                            time: '7:00 pm',
                            select: false
                        },
                        {
                            time: '8:00 pm',
                            select: false
                        },
                        {
                            time: '9:00 pm',
                            select: true
                        },
                        {
                            time: '10:00 pm',
                            select: false
                        },
                        {
                            time: '11:00 pm',
                            select: false
                        },
                    ],
                    type: 4
                },
            ],
            sexData: [
                { sex: 'mr', value: 1 },
                { sex: 'mrs', value: 0 }
            ],
            form: {
                sex: '',
                formData: [{
                        title: 'name',
                        value: '',
                        completed: true
                    },
                    {
                        title: 'family-name',
                        value: '',
                        completed: true
                    },
                    {
                        title: 'time-slot',
                        value: '',
                        completed: true
                    },
                    {
                        title: 'email',
                        value: '',
                        completed: true
                    },
                    {
                        title: 'sent-code'
                    },
                    {
                        title: 'verificationCode',
                        value: '',
                        completed: true
                    },
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['lang', 'code']),
        ...mapState({
            mailCode: (state) => state.register.mailCode,
            pauseTypes: (state) => state.register.pauseTypes,
        })
    },

    methods: {
        ...mapMutations({
            setFormData: 'register/setFormData',
            setCode: 'register/setCode'
        }),
        ...mapActions({
            registerApi: 'register/register',
            sendMail: 'register/sendMail',
            getPauseTypes: 'register/getPauseTypes',
        }),
        showMailBox() {
            this.mailBoxModal = true
            clearTimeout(this.messageTimer)
            this.messageTimer = setTimeout(() => {
                this.mailBoxModal = false
            }, 2000)
        },
        timeKill() {
            let time = 60
            let timer = setInterval(() => {
                time--
                this.$refs.sendCode.innerHTML = `${time}s`
                if (time < 0) {
                    clearInterval(timer)
                    this.canSendCode = true
                    this.$refs.sendCode.innerHTML = 'resend code'
                }
            }, 1000)
        },
        sendCode() {
            let mail = this.form.formData[3].value
            if (!this.reg.test(mail)) {
                this.showMailBox()
                this.mailCorrect = false
                this.pinCorrect = true
                return
            }

            let language = 1
            this.canSendCode = false // 禁止短时间多次发送
            this.timeKill() // 开启定时器
            this.sendMail({ mail, language })
        },
        validCode(data) {
            data.completed = true
        },
        showTime() {
            this.dateModal = true
        },
        hideTime() {
            this.dateModal = false
            this.form.formData.map((item) => {
                if (item.title === 'time-slot') {
                    item.value = this.timeValue
                    item.completed = true
                }
            })
        },
        onBtnPrevDay() {
            if (this.dateIndex <= 0) return
            else this.dateIndex--

            this.timeSelectIndex = 0
            this.selectTimes = this.dateLine[this.dateIndex].time.slice(0, 5)
        },
        onBtnNextDay() {
            if (this.dateIndex >= 3) return
            else this.dateIndex++

            this.timeSelectIndex = 0
            this.selectTimes = this.dateLine[this.dateIndex].time.slice(0, 5)
        },
        onBtnPrevTime() {
            if (this.timeSelectIndex > 0)
                this.timeSelectIndex--

            this.selectTimes = this.dateLine[this.dateIndex].time.slice(this.timeSelectIndex, this.timeSelectIndex + 5)
        },
        onBtnNextTime() {
            if (this.timeSelectIndex < this.dateLine[this.dateIndex].time.length - 5)
                this.timeSelectIndex++

            this.selectTimes = this.dateLine[this.dateIndex].time.slice(this.timeSelectIndex, this.timeSelectIndex + 5)
        },
        onBtnTime(index) {
            this.timeIndex = index
        },
        showPolicy() {
            this.$router.replace({
                path: '/privacy'
            })
        },
        hidePolicy() {
            this.acceptPolicy = true
        },
        register() {
            const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/

            let formData = this.form.formData.filter(
                (item) => item.title !== 'sent-code'
            )
            formData.map((item) => {
                item.value != undefined && (item.completed = false)
                item.value != undefined && item.value.length && (item.completed = true)
                if (item.title === 'verificationCode' && item.value != this.mailCode) {
                    item.completed = false
                    this.pinCorrect = false
                    this.mailCorrect = true
                    this.showMailBox()
                }
                if (item.title === 'email' && !this.reg.test(item.value)) {
                    item.completed = false
                }
            })

            if (!this.acceptPolicy) {
                this.unAcceptPolicy = true
            } else {
                this.unAcceptPolicy = false
            }
            // form data check
            formData.every((item) => item.value !== '') &&
                this.acceptPolicy &&
                this.sendData()
        },
        async sendData() {
            let firstName, secondName, formData, verificationCode, mail, date, type
            this.form.formData.map((item, index) => {
                switch (item.title) {
                    case 'name':
                        firstName = item.value
                        break
                    case 'family-name':
                        secondName = item.value
                        break
                    case 'verificationCode':
                        verificationCode = item.value
                        break
                    case 'email':
                        mail = item.value
                }
                const data = this.dateLine.filter((item) => {
                    if (item.title === this.timeValue) {
                        return item
                    }
                })
                let dateTimeType = this.dateIndex * 14 + this.timeIndex
                let dateTime = this.dateLine[this.dateIndex].dateInfo

                formData = {
                    sex: this.form.sex,
                    date: this.isReporter ? '2021-03-25' : dateTime,
                    mail,
                    code: verificationCode,
                    name: firstName + secondName,
                    type: this.isReporter ? 1 : dateTimeType,
                    open_id: this.source,
                    sign: this.acceptNews,
                    carry: this.acceptWithOne,
                    language: 1
                }
            })
            let res = await this.registerApi(formData)
            this.setFormData(formData)
            this.setCode(res.data.code)
            this.$router.replace({ path: '/home' })
        }
    },
    created() {
        const jump = this.$route.query.jump || ''
        this.source = this.$route.query.source || ''
        localStorage.setItem('jump', jump)

        // get paused datetime indexes, then delete from the whole datetime array
        this.getPauseTypes().then(() => {
            // appointment full
            if (this.pauseTypes.pause_type.length >= 64) {
                this.aboutFull = true
                this.aboutFullIndex = 1
            }
            console.log('pause types: ', this.pauseTypes.pause_type)
            for (let index = 0; index < this.pauseTypes.pause_type.length; index++) {
                let item = this.pauseTypes.pause_type[index]
                let dateIndex = parseInt(item / 14)
                let timeIndex = parseInt(item % 14)
                this.dateLine[dateIndex].time[timeIndex].select = false
            }

            this.selectTimes = this.dateLine[0].time.slice(0, 5)
        })

        // about jump: 'day' is the openning day, only reporters can come in
        if (jump !== 'day') return
        else {
            this.isReporter = true
            this.form.formData.map((item) => {
                if (item.title === 'time-slot') {
                    item.value = '3月25日 10:00 - 16:00'
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
.register-content {
    width: 689px;
    height: 1069px;
    .from-container {
        padding-top: 86px;
        .register-word {
            font-size: 58px;
            line-height: 66px;
            height: 66px;
            margin-bottom: 44px;
        }
        .dear-word {
            font-size: 40px;
            height: 50px;
            margin-bottom: 44px;
            text-shadow: 6px 6px 6px rgba(255, 255, 255, 0.16);
        }
        .label-mr {
            height: 40px;
            font-size: 30px;
            margin-right: 16px;
        }
        .ipt-checkbox {
            display: none;
        }
        label.shadow-normal span {
            background-color: white;
            border-radius: 50%;
            border: 2px solid #000;
            width: 24px;
            height: 24px;
            display: inline-block;
            text-align: center;
            line-height: 28px;
        }
        label.shadow-normal input[type='radio']:checked+span {
            position: relative;
        }
        label.shadow-normal input[type='radio']:checked+span:after {
            content: '';
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
            background: #000;
            height: 24px;
            width: 24px;
        }
        .sex {
            margin-bottom: 40px;
        }
        .form-data {
            margin-bottom: 30px;
            padding-left: 42px;
            padding-right: 42px;
            .row-form:not(:nth-child(7)) {
                margin-bottom: 20px;
            }
            label {
                font-size: 22px;
            }
            input {
                border: 2px solid #000000;
                width: 340px;
                height: 36px;
            }

            .send-code {
                width: 186px;
                height: 34px;
                font-size: 24px;
            }
        }

        .btn-ok {
            width: 137px;
            height: 88px;
            margin: 30px auto;
        }
        .word-ok {
            color: #fff;
            font-size: 24px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
    // Chinese
    .zh-form {
        .form-data {
            margin-bottom: 0;
            .row-form {
                &:not(:nth-child(7)) {
                    margin-bottom: 56px !important;
                }
                &:nth-child(7) {
                    margin-bottom: 62px !important;
                }
                input {
                    width: 355px;
                    height: 48px;
                    line-height: 48px;
                    font-size: 30px;
                }
            }
        }
    }
    // english
    .en-form {
        .mailbox {
            position: absolute;
            top: 500px;
            left: 50%;
            transform: translateX(-50%);
            width: 630px;
            height: 252px;
            font-size: 28px;
            line-height: 48px;
            border: 2px solid #000000;
            background-color: #fff;
            text-align: center;
            z-index: 99;
        }
    }
    .time-container {
        left: 30px;
        top: 270px;
        width: 630px;
        height: 680px;
        background: #ffffff;
        border: 2px solid #000;
        .time-part {
            padding-top: 140px;
        }
        .time-day {
            font-size: 114px;
            line-height: 124px;

        }
        .time-month {
            font-size: 34px;
        }
        .left-time-content {
            /* margin-left: 52px; */
            width: 330px;
            height: 300px;
            white-space: nowrap;
        }
        .arrow-img {
            width: 50px;
            height: 24px;
            margin: 10px 0px;
        }
        .arrow-hide {
            opacity: 0;
        }
        .right-time {
            width: 300px;
            height: 300px;
            font-family: 'enMedium';
            label {
                font-size: 30px;
            }
            .right-time-content {
                margin: 10px 0px;
                /* margin-bottom: 24px;*/
                /* margin-left: 162px; */
                white-space: nowrap;
            }
            .date-line {
                display: inline-block;
                margin-left: 32px;
                font-size: 32px;
            }
            span {
                background-color: white;
                border-radius: 50%;
                border: 2px solid #000;
                width: 30px;
                height: 30px;
                display: inline-block;
                text-align: center;
                line-height: 20px;
            }
            input[type='radio']:checked+span {
                position: relative;
            }
            input[type='radio']:checked+span:after {
                content: '';
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                position: absolute;
                background: #000;
                height: 30px;
                width: 30px;
            }
            input {
                width: 32px;
                height: 30px;
                box-sizing: content-box;
            }
            .arrow-img-time {
                width: 50px;
                height: 24px;
                margin: 10px auto;
            }
        }
    }
    .policy-check {
        width: 24px;
        height: 24px;
        display: none;
    }
    .policy-check+span {
        vertical-align: middle;
        width: 25px;
        height: 25px;
        border: 2px gray solid;
        display: inline-block;
        background-color: white;
    }
    .policy-check:checked+span {
        border: 2px #000 solid;
        position: relative;
    }
    .policy-check:checked+span::after {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #000;
        font-weight: bold;
        content: '\2714';
        font-size: 18px;
    }
    .policy-tip {
        padding-left: 200px;
        text-align: left;
        width: 560px;
        font-size: 20px !important;
        height: 44px;
    }
    .policy-news {
        padding-left: 200px;
        text-align: left;
        width: 560px;
        font-size: 20px !important;
        height: 44px;
        padding-top: 28px;
    }
    .policy-with-one {
        padding-left: 200px;
        text-align: left;
        width: 560px;
        font-size: 20px !important;
        height: 44px;
        padding-top: 44px;
    }
}
.register-btn {
    margin-bottom: 34px;
}
.privacy-container {
    padding: 84.74px 0 112px 0;
    .privacy-word {
        font-size: 50px;
        line-height: 76px;
        height: 76px;
        margin-bottom: 72px;
    }
    .privacy-content {
        font-size: 30px;

        height: 488px;
        margin-bottom: 144px;
    }
    .word-accept {
        color: #fff;
        font-size: 22px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .btn-accept {
        width: 115px;
        height: 74px;
        margin: 0 auto;
    }
}
.error-input {
    border-color: red !important;
}
.row-form input {
    text-align: left;
    padding-left: 14px;
    padding-top: 4px;
}
.time-line {
    margin-left: 44px;
    font-size: 30px;
    height: 60px;
    line-height: 60px;
}
.font-en-small {
    font-size: 24px !important;
}
.policy-label {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 150px;
    top: 0px;
}
.policy-label-news {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 150px;
    padding-top: 26px;
}
.policy-label-with-one {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 150px;
    padding-top: 44px;
}
input {
    -webkit-appearance: none;
    /*清除ios默认圆角*/
    border-radius: 0;
    line-height: 36px;
}
</style>