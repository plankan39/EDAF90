const SelectDropdown = ({ options, updateState, currentState }) => {
  return (
    <div>
      <select
        className="form-select form-select-md"
        required
        onChange={(e) => updateState(e.target.value)}
      >
        <option value="">
          Välj ett alternativ
        </option>
        {options.map((o) => (
          <option
            key={o}
            value={o}
            required
          >
            {o}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">Välj ett av alternativen</div>
    </div>
  );
};

export default SelectDropdown;
