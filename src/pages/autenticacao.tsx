import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import AuthInput from '@components/auth/AuthInput'
import { IconeAlerta } from '@components/icons'
import googleLogo from '@public/google-logo.svg'
import Logo from '@components/template/Logo'

export default function Autenticacao() {

    const [error, setError] = useState<string | null>(null)
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    
    async function submeter() {
        try {
            if (modo === 'login') {
                // await login(email, senha)
            } else {
                if (senha === confirmarSenha) {
                    // await cadastrar(email, senha)
                } else {
                    exibirErro({ code: 'auth/password-not-confirmed' })
                }
            }
        } catch (e) {
            exibirErro(e)
        }
    }

    function exibirErro(msg: any, tempoEmSegundos = 5) {
        if (msg?.code) {
            switch (msg.code) {
                case 'auth/invalid-email':
                    setError('O email não está escrito corretamente!')
                    break
                case 'auth/wrong-password':
                    setError('A senha não está escrita corretamente!')
                    break
                case 'auth/user-not-found':
                    setError('Usuario não cadastrado ou credenciais incorretas!')
                    break
                case 'auth/password-not-confirmed':
                    setError('Os campos Senha e Confimar Senha são diferentes!')
                    break
                default:
                    setError('Houve algum erro! Tente novamente mais tarde!')
                    break
            }
        } else {
            setError('Houve algum erro! Tente novamente mais tarde!')
        }
        setTimeout(() => setError(null), tempoEmSegundos * 1000);
    }

    return (
        <div className="flex h-screen items-center  justify-center lg:bg-gradient-to-r lg:from-blue-600 lg:to-cyan-600">
            <Head>
                <link rel="shortcut icon" type="image/png" href="icon.png" />
                <title>{modo === 'login' ? 'Login' : 'Cadastro'}</title>
            </Head>
            <div className={`p-10 bg-white z-10 rounded-xl lg:border-4 lg:border-indigo-800`}>
                <div className={`flex justify-center mb-7`}>
                    <Logo width="w-20" height="h-20" ballWidth="w-6" ballHeight="h-6" />
                </div>
                <h1 className={`text-5xl font-bold mb-10 text-slate-800 text-center`}> Gerenciador dos Riscos de Projetos</h1>
                <h1 className={`
                    text-2xl font-bold mb-5 text-slate-700
                `}>
                    {modo === 'login' ? 'Entre com a Sua Conta' : 'Cadastre-se na Plataforma'}
                </h1>

                {error ? (
                    <div className={`flex items-center 
                        bg-red-400 border border-red-700 
                        text-white p-1 text-sm rounded-lg
                    `}>
                        {IconeAlerta()}
                        <span className={`ml-2`}>{error}</span>
                    </div>
                ) : false}

                <AuthInput
                    label={`Email`}
                    tipo={`email`}
                    valor={email}
                    valorMudou={setEmail}
                    placeholder="user@email.com"
                    obrigatorio
                />
                <AuthInput
                    label={`Senha`}
                    tipo={`password`}
                    valor={senha}
                    valorMudou={setSenha}
                    placeholder="Mínimo: 6 dígitos"
                    obrigatorio
                />

                {modo === 'cadastro' ? (
                    <AuthInput
                        label={`Confirmar Senha`}
                        tipo={`password`}
                        valor={confirmarSenha}
                        valorMudou={setConfirmarSenha}
                        placeholder="Digite novamente a senha"
                        obrigatorio
                    />
                ) : false}

                <button onClick={submeter} className={` 
                    w-full bg-indigo-600 hover:bg-indigo-400 text-white rounded-lg
                    px-4 py-3 mt-6
                `}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className={`mt-6 border-gray-300 w-full`} />

                <button className={` 
                    flex justify-center items-center w-full bg-red-500 hover:bg-red-400 text-white rounded-lg
                    px-4 py-2
                `}>
                    <Image className={`w-8 mr-3`} src={googleLogo} width="30" height={"30"} alt="Google Logo"/><span className="ml-3">Entrar com Google</span>
                </button>
                <div className="sm:flex">
                    {modo === 'login' ? (
                        <p className={`mt-6 flex flex-grow text-slate-700`}>
                            Novo por aqui?
                            <a onClick={() => setModo('cadastro')} className={`
                                text-blue-500 hover:text-blue-700 
                                font-semibold cursor-pointer ml-1
                            `}>
                                Cadastre-se
                            </a>
                        </p>
                    ) : (
                        <p className={`mt-6 flex flex-grow text-slate-700`}>
                            Já é cadastrado?
                            <a onClick={() => setModo('login')} className={`
                                text-blue-500 hover:text-blue-700 
                                font-semibold cursor-pointer ml-1
                            `}>
                                Acesse sua Conta
                            </a>
                        </p>
                    )}

                    <p className={`mt-6`}>
                        <a onClick={() => setModo('login')} className={`
                            text-blue-500 hover:text-blue-700 
                            font-semibold cursor-pointer ml-1
                        `}>
                            Esqueci minha senha
                        </a>
                    </p>

                </div>
            </div>
        </div>
    )
}