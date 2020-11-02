import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { makeAutoObservable, observable } from "mobx";

import "../css/modalNewCurrency.css"

class NewCurr {
    name= null;
    symbol= null;
    date= null;
    rate= 0;

    constructor() {
        makeAutoObservable(this, {
            name : observable,
            symbol : observable,
            date : observable,
            rate : observable
        });
    }

    setNewCurrencyName(event) {
        this.name = event.target.value;
    }

    setNewCurrencySymbol(event) {
        this.symbol = event.target.value;
    }    

    setNewCurrencyDate(event) {
        const today = new Date().toISOString().slice(0,10);
        this.date = event.target.value;
        if(this.date > today) this.date = today;
    }

    setNewCurrencyRate(event){
        this.rate = event.target.value;
    }

    saveNewCurrency(brain){
        let finalCurrency = {
            name: this.name,
            symbol: this.symbol,
            rate: [{
                date: this.date,
                rate: this.rate
            }]
        }
        console.log("new currency finale :", finalCurrency);
        brain.saveFinalCurrency(finalCurrency);
    }
}

const ModalNewCurrency = observer(({brain }) => {
    let newCurr = new NewCurr();
    const today = new Date().toISOString().slice(0, 10);

    return (
        <div>
            <div className="modal fade" id="modalNewCurrency" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-body">
                            
                            <div className="row" style={{textAlign: "center"}}>
                                <div className="col-12 ">
                                    <h1 className="convertBoxtitle">ADD A NEW CURRENCY</h1>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6 d-flex">
                                    <input className="convertModalBoxNumber" placeholder="Currency Name" onChange={event => {newCurr.setNewCurrencyName(event)}}></input>
                                </div>
                                <div className="col-6 d-flex">
                                    <input className="convertModalBoxNumber" placeholder="Currency Symbol" onChange={event => {newCurr.setNewCurrencySymbol(event)}}></input>
                                </div>
                            </div>

                            <div className="row" style={{marginTop: 35, marginBottom: 20}}>
                                <h2 className="convertBoxTitle2">Now, pick a date and indicate the value that 1€ represents in your currency : </h2>
                            </div>

                            <div className="row">
                                <div className="col-6 d-flex">
                                <input className="convertModalBoxDate" type="date" max={today} onChange={event => {newCurr.setNewCurrencyDate(event)}}></input>
                                </div>
                                <div className="col-6 d-flex">
                                    <input className="convertModalBoxNumber" placeholder="Currency Rate" onChange={event => {newCurr.setNewCurrencyRate(event)}}></input>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => newCurr.saveNewCurrency(brain)} data-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
})

export default ModalNewCurrency;