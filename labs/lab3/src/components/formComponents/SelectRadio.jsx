const SelectRadio = ({ name, options, updateState, currentState }) => {
  return (
    <div className="row form-group was-validated">
      {options.map((o) => (
        <div key={o} className="col-3 m-2 p-3" required>
          <label
            className={
              "col-9 btn " +
              (currentState === o ? "btn-primary" : "btn-outline-primary")
            }
            htmlFor={o}
          >
            {o}
          </label>
          <input
            className="btn-check"
            type="radio"
            name={name}
            value={o}
            id={o}
            checked={currentState === o}
            onChange={(e) => updateState(e.target.value)}
            required
          />
          <div className="invalid-feedback">Välj en</div>
        </div>
      ))}
    </div>
  );
};

export default SelectRadio;
