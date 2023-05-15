import Layout from '@components/template/Layout'

export default function Instructions() {
  return (
    <Layout page={'Instruções'} title={'Instruções do Sistema'}>
      <div
        className={`
            w-full
            flex-grow
            bg-slate-200 dark:bg-slate-700 p-4 
        `}
      >
        <div className={'mb-5'}>
          <h3 className={'font-bold text-2xl'}>Projetos</h3>
          <div className={'flex flex-col text-lg ml-3 text-justify'}>
            <p>
              Em projetos, você pode gerenciar os projetos criados por você ou
              outros usuários do sistema, desde que tenha permissão para
              acessa-los:
            </p>
            <p className={'ml-3'}>
              Ao clicar em <strong className={'font-bold'}>Novo Projeto</strong>
              , preencha os dados do projeto a ser criado corretamente.
            </p>
            <p className={'ml-3'}>
              No campo de <strong className={'font-bold'}>Ações</strong> ao lado
              de cada projeto, você pode ver as informações do projeto, editar
              informações do projeto e excluir o projeto, clicando
              respectivamente em{' '}
              <strong className={'font-bold'}>Ver, Editar</strong> e{' '}
              <strong className={'font-bold'}>Excluir</strong>.
            </p>
          </div>
          <div className={'flex flex-col text-lg ml-3 mt-2 text-justify'}>
            <p>
              Ao clicar em <strong className={'font-bold'}>Ver</strong>,
              aparecerá uma página com diversas informações do projeto:
            </p>
            <p className={'ml-3'}>
              O botão <strong className={'font-bold'}>Voltar</strong>, retornará
              à pagina anterior. <br /> O botão{' '}
              <strong className={'font-bold'}>Relatório do Projeto</strong>, irá
              gerar um arquivo .pdf com informações completas do projeto.
              <br /> O botão{' '}
              <strong className={'font-bold'}>Tarefas do Projeto</strong>, te
              levá para a página de gerenciamento das tarefas do projeto.
              <br /> O botão{' '}
              <strong className={'font-bold'}>Riscos do Projeto</strong>, te
              levá para a página de gerenciamento das riscos do projeto.
              <br /> Na areá{' '}
              <strong className={'font-bold'}>
                Cadastrar Gestores e Colaboradores ao Projeto
              </strong>
              , você poderá definir quem pode acessar o seu projeto, e qual a
              sua função, sendo que{' '}
              <strong className={'font-bold'}>Gestor</strong> tem acesso total
              ao projeto, enquanto{' '}
              <strong className={'font-bold'}>Colaborador</strong> pode
              gerenciar somente a parte de riscos do projeto, e suas respectivas
              ações.
            </p>
          </div>
        </div>
        <div className={'mb-5'}>
          <h3 className={'font-bold text-2xl'}>Riscos</h3>
          <div className={'flex flex-col text-lg ml-3 text-justify'}>
            <p>
              Em riscos, você pode gerenciar os riscos criados por você ou
              outros usuários do sistema:
            </p>
            <p className={'ml-3'}>
              Ao clicar em <strong className={'font-bold'}>Novo Risco</strong>,
              preencha os dados do risco a ser criado corretamente.
            </p>
            <p className={'ml-3'}>
              Os campos <strong className={'font-bold'}>Ameaça</strong> e{' '}
              <strong className={'font-bold'}>Oportunidade</strong> são
              definidos em : Muito Baixo, Baixo, Médio, Alto, e Muito Alto. As
              ameaças utilizar cores quem tendem para o{' '}
              <label className="text-green-600"> verde</label> para indicar
              níveis mais baixos e cores que tendem para o
              <label className="text-red-600"> vermelho</label> para indicar
              niveis mais altos, enquanto nas oportunidades ocorre o oposto.
            </p>
            <p className={'ml-3'}>
              O campo de <strong className={'font-bold'}>Status</strong> ao lado
              de cada risco, indica como está a situação do risco, podendo ser
              difinida em: Aprovado, Reprovado e Em Análise. Este campo somente
              pode ser alterado por um gestor do projeto.
            </p>
            <p className={'ml-3'}>
              No campo de <strong className={'font-bold'}>Ações</strong> ao lado
              de cada risco, você pode ver as informações do risco, editar
              informações do risco e excluir o risco, clicando respectivamente
              em <strong className={'font-bold'}>Ver, Editar</strong> e{' '}
              <strong className={'font-bold'}>Excluir</strong>. Clicando em{' '}
              <strong className={'font-bold'}>Tarefas</strong>, você poderá
              acessar página de{' '}
              <strong className={'font-bold'}>Vincular Tarefas</strong>, em que
              é possivel vincular uma ou mais tarefas ao risco, caso o risco
              possua alguma relação com as mesmas.
            </p>
          </div>
          <div className={'flex flex-col text-lg ml-3 mt-2 text-justify'}>
            <p>
              Ao clicar em <strong className={'font-bold'}>Ver</strong>,
              aparecerá uma página com diversas informações do risco:
            </p>
            <p className={'ml-3'}>
              O botão <strong className={'font-bold'}>Voltar</strong>, retornará
              à pagina anterior. <br /> O botão{' '}
              <strong className={'font-bold'}>Relatório do Risco</strong>, irá
              gerar um arquivo .pdf com informações completas do risco.
              <br /> O botão{' '}
              <strong className={'font-bold'}>Ações do Risco</strong>, te levá
              para a página de gerenciamento das ações possíveis para o risco.
              <br /> Além das informações basicas do risco, existe também as{' '}
              <strong className={'font-bold'}>
                Matrizes de Probabilidade x Impacto
              </strong>
              , que mostram em gráficos os níveis de ameaça e oportunidade do
              risco calculados pelo produto da probabilidade de ocorrer vezes o
              impacto que terá no projeto.
            </p>
          </div>
        </div>
        <div className={'mb-5'}>
          <h3 className={'font-bold text-2xl'}>Tarefas</h3>
          <div className={'flex flex-col text-lg ml-3 text-justify'}>
            <p>
              Em tarefas, você pode gerenciar as tarefas criadas por você ou
              outros usuários do sistema, desde que tenha permissão para
              acessa-las:
            </p>
            <p className={'ml-3'}>
              Ao clicar em <strong className={'font-bold'}>Nova Tarefa</strong>,
              preencha os dados da tarefa a ser criada corretamente.
            </p>
            <p className={'ml-3'}>
              No campo de <strong className={'font-bold'}>Ações</strong> ao lado
              de cada tarefa, você pode ver as informações da tarefa, editar
              informações da tarefa e excluir a tarefa, clicando respectivamente
              em <strong className={'font-bold'}>Ver, Editar</strong> e{' '}
              <strong className={'font-bold'}>Excluir</strong>. Clicando em{' '}
              <strong className={'font-bold'}>Riscos</strong>, você poderá
              acessar página de{' '}
              <strong className={'font-bold'}>Vincular Riscos</strong>, em que é
              possivel vincular um ou mais riscos à tarefa, caso a tarefa possua
              alguma relação com os mesmos. <br /> Clicando em{' '}
              <strong className={'font-bold'}>Subtarefas</strong>, é possivel
              cadastrar uma ou mais tarefas vinculando-as à {'"'}tarefa pai{'"'}
              , podendo também criar tarefas para as subtarefas indefinidamente,
              ou seja, cada tarefa pode ter subtarefas, e as subtarefas podem
              ter outras subtarefas, e assim por sucessivamente. As datas de{' '}
              <strong className={'font-bold'}>Início</strong> e{' '}
              <strong className={'font-bold'}>Témino</strong> de cada tarefa
              estão relacionadas às suas tarefas {'"'}pai{'"'} e {'"'}filhas
              {'"'}, onde a data de inicio e término de cada tarefa devem estar
              entre as datas de inicio e término da sua tarefa pai. As datas das
              tarefas que não possuem uma tarefa pai devem respeitar as datas do
              projeto diretamente.
            </p>
          </div>
          <div className={'flex flex-col text-lg ml-3 mt-2 text-justify'}>
            <p>
              Ao clicar em <strong className={'font-bold'}>Ver</strong>,
              aparecerá uma página com as informações detalhadas da tarefa:
            </p>
            <p className={'ml-3'}>
              O botão <strong className={'font-bold'}>Voltar</strong>, retornará
              à pagina anterior.
            </p>
          </div>
        </div>
        <div>
          <h3 className={'font-bold text-2xl'}>Ações dos Riscos</h3>
          <div className={'flex flex-col text-lg ml-3 text-justify'}>
            <p>
              Em ações do risco, você pode gerenciar as ações do risco criadas
              por você ou outros usuários do sistema:
            </p>
            <p className={'ml-3'}>
              Ao clicar em <strong className={'font-bold'}>Nova Ação</strong>,
              preencha os dados da ação a ser criada corretamente.
            </p>
            <p className={'ml-3'}>
              No campo de <strong className={'font-bold'}>Ações</strong> ao lado
              de cada ação do risco, você pode ver as informações da ação do
              risco, editar informações da ação do risco e excluir a ação do
              risco, clicando respectivamente em{' '}
              <strong className={'font-bold'}>Ver, Editar</strong> e{' '}
              <strong className={'font-bold'}>Excluir</strong>.
            </p>
          </div>
          <div className={'flex flex-col text-lg ml-3 mt-2 text-justify'}>
            <p>
              Ao clicar em <strong className={'font-bold'}>Ver</strong>,
              aparecerá uma página com as informações detalhadas da ação do
              risco:
            </p>
            <p className={'ml-3'}>
              O botão <strong className={'font-bold'}>Voltar</strong>, retornará
              à pagina anterior.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
