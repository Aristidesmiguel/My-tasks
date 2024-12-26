import { Link } from "react-router-dom"
import "./notFound.css"
import { ROUTES } from "../../utils"

export const NotFound = () => {
    
    return (
        <>
        <div id="prin">
            <div className="prin-title">
                <h1 className="titleMain">404</h1>
                <h1 className="titleSegund">NOT FOUND</h1>
                <p>Página não encontrada</p>
            </div>
            <div className="subTitle">
                <p>Desculpe, a página que você está procurando não existe.</p>
                <p>Você pode voltar para a página inicial clicando no botão abaixo.</p>
            </div>
            <Link to={ROUTES.home} className="link_Voltar">Voltar</Link>
        </div>
        </>
    )
}