import { Dispatch, ReactElement, RefObject, SetStateAction } from 'react'
import Risk from '@api/Risk'
import {
  RiskInterface,
  OrderInterface,
  chartRefInterface,
} from '@interfaces/riskInterfaces'
import { faker } from '@faker-js/faker'
import { renderToString } from 'react-dom/server'
import JsPDF from 'jspdf'

interface useRiskInterface {
  setMode?: Dispatch<SetStateAction<'main' | 'create' | 'edit'>>
  projectID?: string
  riskID?: string
  setRisk?: Dispatch<SetStateAction<RiskInterface>>
  risks?: RiskInterface[]
  setRisks?: Dispatch<SetStateAction<RiskInterface[]>>
  allRisks?: RiskInterface[]
  setAllRisks?: Dispatch<SetStateAction<RiskInterface[]>>
  setError?: Dispatch<SetStateAction<string | null>>
  setMessage?: Dispatch<SetStateAction<string | null>>
  setOrder?: Dispatch<SetStateAction<OrderInterface>>
}

export default function useRisk({
  setMode,
  projectID,
  riskID,
  setRisk,
  risks,
  setRisks,
  allRisks,
  setAllRisks,
  setError,
  setMessage,
  setOrder,
}: useRiskInterface) {
  async function getAllRisks() {
    await Risk.list(projectID as string).then((e) => {
      if (setRisks) {
        setRisks(e)
      }
      if (setAllRisks) {
        setAllRisks(e)
      }
    })
  }
  async function getRisk() {
    if (riskID) {
      await Risk.get(riskID as string).then((e) => {
        if (setRisk) {
          setRisk(e)
        }
      })
    }
  }

  function newRisk() {
    const randomCategory = () => {
      const number = Math.round(Math.random() * 3) + 1
      switch (number) {
        case 1:
          return 'Gestão do Projeto'
        case 2:
          return 'Técnico'
        case 3:
          return 'Organizacional'
        case 4:
          return 'Externo'

        default:
          return 'Gestão do Projeto'
      }
    }
    if (setRisk && setMode) {
      const titleGenerated = faker.lorem.words()
      const risk: RiskInterface = {
        title: `${titleGenerated.charAt(0).toUpperCase()}${titleGenerated.slice(
          1
        )}`,
        description: faker.lorem.paragraph(),
        category: randomCategory(),
        causes: faker.lorem.words(),
        probabilityPositive: faker.datatype.number({
          max: 100,
        }),
        probabilityNegative: faker.datatype.number({
          max: 100,
        }),
        impactPositive: faker.datatype.number({ max: 100 }),
        impactNegative: faker.datatype.number({ max: 100 }),
        observations: faker.lorem.words(),
      }
      setRisk(risk)
      switchMode('create')
    }
  }

  function orderBy(
    column: OrderInterface['column'],
    direction: OrderInterface['direction']
  ) {
    if (setRisks && risks && setOrder) {
      function getSortNumber(a: string | number, b: string | number) {
        if (a > b) {
          if (direction === 'asc') {
            return 1
          } else {
            return -1
          }
        } else if (a < b) {
          if (direction === 'desc') {
            return 1
          } else {
            return -1
          }
        } else {
          return 0
        }
      }
      setRisks(
        risks.sort((a, b) => {
          if (
            column !== 'probabilityPositive' &&
            column !== 'probabilityNegative' &&
            column !== 'impactPositive' &&
            column !== 'impactNegative'
          ) {
            return getSortNumber(
              a[column].toLowerCase(),
              b[column].toLowerCase()
            )
          } else if (
            column === 'probabilityPositive' ||
            column === 'impactPositive'
          ) {
            return getSortNumber(
              a.probabilityPositive * a.impactPositive,
              b.probabilityPositive * b.impactPositive
            )
          } else {
            return getSortNumber(
              a.probabilityNegative * a.impactNegative,
              b.probabilityNegative * b.impactNegative
            )
          }
        })
      )
    }
  }

  function getChartLevel(
    impact: number,
    probability: number,
    type: 'negative' | 'positive'
  ) {
    const result = (impact * probability) / 100
    if (result <= 5) {
      return {
        label: 'Muito Baixo',
        hexColor: type === 'negative' ? '#16a34a' : '#dc2626',
      }
    } else if (result > 5 && result <= 16) {
      return {
        label: 'Baixo',
        hexColor: type === 'negative' ? '#84cc16' : '#f97316',
      }
    } else if (result > 16 && result <= 36) {
      return {
        label: 'Médio',
        hexColor: '#eab308',
      }
    } else if (result > 36 && result <= 64) {
      return {
        label: 'Alto',
        hexColor: type === 'negative' ? '#f97316' : '#84cc16',
      }
    } else {
      return {
        label: 'Muito Alto',
        hexColor: type === 'negative' ? '#dc2626' : '#16a34a',
      }
    }
  }

  function generatePDF(
    action: ReactElement,
    task: ReactElement,
    main: ReactElement,
    negativeChartRef: RefObject<chartRefInterface>,
    positiveChartRef: RefObject<chartRefInterface>,
    getChartLevel: (
      impact: number,
      probability: number,
      type: 'negative' | 'positive'
    ) => {
      label: string
      hexColor: string
    }
  ) {
    const mainRisk = main.props.risk
    const getTextColor = (
      impact: number,
      probability: number,
      type: 'negative' | 'positive'
    ) => getChartLevel(impact, probability, type).hexColor
    const getTextLabel = (
      impact: number,
      probability: number,
      type: 'negative' | 'positive'
    ) => getChartLevel(impact, probability, type).label

    const staticMain = renderToString(main)
    const staticTask = renderToString(task)
    const staticAction = renderToString(action)
    const doc = new JsPDF('portrait', 'pt', 'a4')

    doc
      .html(staticMain + staticAction + staticTask, {
        autoPaging: 'text',
        margin: 25,
      })
      .then(() => {
        doc.addPage('a4', 'portrait')
        doc.setTextColor('#000')
        doc.setFontSize(20)
        doc.text('Matrizes de Probabilidade x Impacto', 135, 40)
        doc.setFontSize(15)
        doc.text('Ameaça', 270, 80)
        doc.setFontSize(10)
        doc.text('Nivel:', 80, 95)
        doc.setTextColor(
          getTextColor(
            mainRisk.impactNegative,
            mainRisk.probabilityNegative,
            'negative'
          )
        )
        doc.text(
          getTextLabel(
            mainRisk.impactNegative,
            mainRisk.probabilityNegative,
            'negative'
          ),
          108,
          95
        )
        doc.setTextColor('#000')
        doc.addImage(
          `
        ${negativeChartRef.current?.toBase64Image()}`,
          'PNG',
          45,
          95,
          510,
          255
        )

        doc.setFontSize(15)
        doc.text('Oportunidade', 270, 400)
        doc.setFontSize(10)
        doc.text('Nivel:', 80, 415)
        doc.setTextColor(
          getTextColor(
            mainRisk.impactPositive,
            mainRisk.probabilityPositive,
            'positive'
          )
        )
        doc.text(
          getTextLabel(
            mainRisk.impactPositive,
            mainRisk.probabilityPositive,
            'positive'
          ),
          108,
          415
        )
        doc.setTextColor('#000')
        doc.addImage(
          `
        ${positiveChartRef.current?.toBase64Image()}`,
          'PNG',
          45,
          415,
          510,
          255
        )
        doc.save('Relatório de Risco.pdf')
      })
  }

  function selectRisk(risk: RiskInterface) {
    if (setRisk) {
      setRisk(risk)
    }
    switchMode('edit')
  }

  async function saveRisk(risk: RiskInterface) {
    if (!risk._id) {
      await Risk.create({ ...risk, projectID }).then((e) => setAlert(e))
    } else {
      await Risk.update({ ...risk, projectID }).then((e) => setAlert(e))
    }
  }

  async function deleteRisk(risk: RiskInterface) {
    await Risk.delete(risk._id as string).then((e) => {
      if (e.error) {
        showError(e.error)
      } else if (e.message) {
        showMessage(e.message)
        getAllRisks()
      }
    })
  }

  function search(searchTag: string) {
    if (searchTag === '') {
      if (setRisks) {
        setRisks(allRisks ?? [])
      }
    } else {
      const query = allRisks?.filter(
        (risk) =>
          risk.title.toLowerCase().includes(searchTag.toLowerCase()) ||
          risk.description.toLowerCase().includes(searchTag.toLowerCase()) ||
          risk.category.toLowerCase().includes(searchTag.toLowerCase()) ||
          risk.causes.toLowerCase().includes(searchTag.toLowerCase()) ||
          risk.observations.toLowerCase().includes(searchTag.toLowerCase())
      )
      if (setRisks) {
        setRisks(query ?? [])
      }
    }
  }

  function setAlert(e: any) {
    if (e.error) {
      showError(e.error)
    } else if (e.message) {
      showMessage(e.message)
      switchMode('main')
    }
  }
  function showError(message: any, seconds = 3) {
    if (setError) {
      setError(message)
      setTimeout(() => setError(null), seconds * 1000)
    }
  }
  function showMessage(message: any, seconds = 3) {
    if (setMessage) {
      setMessage(message)
      setTimeout(() => setMessage(null), seconds * 1000)
    }
  }

  function switchMode(mode: 'main' | 'create' | 'edit') {
    if (setMode) {
      setMode(mode)
      if (mode === 'main') {
        getAllRisks()
      }
    }
  }
  return {
    newRisk,
    selectRisk,
    generatePDF,
    saveRisk,
    deleteRisk,
    search,
    switchMode,
    getRisk,
    getAllRisks,
    orderBy,
    getChartLevel,
  }
}
