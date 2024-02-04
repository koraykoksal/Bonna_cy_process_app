import bgPattern from "../assets/img/dashboardPattern.png"
import bg1 from "../assets/img/bg1.jpeg"



export const typoStyle = {
    color: "#C70039"
}

export const homePattern = {
    backgroundImage: `url(${bg1})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    height: '100%'

}

export const detailButtonStyle = {
    // backgroundColor:'#F3B664',
    backgroundImage: 'linear-gradient(143deg, #e7ed6d 31%, #bec0d5 58%)',
    width: '100px',
    color: 'black',
    textTransform: 'none',
    fontWeight: 700,
    '&:hover': { backgroundColor: '#F3B664' }
}