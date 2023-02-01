import { Link } from "react-router-dom";

const SelectCheckbox = ({ options, updateState, currentState }) => {
  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6">
      {options.map((o) => (
        <div key={o} className="col d-flex flex-nowrap mt-2 mb-2">
          <input
            id={"SelectCheckbox_" + o}
            className="btn-check"
            type="checkbox"
            name={o}
            checked={currentState[o] || false}
            onChange={(e) =>
              updateState((currentState) => {
                return { ...currentState, [o]: e.target.checked };
              })
            }
          />
          <label
            htmlFor={"SelectCheckbox_" + o}
            type="button"
            className="text-break col btn btn-sm btn-outline-primary "
          >
            {o}
          </label>
          <Link
            className="col-1 btn btn-sm btn-link "
            to={"/view-ingredient/" + o}
          >
            ?
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SelectCheckbox;
