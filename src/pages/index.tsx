import { useRouter } from "next/router";
import React from "react";
import { Button, Grid, GridColumn, GridRow } from "semantic-ui-react";
import Layout from "src/components/layout";
import TaskList from "src/components/tasks/task.list";
import { Task } from "src/interfaces/task";

export default function Index(props: { tasks: Task[] }) {
  const router = useRouter();

  return (
    <Layout>
      {props.tasks.length === 0 ? (
        <Grid
          columns={3}
          centered
          verticalAlign="middle"
          style={{ height: "70%" }}
        >
          <GridRow>
            <GridColumn>
              <h1>NO TASKS YET</h1>
              <Button onClick={() => router.push("/tasks/new")}>
                Create one
              </Button>
            </GridColumn>
          </GridRow>
        </Grid>
      ) : (
        <TaskList tasks={props.tasks}></TaskList>
      )}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const resposne = await fetch("http://localhost:3000/api/tasks");
  const tasks = await resposne.json();

  return {
    props: {
      tasks: tasks,
    },
  };
};
