import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

const useBudget = () => {
    const context = useContext(BudgetContext)

    if(!context) {
        throw new Error('No se encontro BudgetProvider')
    }

    return context
}

export default useBudget