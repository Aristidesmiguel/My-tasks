import { addDoc, collection, deleteDoc, getDocs, query, doc, updateDoc } from "firebase/firestore";
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
async function isCompled(id: number) {
  const upTask = doc(db, COLLECTION_NAME, id.toString())
  await updateDoc(upTask, {})
}

async function removeTarefa(id: number) {
    const docRef = doc(db, COLLECTION_NAME, id.toString());  
    await deleteDoc(docRef);
    console.log(`Documento com ID ${id} excluído com sucesso!`);
    console.log(`Documento com ID ${id.toString()} excluído com sucesso!`);
    return docRef.id
  
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