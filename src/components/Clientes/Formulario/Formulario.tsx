import { useEffect, useState } from 'react'
import Entrada from '@components/Clientes/Formulario/Entrada'
import Cliente from '@model/Cliente'

interface FormularioProps {
  cliente?: Cliente
  salvarDados: (cliente: Cliente) => void
  modo: string
  alternarModo: () => void
}

export default function Formulario(props: FormularioProps) {
  const id = props.cliente?.id
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState(0)
  useEffect(() => {
    setNome(props.cliente?.nome ?? '')
    setIdade(props.cliente?.idade ?? 0)
  }, [props.cliente])

  return (
    <div
      className={`
        flex justify-center
        ${props.modo === 'formulario' ? '' : 'hidden'}
    `}
    >
      <div
        className={`
            my-3 rounded-lg w-full
            bg-slate-200 dark:bg-slate-700 p-4 
        `}
      >
        {id ? (
          <Entrada texto={'Código'} tipo={'text'} valor={id} SomenteLeitura />
        ) : (
          false
        )}
        <Entrada
          texto={'Nome'}
          tipo={'text'}
          valor={nome}
          onChange={setNome}
          onKeyPress={props.salvarDados}
          cliente={new Cliente(nome, +idade, id)}
        />
        <Entrada
          texto={'Idade'}
          tipo={'number'}
          valor={idade !== 0 ? idade : ''}
          onChange={setIdade}
          onKeyPress={props.salvarDados}
          cliente={new Cliente(nome, +idade, id)}
        />
        <div className={'flex flex-row justify-end'}>
          <button
            onClick={() => props.alternarModo()}
            className={`
                    flex flex-row bg-red-700 text-slate-50 px-3 py-2 
                    rounded-md hover:bg-red-800 mb-1 mr-1
                    `}
          >
            Voltar
          </button>
          <button
            onClick={() => props.salvarDados(new Cliente(nome, +idade, id))}
            className={`
                    flex flex-row bg-green-700 text-slate-50 px-3 py-2 
                    rounded-md hover:bg-green-800 mb-1 ml-1
                    `}
          >
            {id ? 'Alterar' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  )
}
