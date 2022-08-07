import Cliente from '@model/Cliente'

interface EntradaProps {
  tipo: 'text' | 'number'
  texto: string
  valor: any
  cliente?: Cliente
  SomenteLeitura?: boolean
  onChange?: (valor: any) => void
  onKeyPress?: (cliente: Cliente) => void
}

export default function Entrada(props: EntradaProps) {
  return (
    <div className={'flex flex-col mb-4'}>
      <label>{props.texto}</label>
      <input
        type={props.tipo}
        value={props.valor}
        readOnly={props.SomenteLeitura}
        onChange={(valor) => props.onChange?.(valor.target.value)}
        // onKeyPress={(e) => e.key === 'Enter' ? props.onKeyPress(props.cliente ?? Cliente.vazio()) : false}
        className={`
                px-4 py-3 rounded-lg border focus:outline-none my-2
                bg-slate-100 dark:bg-slate-600
                border-slate-500 dark:border-slate-200
                ${
                  props.SomenteLeitura
                    ? 'text-slate-500 dark:text-slate-400'
                    : `
                text-slate-900 dark:text-slate-100
                focus:bg-white dark:focus:bg-slate-500 
                focus:border-indigo-700 dark:focus:border-indigo-600 
                `
                }
        `}
      />
    </div>
  )
}
