import Link from 'next/link'
import Image from 'next/image'
import avatar from '@public/images/avatar.svg'
import { useState } from 'react'

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
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/auth/avatar`
  )

  return (
    <div>
      <div className={`${className ?? ''}`}>
        <Link href={href ?? ''} passHref>
          <a>
            <div>
              <Image
                loader={({ src }) => src}
                unoptimized={true}
                src={userAvatarUrl}
                alt="Avatar do usuário"
                width={width}
                height={height}
                objectFit="cover"
                className={'rounded-full'}
                onError={() => setUserAvatarUrl(avatar)}
              />
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
