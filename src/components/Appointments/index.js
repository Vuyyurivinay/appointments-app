// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilteredActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilteredActive} = this.state

    this.setState({
      isFilteredActive: !isFilteredActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilteredActive} = this.state

    if (isFilteredActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilteredActive} = this.state
    const filterClassName = isFilteredActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointment-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="heading"> Add Appointment</h1>

                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="Text"
                  id="title"
                  className="text"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="text"
                  value={dateInput}
                  onClick={this.onChangeDateInput}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <hr className="line" />
            <div className="lists">
              <h1 className="para"> Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
