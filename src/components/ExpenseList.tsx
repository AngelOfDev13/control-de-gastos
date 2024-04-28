import { useMemo } from "react"
import useBudget from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

const ExpenseList = () => {

    const { state } = useBudget()
    
    
    const filterExpenses = state.currentCategory ? state.expenses.filter((expense) => expense.category === state.currentCategory) : state.expenses
    const isEmpty = useMemo(() => filterExpenses.length === 0, [state])

    return (
        // 4:48 
        <div className="mt-6">
            {isEmpty ? <p className="text-white text-2xl font-bold text-center uppercase">No Hay Gastos</p> : 
            <>
                <p className="text-white text-2xl font-bold my-5 text-center uppercase">Listado de Gastos</p>
                {filterExpenses.map(expenses => (
                    <ExpenseDetail 
                    key={ expenses.id }
                    expenses={ expenses } />
                ))} 
            </>
            }
        </div>
    )
}

export default ExpenseList