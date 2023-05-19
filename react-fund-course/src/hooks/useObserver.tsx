import { useEffect, useRef } from "react";

export const useObserver = (ref : React.RefObject<HTMLDivElement>, 
                            //canLoad : boolean, 
                            isLoading: boolean, 
                            callback: () => void) => {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect( () => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();


        // const cb = function(entries: IntersectionObserverEntry[]){
        //     if (entries[0].isIntersecting && canLoad){
        //         callback();
        //     }
        // };
        observer.current = new IntersectionObserver(callback);
        if (!ref.current) throw Error("lastElement is not assigned");
        observer.current.observe(ref.current);
      }, [isLoading])   
}