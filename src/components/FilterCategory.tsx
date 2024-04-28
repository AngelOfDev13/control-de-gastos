import { ChangeEvent } from "react"
import { categories } from "../db/categories"
import useBudget from "../hooks/useBudget"

const FilterCategory = () => {

    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'filter-category', payload: {id: e.target.value} })
    }
    
    return (
        <div className="bg-gray-800 shadow-md rounded-lg p-10 text-white">
            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category" className="bg-green-600 p-2 shadow-lg rounded-lg">Filtrar Gastos</label> 
                    <select 
                        id="category" 
                        className="bg-gray-700 p-2 rounded-lg flex-1 outline-none shadow-lg"
                        onChange={handleChange}>
                        <option value="">Todas las categorias</option>
                        {categories.map(category => (
                            <option value={category.id} key={category.id}>
                                { category.name }
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}

export default FilterCategory