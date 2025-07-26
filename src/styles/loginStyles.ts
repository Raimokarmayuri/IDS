// src/styles/loginStyles.ts
import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
background: {
    flex: 1,
    width: "100%",
    height: "100%",
     backgroundColor: "#1C1831",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  loginHeading: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  loginSub: {
    fontSize: 20,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'transparent',
  },
  input: {
    backgroundColor: '#ffff',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 20,
    color: 'black',
    borderWidth: 1,
    borderColor: '#777',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
   container: {
    
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop:20,
    paddingHorizontal: 14,
  },
    checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    color: '#F8B133',
    marginLeft: 8,
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  forgot: {
    color: '#F8B133',
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 16,
  },
  loginBtn: {
    backgroundColor: '#F8B84E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginBtnText: {
    fontWeight: 'bold',
    color: '',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 24,
    lineHeight: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default loginStyles;
