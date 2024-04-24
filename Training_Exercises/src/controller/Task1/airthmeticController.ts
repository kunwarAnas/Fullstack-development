import { Request, Response } from "express"
import operationMap from './arithmetic'

type ArithmeticOperation = "add" | "subtract" | "multiply" | "divide" | "percentage";

const airthmeticOpertions = (req: Request, res: Response) => {
    const { operation } = req.params as { operation: ArithmeticOperation }
    const { a, b } = req.query as { a: string, b: string }

    // Convert query parameters to numbers
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (!(operation in operationMap)) {
        return res.status(400).json({ error: "Invalid operation" });
    }

    // Invoking the airthmetic F(n)
    const result = operationMap[operation](numA, numB)

    res.send({ result })
}

export default airthmeticOpertions