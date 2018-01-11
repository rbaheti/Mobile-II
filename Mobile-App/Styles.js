import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  hr: {
    height: 1,
    backgroundColor: '#d3d3d3',
  },
  textItem: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  inputStyles: {
    borderWidth: 1,
    borderColor: 'black',
    width: '90%',
    height: 40,
    marginBottom: 15,
    paddingRight: 10,
    paddingLeft: 10,
  },
  listCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 400,
  },
  header: {
    marginTop: 50,
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#faebd7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;