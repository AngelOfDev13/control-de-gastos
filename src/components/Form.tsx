import { useMemo, useState } from "react"
import { ChangeEvent, FormEvent } from "react"
import useBudget from "../hooks/useBudget"

const Form = () => {

    const [ budget, setBudget ] = useState(0)
    const { dispatch } = useBudget()

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return (isNaN(budget) || budget <= 0)
    }, [budget])

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'add-budget', payload: { budget } })
    }
    
    return (
        <form action="" className="space-y-5" onSubmit={ handleSubmit }>
            <div className="flex flex-col space-y-5">
                <label 
                htmlFor="budget" 
                className="text-4xl text-white font-bold text-center">
                    Definir Presupuesto
                </label>
            <input 
            id="budget"
            type="number"
            className="bg-slate-700 border border-slate-600 p-2 outline-none text-white"
            placeholder="Define tu Presupesto"
            name="budget"
            value={ budget }
            onChange={ handleChange } />
            </div>

            <input 
            type="submit"
            className={isValid ? "bg-green-600 w-full cursor-pointer p-2 text-white font-black disabled:opacity-10 disabled:cursor-not-allowed" : "hover:bg-green-700 bg-green-600 w-full cursor-pointer p-2 text-white font-black"}
            value="Definir Presupuesto"
            disabled={ isValid }
            />
        </form>
    )
}

export default Form
