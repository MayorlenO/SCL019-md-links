// process.stdin.on("data", function (data) {
  //   route = data.toString().trim();
  //   process.stdout.write(chalk.yellow(`Verificando ruta: ${route} \n`));
  
    //   if (verifyExistence(route) && isFile(route)) {
    //   process.stdout.write(
    //     chalk.bgWhiteBright(chalk.black("El archivo existe!\n"))
    //   );
    //   process.stdout.write(chalk.yellow("Transformando la ruta a absoluta:\n"));
    //   process.stdout.write(ruta + "\n");
    // } else if (!verifyExistence(route)) {
    //   process.stdout.write(
    //     chalk.bgRedBright(
    //       chalk.black(
    //         "El archivo o directorio no existe ")))
    //         process.stdout.write(chalk.green(' Vuelva a iniciar y pruebe con otra ruta:'))
    //           exit();
    // }
  
    // if (verifyExistence(ruta) && isDirectory(ruta)) {
    //   process.stdout.write(chalk.bgWhite(chalk.black("El directorio existe! \n")));
    //   process.stdout.write("Transformando la ruta a absoluta: \n");
    //   process.stdout.write(ruta + "\n");
    //   process.stdout.write(chalk.bgWhite(chalk.black("Los archivos del directorio son: \n")));
  
    //   let dirData = new Array();
    //   dirData = fs.readdirSync(ruta);
    //   console.log(dirData);
    //   process.stdout.write(chalk.bgWhite(chalk.black(" \n Y se han encontrado estos archivos .md \n")));
  
    //   const filesMd = [];
    //   for (let i = 0; i < dirData.length; i++) {
    //     if (dirData[i].endsWith(".md")) {
    //       filesMd.push(dirData[i]);
    //     }
    //   }
  
    //   console.log(filesMd);
    //   process.stdout.write("\n");
    //   process.stdout.write("Ingrese la ruta del archivo .md que desea revisar \n");
    // }
  
    // if (isFile(ruta) && verifyExtension(ruta)) {
    //   process.stdout.write("La extensión del archivo es .md \n");
    //   const readFileContent = util.promisify(fs.readFile);
    //   readFileContent(ruta);
    //   mdLinks()

    // } else if (isFile(ruta) && !verifyExtension(ruta)) {
    //     process.stdout.write(
    //       chalk.bgRedBright(chalk.black("El archivo no es MD!. Ingrese una ruta válida: \n"))
    //     );
    // }
