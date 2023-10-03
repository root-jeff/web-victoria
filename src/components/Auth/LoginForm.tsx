export const LoginForm = () => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="user"
              id=""
              placeholder="Usuario"
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              id=""
              placeholder="Contraseña"
            />
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </>
  );
};
