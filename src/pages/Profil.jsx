import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

import { useAppContext } from "../variables"

function Profil() {

  const { cookies, user, setUser, setReload } = useAppContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.login) { navigate('/') }
  }, [])

  const handleReload = async () => {
    console.log('cookie: ')
    console.log(cookies.login);
    
    //const d = new Date(); let time = d.getTime();
    setReload(true);
  }

  return (
    <>
    {cookies.login && (
      <div className="">
      <h3>PROFIL!!!</h3>
      <p>Name!!!</p>
      <button className="bg-orange-500 p-3 rounded-lg m-2" onClick={handleReload}>Reload</button>
      </div>
    )}
    </>
  );
}

export default Profil;