const app = require('../app');
const file1 = 'D:/Formación/5. Programación/Laboratoria/SCL019-md-links/README.md';
const file2 = './noexiste.md';
const file3 = '../probando.txt';


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
     expect(app.verifyExistence(file3)).toBe(false);
  });
});