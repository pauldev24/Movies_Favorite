import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/useRegister'
import { useAuth } from '../context/AuthContext'
import { ErrorForm, ErrorRequest, SuccessForm } from '../components/Notifications'
import { Loading } from '../components/Utils'

function Register() {
  const { errorForm, setData } = useRegister()
  const { errors, loading, success } = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault()
    setData({
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirm_password: event.target.confirm_password.value
    })
  }

  return (
    <div className='relative'>
      {
        (loading) ?
          <Loading /> : null
      }
      <div className="z-[1] h-screen flex justify-center items-center w-full">
        <form onSubmit={handleSubmit} className="bg-black/70 px-12 py-10 rounded-md shadow-sm hover:shadow-sm shadow-white flex justify-center items-center gap-5 flex-col transition-all duration-1000">
          <h1 className="text-4xl text-white font-bold uppercase">Registro</h1>
          {
            errors && <ErrorRequest errors={errors} />
          }
          {
            success && <SuccessForm success={success} />
          }
          <div>
            <input type="text" name="username" placeholder="nombre de usuario" className="text-xl px-4 py-2 rounded-md bg-zinc-800 text-white w-[24rem] focus:outline-none" autoComplete='off' />
            {
              errorForm.username && <ErrorForm error={errorForm.username} />
            }
          </div>
          <div>
            <input type="email" name="email" placeholder="correo electronico" className="text-xl px-4 py-2 rounded-md bg-zinc-800 text-white w-[24rem] focus:outline-none" autoComplete='off' />
            {
              errorForm.email && <ErrorForm error={errorForm.email} />
            }
          </div>
          <div>
            <input type="password" name="password" placeholder="contraseña" className="text-xl px-4 py-2 rounded-md bg-zinc-800 text-white w-[24rem] focus:outline-none" />
            {
              errorForm.password && <ErrorForm error={errorForm.password} />
            }
          </div>
          <div>
            <input type="password" name="confirm_password" placeholder="confirmar contraseña" className="text-xl px-4 py-2 rounded-md bg-zinc-800 text-white w-[24rem] focus:outline-none" />
            {
              errorForm.confirm_password && <ErrorForm error={errorForm.confirm_password} />
            }
          </div>
          <div className="flex justify-between items-center w-[24rem]">
            <button type="submit" className="bg-violet-800 px-5 py-2 rounded-md text-slate-100 text-lg">
              Registrarse
            </button>
            <Link to="/login" className="text-violet-700 text-md font-bold">¿Ya tienes cuenta?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register