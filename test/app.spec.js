const app = require('../app');
const file1 = 'D:/Formación/5. Programación/Laboratoria/SCL019-md-links/README.md';
const file2 = './noexiste.md';
const file3 = '../probando.txt';
const dir1 = 'D:/Formación/5. Programación/Laboratoria/SCL019-md-links/test';



describe('La función verifyExistence', () => {

    it('verifica la existencia del archivo y devuelve true si existe', () => {
      expect(app.verifyExistence(file1)).toBe(true);
    });
   
    it('verifica la existencia del archivo y devuelve false si no existe', () => {
       expect(app.verifyExistence(file2)).toBe(false);
    });
});


describe('La función verifyExtension', () => {

  it('verifica la extensión del archivo. Si es md. Devuelve true', () => {
    expect(app.verifyExtension(file1)).toBe(true);
  });
 
  it('verifica la extensión del archivo. Si no es .md devuelve false', () => {
     expect(app.verifyExtension(file3)).toBe(false);
  });
});

describe('La función isFile', () => {

  it('Verifica si la ruta corresponde a un archivo', () => {
    expect(app.isFile(file1)).toBe(true);
  });
 
  it('Si no es un archivo devuelve false', () => {
     expect(app.isFile(dir1)).toBe(false);
  });
});

describe('La función isFile', () => {

  it('Verifica si la ruta corresponde a un directorio y no a un archivo', () => {
    expect(app.isDirectory(dir1)).toBe(true);
  });
 
  it('Si no es un directorio y es un archivo devuelve false', () => {
     expect(app.isDirectory(file1)).toBe(false);
  });
});

describe('La función isDirectory', () => {

  it('Si es un directorio y no un archivo devuelve true', () => {
    expect(app.isDirectory(dir1)).toBe(true);
  });
 
  it('Si no es un directorio y si es un archivo false', () => {
     expect(app.isDirectory(file1)).toBe(false);
  });
});