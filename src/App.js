import React from 'react'
import { connect } from 'react-redux'
import { requestSagaFetch, sagaAddDataFetch, sagaDeleteDataFetch, sagaEditDataFetch } from './reducer/postSlice'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      date: '',
      vaccine: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }
  componentDidMount() {
    this.props.dataDispatch()
  }



  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.id) {
      this.props.dataEditDispatch(this.state)
    } else {
      this.props.datAddDispatch(this.state)
    }
    this.setState({
      name: '',
      date: '',
      vaccine: '',
    })
  }

  handleDelete(e) {
    this.props.dataDeleteDispatch(e)
  }

  handleEdit(e) {
    this.setState({
      name: e.name,
      date: e.date,
      vaccine: e.vaccine,
      id: e.id
    })
  }
  render() {
    console.log(this.state)
    const { name, date, vaccine } = this.state
    const { loading, data, error } = this.props.post
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <h4>Vaccine Form</h4>
          <input type="text" id='name' value={name} onChange={this.handleChange} placeholder='Name' className='form-control mb-3' />
          <input type="date" id='date' value={date} onChange={this.handleChange} className='form-control mb-3' />
          <input type="text" id='vaccine' value={vaccine} onChange={this.handleChange} placeholder='Vaccine' className='form-control mb-3' />
          <button className='btn btn-success'>Submit</button><br /><br />
        </form>
        <h4>FetchDetail Table</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Vaccine</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map(e => (
              <tr key={e.id}>
                <th scope="row">{e.id}</th>
                <td>{e.name}</td>
                <td>{e.date}</td>
                <td>{e.vaccine}</td>
                <td><button className='btn btn-primary' onClick={() => this.handleEdit(e)}>Edit</button></td>
                <td><button className='btn btn-danger' onClick={() => this.handleDelete(e.id)}>Delete</button></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    dataDispatch: () => dispatch(requestSagaFetch()),
    datAddDispatch: (data) => dispatch(sagaAddDataFetch(data)),
    dataDeleteDispatch: (id) => dispatch(sagaDeleteDataFetch(id)),
    dataEditDispatch: (item) => dispatch(sagaEditDataFetch(item))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)