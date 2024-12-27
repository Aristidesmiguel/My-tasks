import { addDoc, collection, deleteDoc, getDocs, query, doc, updateDoc, where } from "firebase/firestore";
import { COLLECTION_NAME, ITarefa } from "../utils";
import { db } from "../services/firebase";


async function salvarTarefa(valorDoItem: ITarefa): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), valorDoItem);
  return docRef.id;
}

async function editarTarefa(tarefaEditado: ITarefa): Promise<void> {

  const ID = tarefaEditado.id as string
  const docRef = doc(db, COLLECTION_NAME, ID)
  await updateDoc(docRef, {
    ...tarefaEditado,
    data: new Date().toDateString(),
    title: tarefaEditado.title,
  })
}
async function isCompled(id: string, value: boolean): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, { isSelect: value })
}

async function removeTarefa(id: string): Promise<string> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
  return docRef.id

}

async function buscarTarefas(userId: string): Promise<ITarefa[]> {
  const q = query(collection(db, COLLECTION_NAME), where("uid", "==", userId));
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