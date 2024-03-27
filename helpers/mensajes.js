require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {

    console.clear();
    console.log("========================".green);
    console.log(" Seleccionar una opcion".green);
    console.log("========================\n".green);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tarea`);
    console.log(`${"3.".green} Listar tareas completas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"0.".green} Salir \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione un opcion:  ", (respuesta) => {
      console.log({ respuesta });
      readline.close();
      resolve(respuesta)
    });
  });
};

const pausa = () => {

    return new Promise(resolve=> {

        const readline = require("readline").createInterface({
          input: process.stdin,
          output: process.stdout,
        });
      
        readline.question(
          `\nPersione ${"Enter".green} paracontinuar\n`,
          (respuesta) => {
            readline.close();
            resolve()
          }
        );
    })

};

module.exports = {
  mostrarMenu,
  pausa,
};
