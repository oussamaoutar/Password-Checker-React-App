import React, {useEffect, useState} from 'react'
import { specialCharacters } from './specialChars';

function PasswordCheck() {
    const [password, setPassword] = useState('')
    const [checkboxChange, setCheckboxChange] = useState(false)
    const [min8Car, setMin8Car] = useState(false)
    const [atLeast1SpCar, setAtLeast1SpCar] = useState(false)
    const [atLeast1Upper, setAtLeast1Upper] = useState(false)
    const [atLeast1Num, setAtLeast1Num] = useState(false)
    
    const PasswordRequirements = [
        {
            description: 'Minimum 8 characters',
            valid: min8Car
        },
        {
            description: 'At least 1 special character (&, #, !, @, ...)',
            valid: atLeast1SpCar
        },
        {
            description: 'At least 1 uppercase letter',
            valid: atLeast1Upper
        },
        {
            description: 'At least 1 number',
            valid: atLeast1Num
        },
    ]

    // input and button handlers
    const handleFormSubmit = (e) => {
        e.preventDefault()
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleCheckboxChange = (e) => {
        setCheckboxChange(!checkboxChange)
    }
    const handleRegisterClick = () => {
        alert('À programmer ultérieurement')
    }

    // functions to check password requirements
    const pwLengthGTE8 = (password) => {
        return password.length >= 8
    }
    const containsSpecialCharacter = (password) => {
        return specialCharacters.some(char => password.includes(char))
    }
    const hasUpperLetter = (password) => {
        return /[A-Z]/.test(password)
    }
    const has1Num = (password) => {
        return /[0-9]/.test(password)
    }

    // useEffect on password change
    useEffect(() => {
        setMin8Car(pwLengthGTE8(password))
        setAtLeast1SpCar(containsSpecialCharacter(password))
        setAtLeast1Upper(hasUpperLetter(password))
        setAtLeast1Num(has1Num(password))
    }, [password])

    return (
        <form onSubmit={handleFormSubmit}>
            <label className='form-label'>Password :</label>
            <input 
                type={checkboxChange ? 'text' : 'password'}
                className='form-control form-control-sm mb-2 shadow-sm'
                placeholder='Enter your password here'
                onChange={handlePasswordChange}
            />
            <input
                type='checkbox'
                className='form-check-input me-1 shadow-sm'
                onChange={handleCheckboxChange}
            />
            <label className='form-label'>{checkboxChange ? 'Hide' : 'Show'} Password</label>
            <br/>
            {password.length >= 1 ?
                <>
                    <u className='fw-bold'>Your password must contain :</u><br />
                    <ul className='navbar-nav mb-2'>
                        {PasswordRequirements.map((requirement, index) => (
                            <li
                                key={index}  
                                style={{color: requirement.valid ? 'green' : 'red'}}  
                                className={`${requirement.valid ? 'fw-bold' : ''}`}
                            >
                                {requirement.valid ? '✅' : '❌'} {requirement.description}
                            </li>
                        ))}
                    </ul>
                </>
            : null
            }
            <button
                onClick={handleRegisterClick}
                type='submit'
                className={`btn btn-danger btn-sm shadow-sm ${min8Car && atLeast1Num && atLeast1SpCar && atLeast1Upper ? '' : 'disabled'}`}
            >Register</button>
        </form>
    )
}

export default PasswordCheck
