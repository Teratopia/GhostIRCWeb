import colors from './colors';

export default {
    horizontalAlignScreen : {
        margin : 'auto',
        width : '100%',
        height : '100%',
        border: '5px solid blue',
        textAlign : 'center',
        flex : 1

    },

    genTextInput : {
        margin : 'auto',
        padding : '4px',
        border: '1px solid '+colors.secondary,
        'border-radius' : '8px',
        textAlign : 'center',
        color : colors.dark,
        flex : 1
        //width : '100%',
    },

    inactiveButton : {
        margin : '4px',
        border: '1px solid '+colors.primary,
        'border-radius' : '8px',
        color : 'white',
        fontSize : '18px',
        fontWeight : '500',
        backgroundColor : colors.secondary,
        //width : '100%'
        
    },
    activeButton : {
        margin : '4px',
        border: '1px solid '+colors.secondary,
        'border-radius' : '8px',
        color : 'white',
        fontSize : '18px',
        fontWeight : '500',
        backgroundColor : colors.primary,
        width : '100%'
    },
    dangerButton : {
        margin : '4px',
        border: '1px solid '+colors.secondary,
        'border-radius' : '8px',
        color : 'white',
        fontSize : '18px',
        fontWeight : '500',
        backgroundColor : colors.danger,
        width : '100%'
    },

    genH1Text : {
        fontSize : '68px',
        fontWeight : '700',
        margin : '4px',
        textAlign : 'center'
    },
    genH2Text : {
        fontSize : '48px',
        fontWeight : '700',
        textAlign : 'center'
    },
    genH3Text : {
        fontSize : '24px',
        fontWeight : '500',
        textAlign : 'center'
        //color : colors.secondary,
        //textAlign : 'center'
    },
    genH4Text : {
        fontSize : '18px',
        fontWeight : '400',
        textAlign : 'center'
        //color : colors.secondary,
        //textAlign : 'center'
    },
    genH5Text : {
        fontSize : '14px',
        fontWeight : '300',
        textAlign : 'center'
        //color : colors.secondary,
        //textAlign : 'center'
    },
    genH6Text : {
        fontSize : '10px',
        fontWeight : '200',
        textAlign : 'center'
        //color : colors.secondary,
    },
    centerContainer : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }
}