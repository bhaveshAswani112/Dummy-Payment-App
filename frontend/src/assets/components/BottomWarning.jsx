import { Link } from "react-router-dom";

export function BottomWarning({ warning, link, to }) {
  return (
    <div className="py-2">
      {warning}
      <Link to={to} className="underline">
        {" "}
        {link}
      </Link>
    </div>
  );
}
