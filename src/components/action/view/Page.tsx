import { ActionInterface } from '@interfaces/actionInterfaces'

interface PageInterface {
  action?: ActionInterface
}

export default function Page({ action }: PageInterface) {
  return (
    <div
      className={`
            w-full
            flex-grow
            bg-slate-200 dark:bg-slate-700 p-4 
        `}
    >
      <div className={'flex mb-4 justify-center'}>
        <p className={'text-2xl font-bold'}> {action?.title}</p>
      </div>
      <div className={'flex mb-4'}>
        <div className={'flex text-xl text-justify'}>
          <label className={'font-bold mr-1'}>Descrição: </label>
          <div className={'flex flex-col'}>
            {action?.description.split('\n').map((descriptionLine, index) => (
              <div key={index}>{descriptionLine}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Tipo de Abordagem: </label>
          {action?.type}
        </p>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Responsável: </label>
          {action?.responsible}
        </p>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Status: </label>
          {action?.status}
        </p>
      </div>
      <div className={'flex mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Observação: </label>
          {action?.observation}
        </p>
      </div>
    </div>
  )
}
