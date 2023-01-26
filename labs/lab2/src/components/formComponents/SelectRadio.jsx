const SelectRadio = ({ name, options, updateState, currentState }) => {
  return (
    <>
      {options.map((o) => (
        <div className="form-check form-check-inline col-md-3" key={o}>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            value={o}
            checked={currentState === o}
            onChange={(e) => updateState(e.target.value)}
          />
          <label className="form-check-label">{o}</label>
        </div>
      ))}
    </>
  );
};

export default SelectRadio;
