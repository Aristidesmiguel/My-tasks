import { ITarefa } from "../utils";

function salvarTarefa(valorDoItem: ITarefa, nomeDaChave: string) {
    const valorAntigo = buscarTarefas(nomeDaChave);
    const valorAtual = [...valorAntigo, valorDoItem];
    localStorage.setItem(nomeDaChave, JSON.stringify(valorAtual));
  }
  
  function editarTarefa(nomeDaChave: string, tarefaEditado: ITarefa) {
     try {
      const elementos = buscarTarefas(nomeDaChave);
      if (!Array.isArray(elementos)){
          console.log('erro O retorno de buscarTarefas não é uma lista válida');
          return;
      }
      const elementoEditado = elementos.map((item: ITarefa) => {
        return item.id === tarefaEditado.id ? tarefaEditado : item;
    });

    localStorage.setItem(nomeDaChave, JSON.stringify(elementoEditado));
     } catch(error) {
          console.error('Erro ao editar a tarefa:' + error);
          
     }
  }
  function isCompled(nomeDaChave: string, tarefaEditado: ITarefa) {
    try {
      const elementos = buscarTarefas(nomeDaChave);
      const elementoEditado = elementos.map((item: any) => {
        return item.id === tarefaEditado.id ? tarefaEditado : item;
      });
      localStorage.setItem(nomeDaChave, JSON.stringify(elementoEditado));
  } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
  }
  }
  
  function removeTarefa(nomeDaChave: string, id: number) {
    const elemento = buscarTarefas(nomeDaChave);
    const elementoFiltrado = elemento.filter((item: ITarefa) => 
      item.id !== id
      );
    localStorage.setItem(nomeDaChave , JSON.stringify(elementoFiltrado));
  }
  
  function buscarTarefas(nomeDaChave: string){
    const tasks = localStorage.getItem(nomeDaChave)
    if (tasks) {
        const parsedTasks = JSON.parse(tasks) as ITarefa[];
        return parsedTasks
    }
    return [] as ITarefa[];
  }
  
   const dataBase = {
     salvarTarefa,
     editarTarefa,
     removeTarefa,
     buscarTarefas,
     isCompled
  }
  export default dataBase;