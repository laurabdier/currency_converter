import React, { useEffect } from "react"
import { observer } from "mobx-react"
import Loader from "react-loader-spinner";

import LoaderComponent from './Loader'
import "../css/rendr.css";
import ModalNewCurrency from "./ModalNewCurrrency";


const App = observer(({ brain }) => {
    const today = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        brain.init();
    }, [brain]);

    if (brain.state === "loading") {
        return (
            <div>
                <div className="col-12 align-items-center justify-content-center">
                    <Loader
                        type="TailSpin"
                        color="#FFFFFF"
                        height={100}
                        width={100}
                        className="spiner"
                    />
                </div>
            </div>
        )
    }
    else if (brain.state === "error") {
        return <p>error while fetching API.</p>
    }
    else {
        return (
            <div className="d-flex align-items-center main">
                <div className="col-8 offset-2 justify-content-center convertBox">
                    <div className="row justify-content-center">
                        <h1 className="convertBoxtitle">CURRENCY CONVERTER</h1>
                    </div>

                    <div className="row">
                        <div className="col-5 offset-1 d-flex justify-content-left">
                            <input className="convertBoxDate" type="date" max={today} value={brain.date} onChange={event => brain.setDate(event)}></input>
                        </div>

                        <div className="col-5 d-flex justify-content-center">
                            <p className="convertBoxtext"> 1 {brain.currency1} equals {brain.todayRate} {brain.currency2}</p>
                        </div>
                    </div>

                    <div className="row " style={{ marginTop: 50 }}>
                        <div className="col-5 offset-1 d-flex justify-content-left">
                            <input className="convertBoxNumber" type="number" value={brain.amount} onChange={event => brain.setAmount(event)}></input>
                        </div>
                        <div className="col-5 d-flex justify-content-center">
                            <select className="convertBoxCurrency" value={brain.currency1} onChange={event => brain.setCurrency1(event)}>
                                {
                                    brain.currencies.map((currency, index) => (
                                        <option key={index} value={currency}>{currency}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="row" style={{ width: "100%", marginTop: 50 }}>
                        <div className="col-12 d-flex justify-content-center" >
                            <span type="button" onClick={_ => brain.convert()}> <img src="/down.png" className="imgArrowDown" alt="arrow"></img>  </span>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: 50 }}>
                        <div className="col-5 offset-1 d-flex justify-content-left">
                            <div className="convertBoxResult"><p className="result">{brain.result}</p></div>
                        </div>
                        <div className="col-5 d-flex justify-content-center">
                            <select className="convertBoxCurrency" value={brain.currency2} onChange={event => brain.setCurrency2(event)}>
                                {
                                    brain.currencies.map((currency, index) => (
                                        <option key={index} value={currency}>{currency}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-5 offset-1 d-flex justify-content-center" ></div>
                        <div className="col-5 d-flex justify-content-center">
                            <button type="button" className="btn btn-primary convertBoxModal" data-toggle="modal" data-target="#modalNewCurrency">
                                Want to add a currency ?
                            </button>
                            <ModalNewCurrency brain={brain} />
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: 50, width: "100%" }}>
                        <div className="col-10 offset-1 justify-content-center">
                            <button type="button" className="convertBoxButton" onClick={_ => brain.convert()}> CONVERT</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})



export default App;
