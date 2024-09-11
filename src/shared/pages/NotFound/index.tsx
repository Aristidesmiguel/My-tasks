import { Button } from "../../components"
import "./notFound.css"

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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat recusandae obcaecati amet, <br /> exercitationem nemo doloremque dolorum quam non illo. Cum iste impedit quidem quis repudiandae! <br /> Nihil culpa nam placeat minus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, <br /> doloribus voluptates odio earum quo veritatis hic dolores quas aperiam aspernatur nesciunt <br /> modi suscipit architecto soluta porro? Quo fugiat veritatis voluptatem?</p>
            </div>
            <Button title="Voltar" />
        </div>
        </>
    )
}