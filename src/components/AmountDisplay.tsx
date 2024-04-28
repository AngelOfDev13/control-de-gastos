import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string 
    amount: number
}

const AmountDisplay = ({ label, amount } : AmountDisplayProps) => {
    return ( 
        <p className="text-2xl text-white font-bold">
            {label &&  `${label}: `}
            <span className="font-black text-green-400"> { formatCurrency(amount) } </span>
        </p>
    )
}

export default AmountDisplay 