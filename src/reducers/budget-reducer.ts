import { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions = 
    { type : 'add-budget', payload: { budget: number } } | 
    { type : 'show-modal' } | 
    { type : 'close-modal' } | 
    { type : 'add-expense', payload: { expense: DraftExpense } } | 
    { type : 'remove-expense', payload: { id: Expense['id'] } } | 
    { type : 'get-expense-id', payload: { id: Expense['id'] } } | 
    { type : 'update-expense', payload: { expense: Expense } } | 
    { type : 'clear-expense' } | 
    { type : 'filter-category', payload: {id: Category['id']} } 

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editId: Expense['id']
    currentCategory: Category['id']
}

const initialBudget = () : number => {
    const lsBudget = localStorage.getItem('budget')
    return lsBudget ? +lsBudget : 0
}

const lsExpenses = () : Expense[] => {
    const lsExpense = localStorage.getItem('expenses')
    return lsExpense ? JSON.parse(lsExpense) : []
}  

export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: lsExpenses(),
    editId: '',
    currentCategory: ''
}

const createExpense = ( draftExpense: DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState, 
    action: BudgetActions
) => {

    if(action.type === 'add-budget'){
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editId: ''
        }
    }

    if(action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense]
        }
    }

    if(action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter( expense => expense.id !== action.payload.id)
        }
    }

    if(action.type === 'get-expense-id') {
        return {
            ...state,
            editId: action.payload.id,
            modal: true 
        }
    }

    if(action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map((expense) => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            editId: ''
        }
    }

    if(action.type === 'clear-expense') {

        return {
            ...state,
            expenses: [],
            budget: 0
        }
    }

    if(action.type === 'filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}