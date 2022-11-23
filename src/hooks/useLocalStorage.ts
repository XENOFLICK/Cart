import { useEffect, useState } from "react";

export function useLocalStorage<T>(key : string, intialValue: T | (() => T)){

    const[Value, setValue]= useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)
        if (typeof intialValue === "function"){
            return (intialValue as () => T)()
        }
        else
        {
            return intialValue
        }
    })
 
    useEffect (()=>{
        localStorage.setItem (key, JSON.stringify(Value) )
    },[key,Value])

    return [Value, setValue] as [typeof Value, typeof setValue]
}