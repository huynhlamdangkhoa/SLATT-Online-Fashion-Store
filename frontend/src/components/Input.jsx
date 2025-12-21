import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/components/Input.css";

function Input({ icon, ...props }) {
    return (
        <>
            <div className="input-row">
                <div className="input-icon-container">
                    <FontAwesomeIcon className="input-icon" icon={icon} />
                </div>

                <input className="input-control" {...props} />
            </div>
        </>
    );
}

export default Input;
