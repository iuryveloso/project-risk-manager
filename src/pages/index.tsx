import Layout from "@components/template/Layout"
import { GetStaticProps, NextPage } from 'next'


export const getStaticProps: GetStaticProps = async () => {
    const url = `${process.env.NEXT_HOSTNAME}/customer`
    const response = await fetch(
        url,
        { method: 'GET' }
    )
    const customers = await response.json()
    return {
        props: { customers },
        revalidate: 10
    }
}

const Home: NextPage = ({ customers }: any) => {
  return (
    <Layout 
        pagina={`Inicio`}
        titulo={`Página Inicial`}
        subtitulo={`Página em Construção!!`}
    >
        <div className="flex justify-center">
            <table className="w-full rounded-xl overflow-hidden text-slate-900 dark:text-slate-300">
                <thead className=" bg-slate-300 dark:bg-slate-900">
                    <tr>
                        <th className="text-left p-3">Nome</th>
                        <th className="text-left p-3">Sobrenome</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Endereço</th>
                        <th className="text-left p-3">Telefone</th>
                        <th className="text-left p-3">Data de Nascimento</th>
                    </tr>
                </thead>
                <tbody>
                    { customers.map((customer: any, index: any) => {
                        return (
                            <tr key={customer._id} className={
                                `${index % 2 === 0 ? `
                                    bg-slate-100
                                    dark:bg-slate-600
                                ` : `
                                    bg-slate-200
                                    dark:bg-slate-700
                                `}`
                            }>
                                <td className="text-left pl-3 p-2">{customer.firstName}</td>
                                <td className="text-left pl-3 p-2">{customer.lastName}</td>
                                <td className="text-left pl-3 p-2">{customer.email}</td>
                                <td className="text-left pl-3 p-2">{customer.address}</td>
                                <td className="text-left pl-3 p-2">{customer.phone}</td>
                                <td className="text-left pl-3 p-2">
                                    {
                                    new Date(customer.birthDate)
                                    .toLocaleString(
                                        'pt-BR',
                                        { timeZone: 'America/Sao_Paulo' }
                                    )
                                    }
                                </td>
                            </tr>
                        )
                        })
                    }
                </tbody>
            </table>
        </div>
    </Layout>
  )
}

export default Home
