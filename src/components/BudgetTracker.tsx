import AmountDisplay from "./AmountDisplay"
import useBudget from "../hooks/useBudget"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const BudgetTracker = () => {

    const { state, totalExpenses, remainBudget, dispatch } = useBudget()

    const percentaje = +((totalExpenses / state.budget) * 100).toFixed(2)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar 
                value={percentaje}
                styles={buildStyles({
                    pathColor: percentaje === 100 ? '#dc2626' : '#41B06E',
                    trailColor: '#181D31',
                    textColor: '#fff',
                    textSize: '10px'
                    
                })}
                text={`${percentaje}% Gastado`}
                
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                onClick={() => dispatch({type: 'clear-expense'})}
                type="button"
                className="bg-green-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-green-700">
                    Reset App
                </button>
                <AmountDisplay 
                label="Presupuesto"
                amount={state.budget}/> 

                <AmountDisplay 
                label="Disponible"
                amount={remainBudget}/> 

                <AmountDisplay 
                label="Gastado"
                amount={totalExpenses}/> 
            </div>
        </div>
    )
}

export default BudgetTracker