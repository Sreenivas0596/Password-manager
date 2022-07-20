import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

class App extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    isPasswordShown: false,
    isPasswordAvailable: false,
    createPasswordsList: [],
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  OnChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  OnChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddSubmitButton = event => {
    event.preventDefault()
    const {usernameInput, websiteInput, passwordInput} = this.state
    const firstLetter = websiteInput.slice(0, 1)
    const sliceFirstLetter = firstLetter.toUpperCase()

    const newPassword = {
      id: uuidv4(),
      firstLetterName: sliceFirstLetter,
      websiteName: websiteInput,
      userName: usernameInput,
      Password: passwordInput,
    }
    this.setState(prevState => ({
      createPasswordsList: [...prevState.createPasswordsList, newPassword],
      isPasswordAvailable: true,
      searchInput: '',
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isPasswordShown: true})
    } else {
      this.setState({isPasswordShown: false})
    }
  }

  onDeletePassword = id => {
    const {createPasswordsList} = this.state
    const filteredPasswordList = createPasswordsList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({
      createPasswordsList: filteredPasswordList,
      isPasswordAvailable: true,
    })
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      createPasswordsList,
      isPasswordShown,
      searchInput,
      isPasswordAvailable,
    } = this.state

    const filteredPasswordList = createPasswordsList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    return (
      <div className="password-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo-image"
        />
        <div className="password-input-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-logo-sm"
          />
          <form onSubmit={this.onAddSubmitButton} className="input-container">
            <h1 className="new-password-heading">Add New Password</h1>
            <div className="input-and-logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logo-img"
              />
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={websiteInput}
                className="input-img"
              />
            </div>

            <div className="input-and-logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="logo-img"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.OnChangeUsername}
                value={usernameInput}
                className="input-img"
              />
            </div>
            <div className="input-and-logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="logo-img"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={passwordInput}
                className="input-img"
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-logo-lg"
          />
        </div>
        <div className="password-input-card-container">
          <div className="your-passwords-container">
            <div className="your-passwords">
              <h1 className="new-password-heading"> Your Passwords</h1>
              <p className="passwords-length">{filteredPasswordList.length}</p>
            </div>
            <div className="input-and-logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="logo-img"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.OnChangeSearchInput}
                value={searchInput}
                className="input-img"
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="check"
              onChange={this.showPassword}
              className="checkbox"
            />
            <label htmlFor="check" className="show-password-heading">
              Show Passwords
            </label>
          </div>
          {!isPasswordAvailable && (
            <div className="no-passwords-container">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-manager-logo"
                />
                <p className="no-password-heading">No Passwords</p>
              </div>
            </div>
          )}
          {isPasswordAvailable && (
            <ul>
              {filteredPasswordList.map(eachPassword => (
                <li id={eachPassword.id} key={eachPassword.id}>
                  <p>{eachPassword.firstLetterName}</p>
                  <div>
                    <p>{eachPassword.websiteName}</p>
                    <p>{eachPassword.userName}</p>
                    {!isPasswordShown && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isPasswordShown && <p>{eachPassword.Password}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => this.onDeletePassword(eachPassword.id)}
                    testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
