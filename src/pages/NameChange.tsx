import React, {useState, useEffect, useRef} from 'react'
import { useAuth } from '../context/AuthContext'
import '../styles/nameChange.css'

interface Show {
    show:boolean;
}



export default function NameChange({show}:Show) {
    const [display, setDisplay] = useState<string>('hidden')
    const setNewUsername = useRef<HTMLInputElement>(null)
    const {username, email, updateUser} = useAuth()

    useEffect(()=>{
        if(!show){
            setDisplay('hidden')
        }else{
            setDisplay('show')
        }
    }, [display, show])

    const onSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        if(setNewUsername.current){
            const newUsername = setNewUsername.current.value
        try{
            const response = await updateUser(newUsername)
            console.log(response)
        }catch(error){
            console.log(error)
        }
        }
    }


  return (
    <div className={display + ' ' + 'element'} >
        <p>Current E-mail: {email}</p>
        <input type="text" ref={setNewUsername} />
        <button onClick={onSubmit}>Update E-mail</button>
    </div>
  )
}
