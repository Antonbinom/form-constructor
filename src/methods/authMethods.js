import { useRouter } from "vue-router";

const useAuth = () => {
  const router = useRouter();

  const login = (login, password) => {
    if(login && password) {
      localStorage.setItem('user', login)
      router.push('/forms')
    }
    return
  }

  const logout = () => {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user')
      router.push('/')
    }
    return
  }
  return {login, logout}
}

export default useAuth;