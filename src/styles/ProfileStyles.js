import swatch from './ColorSwatch';

const loginStyles = {
   container: {
      paddingTop: 23
   },

   input: {
      margin: 15,
      padding: 10,
      height: 40,
      borderColor: swatch.primary,
      borderWidth: 1,
      borderRadius: 5,
   },

   placeholderTextColor: swatch.plight,

   submitButton: {
      backgroundColor: swatch.pdark,
      padding: 10,
      margin: 15,
      height: 40,
      width: 'auto',
      borderRadius: 5,
   },

   submitButtonText:{
      color: 'white'
   }
};

export default loginStyles;
