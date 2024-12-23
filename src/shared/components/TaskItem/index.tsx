import { ITarefa } from "../../utils";
import item from "./item.module.css"



interface ITaskItemProps {
    task: ITarefa;
    onOpenD: () => void;
    handleToggleComplete: (task: ITarefa) => void;
}

export const TaskItem = ({ task, onOpenD, handleToggleComplete }: ITaskItemProps) => {
    return (
        <div key={task.id}>
        <div

          id="list"
          className={item.tasksCreated}
          key={task.id}
        >
          <div className={item.contanerFlex}>
            <div className={item.info}>
              <input
                checked={task.isSelect}
                onClick={() => handleToggleComplete(task)}
                type="checkbox"
              />
              <li
                style={{
                  textDecoration: task.isSelect
                    ? "line-through"
                    : "none",
                  listStyle: "none",
                }}
              >
                {task.title}
              </li>
            </div>
            <span style={{ color: '#b4acf9', fontSize: '10px' }}>{task.data}</span>
          </div>
          <img
            onClick={() => onOpenD()}
            style={{
              display: task.isSelect ? "block" : "none",
            }}
            src="delete.png"
            alt="Botão de apagar tarefa"
          />
        </div>
      </div>
    )
}