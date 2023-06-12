import { Dispatch, SetStateAction } from 'react'

interface VerifyInterface {
  setInnerMode: Dispatch<SetStateAction<'send' | 'verify' | 'change'>>
  sentToken: string
  setSentToken: Dispatch<SetStateAction<string>>
  verifyToken: () => boolean
}

export default function Verify({
  setInnerMode,
  sentToken,
  setSentToken,
  verifyToken,
}: VerifyInterface) {
  function verifyTokenClick() {
    const verifiedToken = verifyToken()
    if (verifiedToken === true) {
      setInnerMode('change')
    }
  }
  return (
    <div>
      <div className={'flex flex-col mt-3'}>
        <label className={'text-slate-700'}>Digite o token recebido</label>
        <input
          type={'text'}
          value={sentToken}
          onChange={(e) => setSentToken(e.target.value)}
          onKeyDown={(e) => {
            return e.key === 'Enter' ? verifyTokenClick() : false
          }}
          placeholder={'token...'}
          required
          className={`
          px-3 py-2 rounded-lg bg-slate-100 mt-1 text-slate-700
          border border-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-white
          `}
        />
        <label className={'text-slate-800 text-end text-xs italic font-bold'}>
          *Olhe na caixa de entrada ou de spam do seu email
        </label>
      </div>
      <button
        onClick={verifyTokenClick}
        className={` 
                w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg
                px-3 py-2 mt-6
            `}
      >
        Verificar Token
      </button>
    </div>
  )
}
