import { ProjectInterface } from '@interfaces/projectInterfaces'
import { ProjectUserInterface } from '@interfaces/projectUserInterfaces'
import UserInterface from '@interfaces/userInterfaces'
import Image from 'next/image'
import avatar from '@public/images/avatar.svg'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface SearchedUserInterface {
  project?: ProjectInterface
  searchedUser: UserInterface
  projectUserSelected: ProjectUserInterface
  setprojectUserSelected: Dispatch<SetStateAction<ProjectUserInterface>>
}

export default function SearchedUser({
  project,
  searchedUser,
  setprojectUserSelected,
  projectUserSelected,
}: SearchedUserInterface) {
  const [functionProject, setFunctionProject] =
    useState<ProjectUserInterface['functionProject']>('collaborator')
  const [image, setImage] = useState(avatar)

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/user/avatar/${searchedUser.avatar}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then((response) => response.blob())
      .then((imageBlob) => setImage(URL.createObjectURL(imageBlob)))
  }, [searchedUser.avatar])
  return (
    <li
      className={`px-2 py-1 ${
        projectUserSelected.userID === searchedUser._id
          ? 'bg-slate-300 dark:bg-slate-600 cursor-default'
          : 'cursor-pointer'
      }`}
      onClick={() =>
        setprojectUserSelected({
          functionProject,
          projectID: project?._id as string,
          userID: searchedUser._id as string,
        })
      }
    >
      <div className={'flex'}>
        <div className={'flex flex-grow'}>
          <Image
            src={image}
            width={40}
            height={40}
            className={'rounded-full'}
          />
          <div className={'flex flex-col ml-1'}>
            <div>
              <span>{`${searchedUser.firstName} ${searchedUser.lastName} `}</span>
              <span className={'text-xs'}>{` > ${searchedUser.email}`}</span>
            </div>
            <span className={'text-xs'}>
              {`${searchedUser.occupation || 'Sem Cargo'} - ${
                searchedUser.company || 'Sem Empresa'
              }`}
            </span>
          </div>
        </div>
        <div className={'flex flex-col text-xs justify-center'}>
          <div className={'flex items-center'}>
            <input
              type="radio"
              name={`${searchedUser._id}`}
              className={'mr-1'}
              checked={functionProject === 'collaborator'}
              onChange={() => {
                setFunctionProject('collaborator')
                setprojectUserSelected({
                  ...projectUserSelected,
                  functionProject: 'collaborator',
                })
              }}
            />
            Colaborador
          </div>
          <div className={'flex items-center'}>
            <input
              type="radio"
              name={`${searchedUser._id}`}
              className={'mr-1'}
              checked={functionProject === 'manager'}
              onChange={() => {
                setFunctionProject('manager')
                setprojectUserSelected({
                  ...projectUserSelected,
                  functionProject: 'manager',
                })
              }}
            />
            Gestor
          </div>
        </div>
      </div>
    </li>
  )
}
