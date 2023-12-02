
const Contacts = () => {
  return (
    <div className="container mt-3">
      <h2 className="text-primary mt-4 text-center">Контакты</h2>

      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <form>
            <div className="form-control">
              <label htmlFor="name">Имя</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="form-control">
              <label htmlFor="message">Сообщение</label>
              <textarea className="form-control" id="message" rows={4}></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Отправить
            </button>
          </form>

          <div className="row justify-content-center mt-5">
            <div>
              <h5 className="mt-3">Свяжитесь с нами</h5>
              <p>Email: NoNameCompany@gmail.com</p>
              <p>Tel: +1 (234) 56-78-90</p>
              <p>Адрес: www.NoNameCompany.com </p>
            </div>
          </div>
        </div>

      </div>



    </div>
  );
};

export default Contacts;