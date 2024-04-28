import { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

const ErrorMessage = ({ children } : ErrorMessageProps) => {
    return (
        <p className="uppercase font-bold bg-red-600 rounded-md p-2 text-center">
            { children }
        </p>
    )
}

export default ErrorMessage