import { TaskInterface } from '@interfaces/taskInterfaces'

interface PageInterface {
  task: TaskInterface
}

export default function Page({ task }: PageInterface) {
  return (
    <div
      className={`
            w-full
            flex-grow
            bg-slate-200 dark:bg-slate-700 p-4 
        `}
    >
      <h1></h1>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-2xl font-bold text-center'}> {task.title}</p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <div className={'flex text-xl text-justify'}>
          <label className={'font-bold mr-1'}>Descrição: </label>
          <div className={'flex flex-col'}>
            {task.description.split('\n').map((descriptionLine, index) => (
              <div key={index}>{descriptionLine}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Responsável: </label>
          {task.responsible}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-xl'}>
          <label className={'font-bold'}> Início: </label>
          {`${task.begin.split('-')[2]}/${task.begin.split('-')[1]}/${
            task.begin.split('-')[0]
          }`}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-xl'}>
          <label className={'font-bold'}> Término: </label>
          {`${task.end.split('-')[2]}/${task.end.split('-')[1]}/${
            task.end.split('-')[0]
          }`}
        </p>
      </div>
    </div>
  )
}
