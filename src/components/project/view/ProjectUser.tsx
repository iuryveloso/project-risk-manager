import { ProjectInterface } from '@interfaces/projectInterfaces'
import { ProjectUserInterface } from '@interfaces/projectUserInterfaces'
import UserInterface from '@interfaces/userInterfaces'
import Image from 'next/image'
import avatar from '@public/images/avatar.svg'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ProjectUserComponentInterface {
  project?: ProjectInterface
  user: UserInterface
  userBinded: UserInterface
  alreadyAddUser: ProjectUserInterface[]
  projectUserSelected: ProjectUserInterface
  setprojectUserSelected: Dispatch<SetStateAction<ProjectUserInterface>>
}

export default function ProjectUserComponent({
  project,
  user,
  userBinded,
  alreadyAddUser,
  setprojectUserSelected,
  projectUserSelected,
}: ProjectUserComponentInterface) {
  const [image, setImage] = useState(avatar)

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/user/avatar/${userBinded.avatar}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then((response) => response.blob())
      .then((imageBlob) => setImage(URL.createObjectURL(imageBlob)))
  }, [])
  return (
    <li
      className={`px-2 py-1 ${
        projectUserSelected.userID === userBinded._id
          ? 'bg-slate-300 dark:bg-slate-600 cursor-default'
          : 'cursor-pointer'
      } ${
        user._id === userBinded._id
          ? 'bg-slate-400 dark:bg-slate-800 cursor-default'
          : 'cursor-pointer'
      }`}
      onClick={() => {
        if (user._id !== userBinded._id)
          setprojectUserSelected({
            functionProject: alreadyAddUser[0].functionProject,
            projectID: project?._id as string,
            userID: userBinded._id as string,
          })
      }}
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
              <span>{`${userBinded.firstName} ${userBinded.lastName}`}</span>
              <span className={'text-sm'}>{` ${
                user._id === userBinded._id ? '(você)' : ''
              }`}</span>
              <span className={'text-xs'}>{` > ${userBinded.email}`}</span>
            </div>
            <span className={'text-xs'}>
              {`${userBinded.occupation || 'Sem Cargo'} - ${
                userBinded.company || 'Sem Empresa'
              }`}
            </span>
          </div>
        </div>
        <div className={'flex text-xs items-center'}>
          <label className={'text-sm'}>
            {alreadyAddUser[0].functionProject === 'collaborator'
              ? 'Colaborador'
              : 'Gestor'}
          </label>
        </div>
      </div>
    </li>
  )
}
