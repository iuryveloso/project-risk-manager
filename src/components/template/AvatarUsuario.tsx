import Link from 'next/link'
import Image from 'next/image'
// import useAuthData from '@data/hook/useAuthData'
import avatar from '@public/images/avatar.svg'
interface AvatarusuarioProps {
    className?: string
    width: string
    height: string
    href?: string
    imgUrl?: string
}

export default function AvatarUsuario(props: AvatarusuarioProps) {
    // const { usuario } = useAuthData()

    return (
        <div className={props.className}>
            <Link href={props.href ?? ''} passHref>
                <a>
                    <Image
                        loader={({src}) => src}
                        unoptimized={true}
                        src={avatar}
                        alt="Avatar do usuário"
                        width={props.width}
                        height={props.height}
                        className={'rounded-full'}
                    />
                </a>
            </Link>
        </div>
    )
}