import { addDoc, collection, deleteDoc, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { COLLECTION_NAME, ITarefa } from "../utils";
import { db } from "../services/firebase";



async function salvarTarefa(valorDoItem: ITarefa): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), valorDoItem);
  return docRef.id;
}

async function editarTarefa(nomeDaChave: string, tarefaEditado: ITarefa) {
  /* try {
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

  } */
  const ID = tarefaEditado.id;
  const docRef = doc(db, COLLECTION_NAME, ID)
  await updateDoc(docRef, {
    ...tarefaEditado,
    data: new Date().toDateString(),
    title: tarefaEditado.title,
  })
}
async function isCompled(id: string | number, value: boolean) {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, { isSelect: value })
}

async function removeTarefa(id: string) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
  return docRef.id

}

async function buscarTarefas(): Promise<ITarefa[]> {

  const q = query(collection(db, COLLECTION_NAME));
  const tasks = [] as ITarefa[]

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const task = { ...doc.data() as ITarefa, id: doc.id };
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