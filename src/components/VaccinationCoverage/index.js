import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {barList} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="coverage-con">
      <h1 className="coverage-heading">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={barList}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{stroke: '#6c757d', strokeWidth: 1, fontSize: 15}}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontSize: 15,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,

            textAlign: 'center',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose1"
          fill="#2d87bb"
          barSize="20%"
          radius={[5, 5, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose2"
          fill="#f54394"
          barSize="20%"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
