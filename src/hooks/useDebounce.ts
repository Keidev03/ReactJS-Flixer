import { useEffect, useState } from "react"


const useDebounce = (value: any, delay: number): string => {

     const [debouncedValue, setDebouncedValue] = useState<any>()

     useEffect(() => {
          const handler = setTimeout(() => {
               setDebouncedValue(value);
          }, delay);
          return () => {
               clearTimeout(handler);
          };
     }, [value])

     return debouncedValue

}

export default useDebounce