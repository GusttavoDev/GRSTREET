import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Loading() {
  return (
    <div className="loading-container">
      <FontAwesomeIcon icon={faSpinner as IconProp} className="loading-icon" />
      <p>Carregando...</p>
    </div>
  );
}
