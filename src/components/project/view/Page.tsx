import { ProjectInterface } from '@interfaces/projectInterfaces'

interface PageInterface {
  project: ProjectInterface
}

export default function Page({ project }: PageInterface) {
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
        <p className={'text-2xl font-bold text-center'}> {project.title}</p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <div className={'flex text-xl text-justify'}>
          <label className={'font-bold mr-1'}>Descrição: </label>
          <div className={'flex flex-col'}>
            {project.description.split('\n').map((descriptionLine, index) => (
              <div key={index}>{descriptionLine}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Área de Atuação: </label>
          {project.occupationArea}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-xl'}>
          <label className={'font-bold'}> Início: </label>
          {`${project.begin.split('-')[2]}/${project.begin.split('-')[1]}/${
            project.begin.split('-')[0]
          }`}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-xl'}>
          <label className={'font-bold'}> Término: </label>
          {`${project.end.split('-')[2]}/${project.end.split('-')[1]}/${
            project.end.split('-')[0]
          }`}
        </p>
      </div>
    </div>
  )
}
