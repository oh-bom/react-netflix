import {useState, useEffect} from 'react';

export const useDebounce=(value,delay)=>{
    const [debounceValue, setDebounceValue] = useState(value);
    
    //컴포넌트가 마운트 되는 시점에만 실행되게 하기위해서
    useEffect(() => {
      const handler=setTimeout(()=>{
        setDebounceValue(value)
      },delay);
    
      return () => {
        clearTimeout(handler);
      };
    }, [value,delay]);

    return debounceValue;
    
}