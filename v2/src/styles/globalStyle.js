import bgPattern from "../assets/img/dashboardPattern.png"
import bg1 from "../assets/img/bg1.jpeg"


const colors={
    mor:'#9C27B0',
    kırmızı:'#D32F2F',
    mavi:'#1488D1',
    gri:'#717171',
}


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
    // width: '100px',
    color: 'black',
    textTransform: 'none',
    fontWeight: 700,
    '&:hover': { backgroundColor: '#F3B664' }
}

export const paperDashboardStyle_ProsesPlan={
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    p: '1rem', 
    width: '250px', 
    height: '165px', 
    flexDirection: 'column',
    backgroundColor: colors.mor
}
export const paperDashboardStyle_ToplamUygunsuzluk={
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    p: '1rem', 
    width: '250px', 
    height: '165px', 
    flexDirection: 'column',
    backgroundColor: colors.kırmızı
}
export const paperDashboardStyle_ToplamKontrolEdilen={
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    p: '1rem', 
    width: '250px', 
    height: '165px', 
    flexDirection: 'column',
    backgroundColor: colors.mavi
}
export const paperDashboardStyle_Uygunsuzluk={
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    p: '1rem', 
    width: '250px', 
    height: '165px', 
    flexDirection: 'column',
    backgroundColor: colors.gri
}