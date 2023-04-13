import { Link } from 'react-router-dom';
import '../assets/css/404.css';
function PageNotFound() {
    return (
        <div className="notfound">
            <Link className="back" to="/">
                <i className="bi bi-arrow-left"></i>Go Back
            </Link>
        </div>
    );
}
export default PageNotFound;
