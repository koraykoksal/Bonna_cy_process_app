import pattern2 from "../assets/img/bg2.png"
import bg1 from "../assets/img/bg1.jpeg"


export const colors={
    mor:'#9C27B0',
    kırmızı:'#D32F2F',
    mavi:'#1488D1',
    gri:'#717171',
    beyaz:'#ffffff',
    sarı:'#F3B95F',
    turuncu:'#FD8D14'
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
    backgroundImage: 'linear-gradient(143deg, #e7ed6d 31%, #bec0d5 58%)',
    letterSpacing:10,
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
    backgroundColor: colors.mor,
    boxShadow: 5
}


export const paperDashboardStyle_ToplamUygunsuzluk={
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    p: '1rem', 
    width: '250px', 
    height: '165px', 
    flexDirection: 'column',
    backgroundColor: colors.kırmızı,
    boxShadow: 5
}


export const paperDashboardStyle_ToplamKontrolEdilen={
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    p: '1rem', 
    width: '250px', 
    height: '165px', 
    flexDirection: 'column',
    backgroundColor: colors.mavi,
    boxShadow: 5
}


export const paperDashboardStyle_Uygunsuzluk={
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    p: '1rem', 
    width: '250px', 
    height: '165px', 
    flexDirection: 'column',
    backgroundColor: colors.gri,
    boxShadow: 5
}


export const homePageStyle={
    width: "100%",
    height: "100vh",
    overflow:'auto',
    backgroundImage: `url(${pattern2})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
}

export const newBtnStyle={
    textTransform:'none',
    fontWeight:700,
    letterSpacing:3
}