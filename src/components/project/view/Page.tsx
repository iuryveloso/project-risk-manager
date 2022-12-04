import { chevronLeftIcon, chevronRightIcon } from '@components/icons'
import { ProjectInterface } from '@interfaces/projectInterfaces'
import { ProjectUserInterface } from '@interfaces/projectUserInterfaces'
import UserInterface from '@interfaces/userInterfaces'
import { Dispatch, SetStateAction } from 'react'
import SearchedUser from '@components/project/view/SearchedUser'
import ProjectUser from '@components/project/view/ProjectUser'

interface PageInterface {
  project?: ProjectInterface
  user: UserInterface
  users?: UserInterface[]
  searchedUsers?: UserInterface[]
  projectUsers?: ProjectUserInterface[]
  projectUserSelected: ProjectUserInterface
  setprojectUserSelected: Dispatch<SetStateAction<ProjectUserInterface>>
  search: (searchTag: string) => void
  saveProjectUser: (projectUser: ProjectUserInterface) => void
  deleteProjectUser: (projectUser: ProjectUserInterface) => void
  reRender: number
  setReRender: Dispatch<SetStateAction<number>>
}

export default function Page({
  project,
  user,
  users,
  searchedUsers,
  setprojectUserSelected,
  projectUserSelected,
  projectUsers,
  search,
  saveProjectUser,
  deleteProjectUser,
  reRender,
  setReRender,
}: PageInterface) {
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
        <p className={'text-2xl font-bold text-center'}> {project?.title}</p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <div className={'flex text-xl text-justify'}>
          <label className={'font-bold mr-1'}>Descrição: </label>
          <div className={'flex flex-col'}>
            {project?.description?.split('\n').map((descriptionLine, index) => (
              <div key={index}>{descriptionLine}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-xl text-justify'}>
          <label className={'font-bold'}>Área de Atuação: </label>
          {project?.occupationArea}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-xl'}>
          <label className={'font-bold'}> Início: </label>
          {`${project?.begin?.split('-')[2]}/${project?.begin?.split('-')[1]}/${
            project?.begin?.split('-')[0]
          }`}
        </p>
      </div>
      <div className={'flex flex-col mb-4'}>
        <p className={'text-xl'}>
          <label className={'font-bold'}> Término: </label>
          {`${project?.end?.split('-')[2]}/${project?.end?.split('-')[1]}/${
            project?.end?.split('-')[0]
          }`}
        </p>
      </div>
      <div>
        <h3 className={'text-2xl font-bold text-center my-5'}>
          Cadastrar Gestores e Colaboradores ao Projeto
        </h3>
        <div className={'flex'}>
          <div className={'w-5/12'}>
            <h4 className={'text-lg font-bold text-center'}>
              Usuários do Sistema
            </h4>
          </div>
          <div className={'w-2/12'} />
          <div className={'w-5/12'}>
            <h4 className={'text-lg font-bold text-center'}>
              Gestores/Colaboradores do Projeto
            </h4>
          </div>
        </div>
        <div className={'flex w-5/12'}>
          <input
            className={`
                      px-2 py-1 rounded-md border focus:outline-none my-2 flex flex-grow
                      bg-slate-100 dark:bg-slate-600 
                      border-slate-500 dark:border-slate-200
                      text-slate-900 dark:text-slate-100
                      focus:bg-white dark:focus:bg-slate-500 
                      focus:border-indigo-700 dark:focus:border-indigo-600 

                  `}
            type={'search'}
            placeholder={'Buscar Usuários do Sistema...'}
            onChange={(e) => search(e.target.value)}
          />
        </div>
        <div className={'flex'}>
          <div
            className={
              'border-4 border-slate-300 dark:border-slate-900 rounded-lg  w-5/12 h-44 overflow-auto scrollbar dark:scrollbar-dark'
            }
          >
            <ul>
              {searchedUsers?.map((searchedUser, index) => {
                const alreadyAddUser: ProjectUserInterface[] =
                  projectUsers?.filter((projectUser) =>
                    projectUser.userID.includes(searchedUser._id as string)
                  ) || []

                return (
                  <div key={index}>
                    {alreadyAddUser.length <= 0 &&
                    user?._id !== searchedUser._id ? (
                      // {alreadyAddUser.length <= 0 ? (
                      <SearchedUser
                        searchedUser={searchedUser}
                        projectUserSelected={projectUserSelected}
                        setprojectUserSelected={setprojectUserSelected}
                        project={project}
                      />
                    ) : (
                      false
                    )}
                  </div>
                )
              })}
            </ul>
          </div>
          <div className={'flex flex-col justify-center w-2/12 px-3'}>
            <button
              className={`
                        focus:border-indigo-700 dark:focus:border-indigo-600
                        text-slate-50 pl-2 py-1 mt-7 mb-1 rounded-lg
                        flex justify-center
                        bg-green-600 hover:bg-green-700 
                        dark:bg-green-500 dark:hover:bg-green-600
                    `}
              onClick={() => {
                saveProjectUser(projectUserSelected)
                setReRender(reRender + 1)
              }}
            >
              <div className={'flex items-center'}>
                <span>Adicionar</span>
                <span className={'ml-1'}>{chevronRightIcon}</span>
              </div>
            </button>
            <button
              className={`
                        focus:border-indigo-700 dark:focus:border-indigo-600
                        text-slate-50 pr-2 py-1 mt-1 mb-7 rounded-lg
                        flex justify-center
                        bg-red-600 hover:bg-red-700 
                        dark:bg-red-500 dark:hover:bg-red-600
                    `}
              onClick={() => {
                deleteProjectUser(projectUserSelected)
                setReRender(reRender + 1)
              }}
            >
              <div className={'flex items-center'}>
                <span className={'mr-1'}>{chevronLeftIcon}</span>
                <span>Remover</span>
              </div>
            </button>
          </div>
          <div
            className={
              'border-4 border-slate-300 dark:border-slate-900 rounded-lg  w-5/12 h-44 overflow-auto scrollbar dark:scrollbar-dark'
            }
          >
            <ul>
              {users?.map((userBinded, index) => {
                const alreadyAddUser: ProjectUserInterface[] =
                  projectUsers?.filter((projectUser) =>
                    projectUser.userID.includes(userBinded._id as string)
                  ) || []

                return (
                  <div key={index}>
                    {alreadyAddUser.length > 0 ? (
                      <ProjectUser
                        user={user}
                        userBinded={userBinded}
                        alreadyAddUser={alreadyAddUser}
                        projectUserSelected={projectUserSelected}
                        setprojectUserSelected={setprojectUserSelected}
                        project={project}
                      />
                    ) : (
                      false
                    )}
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
