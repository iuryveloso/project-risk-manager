import { ProjectInterface } from '@interfaces/projectInterfaces'
import { Dispatch, SetStateAction } from 'react'
import Actions from '@components/project/main/table/Actions'

interface DataInterface {
  project: ProjectInterface
  selectProject: (project: ProjectInterface) => void
  deleteProject: (project: ProjectInterface) => void
  deleteMessage: string | null
  setDeleteMessage: Dispatch<SetStateAction<string | null>>
}

export default function Data({
  project,
  selectProject,
  deleteProject,
  deleteMessage,
  setDeleteMessage,
}: DataInterface) {
  return (
    <tr key={project._id}>
      <td className={'text-left p-1 pl-4'}>{project.title}</td>
      <td className={'text-justify p-1'}>{project.occupationArea}</td>
      <td className={'text-left p-1'}>{`${project.begin.split('-')[2]}/${
        project.begin.split('-')[1]
      }/${project.begin.split('-')[0]}`}</td>
      <td className={'text-left p-1'}>{`${project.end.split('-')[2]}/${
        project.end.split('-')[1]
      }/${project.end.split('-')[0]}`}</td>
      <td className={'text-right p-1'}>
        {project.functionProject === 'manager' ? 'Gestor' : 'Colaborador'}
      </td>
      <Actions
        project={project}
        deleteProject={deleteProject}
        selectProject={selectProject}
        deleteMessage={deleteMessage}
        setDeleteMessage={setDeleteMessage}
      />
    </tr>
  )
}
