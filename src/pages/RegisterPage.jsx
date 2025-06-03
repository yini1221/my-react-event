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
                        <div className="border bg-secondary bg-gradient d-inline-block rounded-3 w-25 mb-1" style={{'--bs-bg-opacity': '.4'}}>聲明與切結</div>
                        <div className="border border-3 rounded-3 bg-white p-2 mb-2">
                            一起報名!活動報名系統係由瀚世比運動行銷有限公司（下稱本公司）所設立，提供運動賽事網站能報名運動賽事、購買商品及收取活動報名費用。 在活動報名系統上所刊登一切活動相關資訊(包含價格、圖樣、規格、期間限定及其它約定事項)、服務、商品等，都是由活動主辦單位或是廠商所提供，相關內容是否有涉及不法或其他侵害他人權益或侵權之情事，本公司皆不負任何審查之義務，請消費者在報名或購買前應自負責任謹慎評估要不要參加。 若消費者與廠商間就有關款項、商品品質(規格、圖樣)、活動舉辦相關事宜、商品運送、發票開立等契約義務之履行發生爭議，應由雙方當事人自行處理，本公司不負任何保證及瑕疵擔保責任。 承上所示，消費者的訂單(活動報名或是購買商品)送出成立後，繳費通知單即會產生「系統處理費」費用，當消費者完成此筆訂單繳費後，視同消費者認可收取「系統處理費」的規定。繳費完成到系統完成對帳/造冊，即視為本公司成功完成本次交易服務，所以如遇到活動或是商品退費，此筆訂單的系統處理費，本公司恕不退還，己開立的系統處理費的發票亦不作廢。 一起報名!活動報名系統之消費者，於報名參加活動或購買商品前，應自行審慎考慮、評估風險並自行決定要不要報名參加或是購買商品，如果有上述契約上的爭議，消費者不得要求本公司負起民、刑事之責任，消費者也不得對於本公司之帳戶、資產，主張假扣押、假處分等保全程序，若因而造成本公司損害，告訴人應對本公司負起完全之賠償責任。 使用偽造的身分證件或是偽裝為外籍人士進行報名，會構成刑法行使偽造文書罪。倘若因偽造行為排擠其他民眾報名的機會，破壞報名的公平性。一經發現將取消報名紀錄，所繳的費用將不退還。 如果將取得的名額轉讓給他人，或是換取不正利益圖利，則有觸法的疑慮(刑法第三六○條)，相關當事人應付起相對責任，若因此造成本公司商譽上的損害，應負完全之賠償責任。 在未主動提出要求前，報名平台可以使用消費者所提供的電子資料進行行銷使用。 若您未滿二十歲，應由您的法定代理人閱讀、瞭解並同意本聲明之所有內容後，方得使用本服務。若您選取同意本聲明，將視為您已取得法定代理人之同意。
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required/>
                            <label className="form-check-label" for="flexCheckDefault">
                                我同意而且己經詳細閱讀上述的報名注意事項與活動簡章內容。
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" required/>
                            <label className="form-check-label" for="flexCheckChecked">
                                我同意而且保證會確實遵活動簡章內容，對於活動中需自行負擔的危險性及責任都了解，並同意活動畫面提供大會無償使用 
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" required />
                            <label className="form-check-label" for="flexCheckChecked">
                                我同意而且己經詳細閱讀一起報名!活動報名系統的特別聲明。
                            </label>
                        </div>
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