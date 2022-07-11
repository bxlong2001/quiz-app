import { memo, useEffect, useRef, useState } from "react"

const TimeOut = ({submit, timeOut, countdown}) => {
    const [time, setTime] = useState(countdown)
    const intervalId = useRef()
    useEffect(() => {
        intervalId.current = setInterval(() => {
            setTime(prev => prev - 1)
        },1000)

        return () => {
            clearInterval(intervalId.current)
        }
    }, [])

    useEffect(() => {
        if(time <= 0){
            clearInterval(intervalId.current)
            submit()
        }
    }, [time>0])
    
    useEffect(() => {
        timeOut[0] = time
    },[time])

    const convertTime = (time) => {
        const minutes = Math.floor(time/60)
        const second = time - minutes*60
        return (minutes<10 ? '0'+minutes : minutes) + ': ' + (second<10 ? '0'+second : second)
    }
    return (
        <h1>{convertTime(time)}</h1>
    )
}

export default memo(TimeOut)