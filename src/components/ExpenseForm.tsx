import { categories } from "../db/categories"
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { useState, ChangeEvent, useEffect } from "react";
import { DraftExpense, Value } from "../types";
import { FormEvent } from "react";
import ErrorMessage from "./ErrorMessage";
import useBudget from "../hooks/useBudget";

const ExpenseForm = () => {
    
    const [ expense, setExpense ] = useState<DraftExpense>({
        amount: 0, 
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [ error, setError ] = useState('')
    const { dispatch, state, remainBudget } = useBudget()
    const [ previousAmount, setPreviousAmount ] = useState(0)

    useEffect(() => {
        if(state.editId) {
            const editExpense = state.expenses.filter((expense) => expense.id === state.editId)[0] 
            setExpense(editExpense)
            setPreviousAmount(editExpense.amount)
        }

    }, [state.editId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name] : isAmountField ? Number(value) : value.trim()
        })
    }

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // validar 

        if((expense.amount - previousAmount) > remainBudget) {
            setError('Saldo Insuficiente')
            return
        }

        if(Object.values(expense).includes('')){
            setError('todos los campos son obligatorios')
            return
        } 

        if(state.editId) {
            
            dispatch({type: 'update-expense', payload: {expense: { id : state.editId, ...expense } } })

        } else {
            dispatch({type: 'add-expense', payload: { expense } })

        }

        setError('')
        dispatch({ type: 'close-modal'})
        setPreviousAmount(0)
        // setExpense({
        //     amount: 0, 
        // expenseName: '',
        // category: '',
        // date: new Date()
        // })
        
    }

    return (
        <form action=""
              onSubmit={handleSubmit}
              className="space-y-5 text-white">
                <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-green-600 ">
                    {
                        state.editId ? 'Modifica tu gasto' : 'Nuevo Gasto'
                    }
                </legend>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                <div className="flex flex-col gap-2">
                    <label htmlFor="expenseName"
                    className="text-xl">
                        Nombre Gasto:
                    </label>
                    <input type="text"
                    id="expenseName"
                    placeholder="Nombre del Gasto"
                    className="bg-slate-700 border border-slate-600 p-2 outline-none text-white"
                    name="expenseName"
                    onChange={handleChange} 
                    value={expense.expenseName}/>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="amount"
                    className="text-xl">
                        Cantidad:
                    </label>
                    <input type="number"
                    id="amount"
                    placeholder='Añade Cantidad Ej: "666"'
                    className="bg-slate-700 border border-slate-600 p-2 outline-none text-white"
                    name="amount"
                    onChange={handleChange}
                    value={expense.amount} />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="category"
                    className="text-xl">
                        Categoria:
                    </label>
                    <select 
                    name="category" 
                    id="category"
                    className="bg-slate-700 border border-slate-600 p-2 outline-none text-white"
                    onChange={handleChange}
                    value={expense.category}
                    >
                        <option value="Seleccione" hidden>--- Seleccione ---</option>
                        { categories.map( category => (
                            <option
                            key={ category.id } 
                            value={ category.id }>
                                { category.name }
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="amount"
                    className="text-xl">
                        Fecha Gasto:
                    </label>
                    <DatePicker className="p-2 bg-slate-700 text-black outline-none"
                    value={expense.date}
                    onChange={handleChangeDate} />
                </div>
                <input type="submit"
                className="bg-green-600 w-full cursor-pointer p-2 text-white font-bold hover:bg-green-700 rounded-lg uppercase"
                value={state.editId ? 'Guardar Cambios' : 'Registrar Gasto'} />

        </form>
    )
}

export default ExpenseForm