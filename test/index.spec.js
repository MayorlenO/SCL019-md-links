import{
  verifyExistence} from '../index.js'

const file1 = 'D:/Formación/5. Programación/Laboratoria/SCL019-md-links/README.md';
const file2 = './noexiste.md';
// const file3 = '../probando.txt';
// const dir1 = 'D:/Formación/5. Programación/Laboratoria/SCL019-md-links/test';



describe('La función verifyExistence', () => {

    it('verifica la existencia del archivo y devuelve true si existe', () => {
      expect(verifyExistence(file1)).toBe(true);
    });
   
    it('verifica la existencia del archivo y devuelve false si no existe', () => {
       expect(verifyExistence(file2)).toBe(false);
    });
});


// describe('La función verifyExtension', () => {

//   it('verifica la extensión del archivo. Si es md. Devuelve true', () => {
//     expect(index.verifyExtension(file1)).toBe(true);
//   });
 
//   it('verifica la extensión del archivo. Si no es .md devuelve false', () => {
//      expect(index.verifyExtension(file3)).toBe(false);
//   });
// });

// describe('La función isFile', () => {

//   it('Verifica si la ruta corresponde a un archivo', () => {
//     expect(index.isFile(file1)).toBe(true);
//   });
 
//   it('Si no es un archivo devuelve false', () => {
//      expect(index.isFile(dir1)).toBe(false);
//   });
// });

// describe('La función isFile', () => {

//   it('Verifica si la ruta corresponde a un directorio y no a un archivo', () => {
//     expect(index.isDirectory(dir1)).toBe(true);
//   });
 
//   it('Si no es un directorio y es un archivo devuelve false', () => {
//      expect(index.isDirectory(file1)).toBe(false);
//   });
// });

// describe('La función isDirectory', () => {

//   it('Si es un directorio y no un archivo devuelve true', () => {
//     expect(index.isDirectory(dir1)).toBe(true);
//   });
 
//   it('Si no es un directorio y si es un archivo false', () => {
//      expect(index.isDirectory(file1)).toBe(false);
//   });
// });