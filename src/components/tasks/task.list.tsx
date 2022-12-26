import { useRouter } from "next/router";
import React from "react";
import { Card, CardContent, CardGroup, CardHeader } from "semantic-ui-react";
import { Task } from "src/interfaces/task";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const router = useRouter();
  console.log(tasks);
  return (
    <CardGroup itemsPerRow={4}>
      {tasks.map((task) => (
        <Card
          key={task.id}
          onClick={() => {
            router.push(`/tasks/edit/${task.id}`);
          }}
        >
          <Card.Content>
            <Card.Header>{task.title}</Card.Header>
            {task.created_on && (
              <Card.Meta>
                {new Date(task.created_on).toLocaleDateString()}
              </Card.Meta>
            )}
            <Card.Description>{task.description}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </CardGroup>
  );
}
