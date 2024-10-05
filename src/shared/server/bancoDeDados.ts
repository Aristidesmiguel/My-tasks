import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { ITarefa } from "../utils";
import { db } from "../services/firebase";

const COLLECTION_NAME = "tasks";

async function salvarTarefa(valorDoItem: ITarefa): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), valorDoItem);
  return docRef.id;
}

function editarTarefa(nomeDaChave: string, tarefaEditado: ITarefa) {
  try {
    const elementos = buscarTarefas(nomeDaChave);
    if (!Array.isArray(elementos)) {
      console.log('erro O retorno de buscarTarefas não é uma lista válida');
      return;
    }
    const elementoEditado = elementos.map((item: ITarefa) => {
      return item.id === tarefaEditado.id ? tarefaEditado : item;
    });

    localStorage.setItem(nomeDaChave, JSON.stringify(elementoEditado));
  } catch (error) {
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
  localStorage.setItem(nomeDaChave, JSON.stringify(elementoFiltrado));
}

async function buscarTarefas(): Promise<ITarefa[]> {

  const q = query(collection(db, COLLECTION_NAME));
  const tasks = [] as ITarefa[]

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const task = doc.data() as ITarefa;
    tasks.push(task);
  });
  return tasks;
}

const dataBase = {
  salvarTarefa,
  editarTarefa,
  removeTarefa,
  buscarTarefas,
  isCompled
}
export default dataBase;