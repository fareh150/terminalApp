const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listarTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

require("colors");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    //Cartgar tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //imprimir menu
    opt = await inquirerMenu();
    //console.log({ opt });

    switch (opt) {
      case "1":
        //crear
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;

      case "2":
        console.log("entra");
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas();
        break;
      case "4": //completado
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids)
        break;
      case "6":
        const id = await listarTareasBorrar(tareas.listadoArr);
        if (id != "0") {
          const ok = await confirmar("¿Estas seguro?");
          console.log({ ok });
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
