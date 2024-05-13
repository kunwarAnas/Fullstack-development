import { Request, Response } from "express"
import operationMap from './arithmetic'

type ArithmeticOperation = "add" | "subtract" | "multiply" | "divide" | "percentage";

const cacheObj: { [key: string]: number } = {}

const airthmeticOpertions = (req: Request, res: Response) => {
    const { operation } = req.params as { operation: ArithmeticOperation }
    const { a, b } = req.query as { a: string, b: string }

    const key = `${a + "-" + b}-${operation}`; // Generating key for caching

    if (cacheObj[key]) {
        console.log("served from cache");
        return res.send({ result: cacheObj[key], message: 'served from cache' })
    }

    // Convert query parameters to numbers
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (!(operation in operationMap)) {
        return res.status(400).json({ error: "Invalid operation" });
    }

    // Invoking the airthmetic F(n)
    const result = operationMap[operation](numA, numB)

    cacheObj[key] = result as number;

    res.send({ result, message: 'operation performed' })
}

export default airthmeticOpertions