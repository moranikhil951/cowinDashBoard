// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const statusApi = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CowinDashboard extends Component {
  state = {barList: [], pieList: [], pieListTwo: [], updateStatus: ''}

  componentDidMount() {
    this.getBarDetails()
  }

  getBarDetails = async () => {
    this.setState({updateStatus: statusApi.loading})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const barChat = data.last_7_days_vaccination.map(barData => ({
        vaccineDate: barData.vaccine_date,
        dose1: barData.dose_1,
        dose2: barData.dose_2,
      }))
      const pieChart = data.vaccination_by_gender.map(pieData => ({
        age: pieData.gender,
        count: pieData.count,
      }))

      const pieChartTwo = data.vaccination_by_age.map(pieData => ({
        age: pieData.age,
        count: pieData.count,
      }))

      this.setState({
        barList: barChat,
        pieList: pieChart,
        pieListTwo: pieChartTwo,
        updateStatus: statusApi.success,
      })
    } else {
      this.setState({updateStatus: statusApi.failure})
    }
  }

  renderSuccessView = () => {
    const {barList, pieList, pieListTwo} = this.state
    return (
      <>
        <VaccinationCoverage barList={barList} />
        <VaccinationByGender pieList={pieList} />
        <VaccinationByAge pieListTwo={pieListTwo} />
      </>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt=" failure view"
        className="image-failure"
      />
      <h1 className="something-wrong-heading">Something went wrong</h1>
    </>
  )

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderDashBoard = () => {
    const {updateStatus} = this.state
    switch (updateStatus) {
      case statusApi.success:
        return this.renderSuccessView()
      case statusApi.failure:
        return this.renderFailureView()
      case statusApi.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dash-board">
        <div className="website-logo-con">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="website-heading">Co-WIN</h1>
        </div>
        <h1 className="co-win-heading">CoWIN Vaccination In India</h1>
        <div className="mini-container">{this.renderDashBoard()}</div>
      </div>
    )
  }
}

export default CowinDashboard
