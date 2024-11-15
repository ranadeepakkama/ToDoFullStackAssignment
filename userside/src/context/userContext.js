import {createContext, useState, useContext} from 'react';

//created new context
const UserContext = createContext()

// custome hook to use context
export const useUser = () => useContext(UserContext)


export const UserProvider = ({children}) => {
    const [user,setUser] = useState('');
    const updateUser = (newUser) => setUser(newUser) 
 
    return (
        <UserContext.Provider value= {{user, updateUser}}>
            {children}
        </UserContext.Provider>
    )

}