import { faJetFighterUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const ScrollButton = () => {
    const [show, setShow] = useState()
    
    const showButton = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setShow(true)
        } 
        else if (scrolled <= 300){
            setShow(false)
        }
    }

    const handleButton = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    window.addEventListener('scroll', showButton)

    return (
        <>
            {show && <button id="btn-onTop" onClick={handleButton}>
                <FontAwesomeIcon icon={faJetFighterUp}/>
            </button>}
        </>
    )
}

export default ScrollButton