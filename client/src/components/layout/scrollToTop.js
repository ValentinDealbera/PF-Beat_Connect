import Image from "next/image"

export default function ScrollToTop (){

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return(
        <div className="fixed bottom-5 right-5 z-50">
            <button className="bg-red-700 w-[60px] h-[60px] rounded-full flex justify-center items-center" onClick={handleClick}>
                <Image src="/icon/arrow-up.svg" width={40} height={40} alt="Scroll to top" />
            </button>
        </div>
    )
}