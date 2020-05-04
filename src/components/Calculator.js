import React from 'react'
import './Calculator.css'
// import balance from '../images/balance.png'

class Calculator extends React.Component {
    state = {
        userWeight: null,
        weightToReach: null,
        motivation: "0"
    }


    handleChange = (event) => {
        this.setState({ userWeight: event.target.value })
    }

    weightChange = () => {
        this.setState({ weightToReach: parseInt(this.state.userWeight) + this.state.userWeight * 0.2 + ' kg' })
    }

    getWeightToReach = (userWeight) => {

        if (userWeight < 0) {
            return this.setState({ weightToReach: 'Enter a positive number' })
        } else if (userWeight < 35 && userWeight > 0) {
            return this.setState({ weightToReach: ' Children are not allowed to play this game !' })
        }
        else {
            return this.motivationLevel()
        }
    }

    getMotivation = (event) => {
        this.setState({ motivation: event.target.value },
            () => this.getWeightToReach(this.state.userWeight))
    }

    motivationLevel = () => {
        const motiv = this.state.motivation
        const strToNum = parseInt(this.state.userWeight)
        if (motiv === "0") {
            this.setState({ weightToReach: strToNum + strToNum * 0.1 + ' kg' })
        } else if (motiv === "50") {
            this.setState({ weightToReach: strToNum + strToNum * 0.2 + ' kg' })
        } else {
            this.setState({ weightToReach: strToNum + strToNum * 0.3 + ' kg' })
        }
    }

    render() {
        return (
            <div className="calculator">
                {/* <img className="balance" src={balance} alt="image de balance"></img> */}
                <form className='calculator-form'>
                    <label>Please enter your weight :</label>
                    <input
                            type='number'
                            className="userWeight"
                            value={this.state.userWeight}
                            onChange={this.handleChange}
                            placeholder="In Kg">
                    </input>
                    <input type="button" value="Calculate" className="buttonCalculator" onClick={this.weightChange} />
                    <p>Current weight: {this.state.userWeight} kg</p>
                    <div className="motiv">
                        <label>Motivation level</label>
                        <input
                            className="motivationBar"
                            onChange={this.getMotivation}
                            id="motivationBar"
                            type="range"
                            min="0"
                            step="50"
                            max="100"
                        />
                    <p value={this.state.weightToReach} onChange={this.weightChange}>Your goal : {this.state.weightToReach}</p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Calculator