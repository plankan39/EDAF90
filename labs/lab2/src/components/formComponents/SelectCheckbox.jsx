const SelectCheckbox = ({ options, updateState, currentState }) => {
  return (
    <>
      {options.map((o) => (
        <div className="form-check form-check-inline col-md-3" key={o}>
          <input
            className="form-check-input"
            type="checkbox"
            name={o}
            checked={currentState[o] || false}
            onChange={(e) => updateState({...currentState, [o]: e.target.checked})}
          />
          <label className="form-check-label">{o}</label>
        </div>
      ))}
    </>
  );
};


export default SelectCheckbox;
