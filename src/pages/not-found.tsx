import { Link } from "react-router"
import "./not-found.css"

const NotFoundRoute = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-box">
        <div className="error-code">ERROR 404</div>
        <h1>!</h1>
        <p>
          죄송합니다, 찾고 계신 페이지가 존재하지 않습니다.
          <br />
          페이지가 이동되었거나 삭제되었을 수 있습니다.
        </p>
        <Link className="go-to-home" to="/" replace>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}

export default NotFoundRoute
