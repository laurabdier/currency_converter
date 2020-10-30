import { makeAutoObservable, observable } from "mobx";
import request from 'async-request';

const apiKey = "8af875955272a02de85e98fc2e5dafbb";
const constructorUrl = `https://data.fixer.io/api/latest?access_key=${apiKey}`;


// Model the application state.
class Brain {
    currency1 = null;
    currency2 = null;
    amount = 1;
    result = null;
    currencies = [];
    date = new Date().toISOString().slice(0,10);
    todayRate = null;
    rate = [];

    state = "loading";

    constructor() {
        makeAutoObservable(this, {
            currency1 : observable,
            currency2 : observable,
            amount : observable,
            result : observable,
            rate : observable,
            date : observable,
            todayRate : observable,
            currencies : observable,
            state : observable
        });
    }

    async init(){
        await request(constructorUrl)
        .then(response => {
            response = JSON.parse(response.body);
            
            this.currency1 = response.base;
            this.currency2 = response.base;
            this.todayRate = 1.00;
            this.result = 1.00;

            this.currencies = Object.keys(response.rates);
            this.rate = response.rates;
            this.state = "ok";
        })
        .catch(err => {
            this.state = "error";
        })
    }

    setCurrency1(event) {
        this.currency1 = event.target.value;
        if(this.amount > 0) this.convert();
    }

    setCurrency2(event) {
        this.currency2 = event.target.value;
        if(this.amount > 0) this.convert();
    }

    setAmount(event) {
        if(event.target.value < 0) return
        this.amount = event.target.value;
    }

    setDate(event) {
        const today = new Date().toISOString().slice(0,10);
        this.date = event.target.value;
        if(this.date > today) this.date = today;
        if(this.amount > 0) this.historicalConvert();
    }

   

    async convert(){
        let url = `https://data.fixer.io/api/convert?access_key=${apiKey}&from=${this.currency1}&to=${this.currency2}&amount=${this.amount}`;;
        const today = new Date().toISOString().slice(0,10);
        if(this.date !== today){
            this.historicalConvert();
            return;
        }


        await request(url)
            .then(response => {
                response = JSON.parse(response.body);
                this.result = response.result;
                this.todayRate = response.info.rate;
            })
            .catch(err => {
                console.error("err : ", err);
                this.result = "An error occured, please try again later."
            })
    }

    historicalConvert() {
        let url = `https://data.fixer.io/api/${this.date}?access_key=${apiKey}&base=${this.currency1}&symbols=${this.currency2}`;
        request(url)
            .then(response => {
                response = JSON.parse(response.body)
                this.todayRate = response.rates[this.currency2]
                this.result = this.amount * this.todayRate;
            })
            .catch(err => {
                this.result = "An error occured, please try again later."
            })
    }
}

export default Brain