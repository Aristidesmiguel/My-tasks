import { addDoc, collection, deleteDoc, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { COLLECTION_NAME, ITarefa } from "../utils";
import { db } from "../services/firebase";
import { useAuth } from "../hooks";



async function salvarTarefa(valorDoItem: ITarefa): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), valorDoItem);
  return docRef.id;
}

async function editarTarefa(tarefaEditado: ITarefa) {

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

  const { user } = useAuth()
  if (!user) {
    return []
  }
  const idUser = user.uid
  const q = query(collection(db, COLLECTION_NAME, idUser, "users"));
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