import { canSRRAuth } from "../../utils/canSRRAuth"



export default function DashBoard(){
    return(
        <div>
            <h1>Painel</h1>
        </div>
    )
}

export const getServerSideProps =  canSRRAuth(async (ctx) =>{

    return{
        props:{}
    }
})