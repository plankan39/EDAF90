import { Link } from "react-router-dom";

const SelectCheckbox = ({ options, updateState, currentState }) => {
  return (
    <div className="row">
      {options.map((o) => (
        <div key={o} className="col-3">
          <label
            className={
              "col-9 btn m-2 " +
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
          <Link to={"/view-ingredient/" + o}>
            <label className="col btn btn-link">
              <input className="btn-check" />?
            </label>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SelectCheckbox;
