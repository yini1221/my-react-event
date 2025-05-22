function RegisterPage() {
    
    return(
      <div className="container-fluid d-flex justify-content-center flex-column p-4 mx-auto w-100 bg-light shadow rounded">
        <div>
          <img className='rounded-3 w-100' src="https://fakeimg.pl/750x300/ECF5FF?text=750x300" />
        </div>
        <div className="d-flex flex-column flex-grow-1 p-4">
            <h2 className="mb-3 mt-3 mt-md-0"><strong>活動標題</strong></h2>
            <form onSubmit>
                <ul className="list-unstyled">
                    <li className="row input-group mb-3">
                        <span className="col-3 input-group-text" id="name-label">姓名</span>
                        <input type="text" className="col-9 form-control" placeholder="請輸入姓名" aria-label="姓名" aria-describedby="name-label" required></input>
                    </li>
                    <li className="row mb-3 align-items-center">
                        <label className="col-3 col-form-label">性別</label>
                        <div className="col-9">
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="genderMale"
                                value="male"
                            />
                            <label className="form-check-label" htmlFor="genderMale">
                                男
                            </label>
                            </div>
                            <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="genderFemale"
                                value="female"
                            />
                            <label className="form-check-label" htmlFor="genderFemale">
                                女
                            </label>
                        </div>
                    </div>
                    </li>
                    <li className="row input-group mb-3">
                        <span className="col-3 input-group-text" id="dob-label">出生日期</span>
                        <input
                            type="date"
                            className="form-control"
                            aria-label="出生日期"
                            aria-describedby="dob-label"
                            required
                        />
                    </li>
                    <li className="row input-group mb-3">
                        <span className="col-3 input-group-text" id="email-label">E-mail</span>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="請輸入Email"
                            aria-label="E-mail"
                            aria-describedby="email-label"
                            required
                        />
                    </li>
                    <li className="row input-group mb-3">
                        <span className="col-3 input-group-text" id="phone-label">行動電話</span>
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="09xxxxxxxx"
                            aria-label="行動電話"
                            aria-describedby="phone-label"
                            pattern="09[0-9]{8}"
                            required
                        />
                    </li>
                    <li>
                        <button type="submit" className="btn btn-primary">送出</button>
                    </li>
                </ul>
            </form>
        </div>
      </div>
    )
}
export default RegisterPage