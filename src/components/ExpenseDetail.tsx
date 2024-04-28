import { Expense } from "../types"
import { formatDate } from "../helpers"
import AmountDisplay from "./AmountDisplay"
import { useMemo } from "react"
import { categories } from "../db/categories"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"
import useBudget from "../hooks/useBudget"

type ExpenseDetailProps = {
    expenses : Expense
}

const ExpenseDetail = ({ expenses } : ExpenseDetailProps ) => {

    const { dispatch } = useBudget()

    const categoryInfo = useMemo(() =>  categories.filter(cat => cat.id === expenses.category)[0], [expenses])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type: 'get-expense-id', payload: {id: expenses.id} }) }>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction destructive={true} onClick={() => dispatch({type: 'remove-expense', payload: { id: expenses.id } }) }>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem maxSwipe={1} leadingActions={ leadingActions() } trailingActions={ trailingActions() }>
                <div className="bg-gray-800 text-white shadow-md p-6 w-full border-b border-gray-700 flex gap-5 items-center rounded-lg">
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="logo de la categoria" className="w-20" />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-400">
                            {categoryInfo.name}
                        </p>
                        <p> {expenses.expenseName} </p>
                        <p className="text-slate-400 text-sm"> { formatDate(expenses.date!.toString()) } </p>
                    </div>

                    <AmountDisplay 
                    amount={ expenses.amount } />

                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default ExpenseDetail