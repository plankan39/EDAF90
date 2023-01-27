const SelectRadio = ({ name, options, updateState, currentState }) => {
  return (
    <div className="container">
      {options.map((o) => (
        <label
          className={
            "col-3 m-2 p-3 btn " +
            (currentState === o ? "btn-primary" : "btn-outline-primary")
          }
          key={o}
        >
          {o}
          <input
            className="btn-check"
            type="radio"
            name={name}
            value={o}
            checked={currentState === o}
            onChange={(e) => updateState(e.target.value)}
          />
        </label>
      ))}
    </div>
  );
};

export default SelectRadio;
