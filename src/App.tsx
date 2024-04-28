import Form from "./components/Form"
import useBudget from "./hooks/useBudget"
import { useEffect, useMemo } from "react"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterCategory from "./components/FilterCategory"

const App = () => {

  const { state } = useBudget()
  const isValidBudget = useMemo(() => state.budget > 0 ,[state.budget] )

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="bg-green-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-gray-800 shadow-md rounded-lg mt-10 p-10">
          { isValidBudget ? <BudgetTracker/> : <Form /> }
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10 ">
          <ExpenseModal/> 
          <FilterCategory />
          <ExpenseList/> 
        </main>
      )}
    </>
)
}

export default App