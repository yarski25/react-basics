import { useState } from "react"


export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async (...args : [limit?: number, page?: number]) => {
        try{
            setIsLoading(true);
            await callback(...args);
        } catch(e : any) {
            setError(e.message);
        } finally{
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error] as const;
}