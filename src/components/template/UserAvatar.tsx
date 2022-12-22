import Link from 'next/link'
import Image from 'next/image'
import avatar from '@public/images/avatar.svg'
import { useEffect, useState } from 'react'

interface UserAvatarProps {
  className?: string
  width?: string
  height?: string
  href?: string
}

export default function UserAvatar({
  className,
  width,
  height,
  href,
}: UserAvatarProps) {
  const [image, setImage] = useState(avatar)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_NAME}/user/avatar`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.blob())
      .then((imageBlob) => setImage(URL.createObjectURL(imageBlob)))
  }, [])

  return (
    <div>
      <div className={`${className ?? ''}`}>
        <Link href={href ?? ''} passHref>
          <a>
            <div>
              <Image
                loader={({ src }) => src}
                unoptimized={true}
                src={image}
                alt="Avatar do usuário"
                width={width}
                height={height}
                objectFit="cover"
                className={'rounded-full'}
                onError={() => setImage(avatar)}
              />
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
