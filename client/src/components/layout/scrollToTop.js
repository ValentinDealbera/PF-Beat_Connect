// import Image from "next/image"

// export default function ScrollToTop (){

//     const handleClick = () => {
//         window.scrollTo({top: 0, behavior: 'smooth'});
//     }

//     return(
//         <div className="fixed bottom-5 right-5 z-50">
//             <button className="bg-red-700 w-[60px] h-[60px] rounded-full flex justify-center items-center" onClick={handleClick}>
//                 <Image src="/icon/arrow-up.svg" width={40} height={40} alt="Scroll to top" />
//             </button>
//         </div>
//     )
// }

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ScrollToTop (){

    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return(
        <div className={`fixed bottom-5 right-5 z-50 ${isVisible ? "block" : "hidden"}`}>
            <button className="background-primary-red-700 w-[60px] h-[60px] border-radius-full flex justify-center items-center" onClick={handleClick}>
                <Image src="/icon/arrow-up.svg" width={40} height={40} alt="Scroll to top" />
            </button>
        </div>
    )
}