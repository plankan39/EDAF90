const SelectCheckbox = ({ options, updateState, currentState }) => {
  return (
    <div className="container">
      {options.map((o) => (
        <label
          key={o}
          className={
            "btn col-3 m-2 p-3 " +
            (currentState[o] ? "btn-primary" : "btn-outline-primary")
          }
        >
          <input
            className="btn-check"
            type="checkbox"
            name={o}
            checked={currentState[o] || false}
            onChange={(e) =>
              updateState({ ...currentState, [o]: e.target.checked })
            }
          />
          {o}
        </label>
      ))}
    </div>
  );
};

export default SelectCheckbox;
